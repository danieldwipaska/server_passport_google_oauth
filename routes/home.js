import express from 'express';
const router = express.Router();

const checkId = (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

router.get('/profile', checkId, (req, res) => {
  res.json(`This is your profile ` + req.user.fullname);
});

export { router as homeRoute };
