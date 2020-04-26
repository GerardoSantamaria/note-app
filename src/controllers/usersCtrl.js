const User = require('../models/User');

const signin = (req, res) => {
  res.render('users/signin');
};

const signup = (req, res) => {
  res.render('users/signup');
};

const createUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = [];
  if (name.length <= 0){
    errors.push({ message: 'Please insert your name.' });
  }
  const emailUser = await User.findOne({email: email});
  if(emailUser){
    errors.push({ message: 'The email is already in use.' });
  }
  if (password != confirmPassword) {
    errors.push({ message: 'Password do not match' });
  }
  if (password.length < 4) {
    errors.push({ message: 'Password must be at least 4 characters' });
  }
  if (errors.length > 0) {
    res.render('users/signup', { errors, name, email });
  } else {
    const newUser = new User({name, email,password});
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.session.sessionFlash = { type: 'success', message: 'You are registered!' };
    res.redirect('./signin')
  }
};

const logout = (req, res) => {
  req.logout();
  res.redirect('/');
}

module.exports = {
  signin,
  signup,
  createUser,
  logout,
};
