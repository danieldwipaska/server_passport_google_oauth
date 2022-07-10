import express from 'express';
const router = express.Router();
import passport from 'passport';

router.get('/login', (req, res, next) => {
  res.send('login page');
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/auth/login');
  });
});

router.get(
  '/login/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

// router.get('/login/google/redirect', (req, res, next) => {
//   res.send('you reached the redirect URI');
// });

router.get('/login/google/redirect', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  // Successful authentication, redirect home.
  res.redirect('/profile');
});
export { router as authRoute };
