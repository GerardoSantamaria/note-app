const router = require('express').Router();
const usersCtrl = require('../controllers/usersCtrl');
const passport = require('passport');

router.get('/signin', usersCtrl.signin);
router.get('/signup', usersCtrl.signup);
router.post('/signup', usersCtrl.createUser);
router.post(
  '/signin',
  passport.authenticate('local', {
    successRedirect: '/notes/all-notes',
    failureRedirect: '/users/signin',
    failureFlash: true,
  })
);
router.get('/logout',usersCtrl.logout);

module.exports = router;
