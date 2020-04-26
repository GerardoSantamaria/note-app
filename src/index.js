const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const routes = require('./routes/index');
const flash = require('express-flash');
const passport = require('passport');
const { getViewUser } = require('./helpers/view');

//Initilization
const app = express();
require('./database');
require('./config/passport');

const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  extname: '.hbs',
  helpers: {
    if_eq: function (a, b, opts) {
      if (a == b) {
        return opts.fn(this);
      } else {
        return opts.inverse(this);
      }
    },
  },
});

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(
  session({
    secret: 'mySecretNoteApp',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash;
  res.locals.user = req.user || null;
  res.locals.viewUser = getViewUser(req.user);
  res.locals.error = req.flash('error');
  delete req.session.sessionFlash;
  next();
});

//Routes
routes(app);

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server is listenning
//=>
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
