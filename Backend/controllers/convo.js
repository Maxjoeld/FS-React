const User = require('../models/users');

const getContact = (req, res) => {
  const { username } = req.body;
  User.findOne({ username: username })
    .then(foundUser => {
      res.status(201).send(foundUser);
    })
    .catch(err => {
      res.status(400).send({ err });
    });
};

const allContacts = (req, res) => {
  User.find({})
    .then(foundUser => {
      res.status(201).send(foundUser);
    })
    .catch(err => {
      res.status(400).send({ error: err });
    });
};

module.exports = {
  getContact,
  allContacts,
};