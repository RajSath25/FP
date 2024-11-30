const express = require('express');
const router = express.Router();

// Display registration
router.get('/register', (req, res) => {
  res.render('register', { message: '' });
});

// registration form post
router.post('/register', (req, res) => {
  const { username, password } = req.body;

  res.redirect('/register');
});

module.exports = router;