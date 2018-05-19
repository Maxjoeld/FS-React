const { app } = require('./server');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const mongo = require('mongodb').MongoClient;
const client = require('socket.io').listen(5001).sockets;

const PORT = process.env.PORT || 5000;

mongoose.Promise = global.Promise;

mongoose
  .connect('mongodb://localhost/fs-notes')
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.log('Error connecting to database: ', err);
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});