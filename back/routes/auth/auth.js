const express = require('express');
const router = express.Router();
const connection = require('../../helpers/db');

router.post('/signup', function (req, res, next) {
  const formData = req.body;

  return connection.query(
    'INSERT INTO users SET ?',
    [formData],
    (err, results) => {
      if (err) {
        res.status(500).send('error saving new user').end();
      }
      res.end();
    },
  );
});

module.exports = router;
