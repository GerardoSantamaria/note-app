const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.sessionFlash = { type: 'error', message: 'Not Authorized' };
  res.redirect('/users/signin');
};

module.exports = helpers;