const Conversation = require('../models/chat/conversation'),  
      Message = require('../models/chat/message'),
      User = require('../models/users');

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

const getConversations = (req,res, next) => {
  // Only return one message from each conversation to display as snippet
  Conversation.find({ participants: req.session.user })
  .select('_id')
  .exec((err, conversations) => {
    console.log( conversations)
      if (err) {
        res.send({ error: err })
        return next(err);
      }

      // Set up empty array to hold conversations + most recent message
      let fullConversations = [];
      conversations.forEach(conversation => {
        Message.find({ 'conversationId': conversation._id })
          .sort('-createdAt')
          // This is loading just one message from the conversation to load, like whatsapp and fb does 
          .limit(1)
          .populate({
            path: "author",
            select: "profile.firstName profile.lastName"
          })
          .exec((err, message) => {
            if (err) {
              res.send({ error: err});
              return next(err);
            }
            fullConversations.push(message);
            if (fullConversations.length === conversations.length) {
              return res.status(200).json({ conversations: fullConversations });
            }
          });
      });
    });
};

const less= (req,res) => {
  res.json('heyee');
};

const getConversation = (req, res, next) => {
  res.json('hey')
  // Message.find({ conversationId: req.params.conversationId })
  // .select('createdAt body author')
  // .sort('createdAt')
  // .populate({
  //   path: 'author',
  //   select: 'profile.firstName profile.lastName'
  // })
  // .exec((err, messages) => {
  //   if (err) {
  //     res.send({ error: err});
  //     return next(err);
  //   }
  //   res.status(200).json({ conversation: messages })
  // });
}
// new/5b00448aa93df70de03e95f4
// notes/new/5aff94c72373c7408079ceed
const newConversation = (req, res, next) => {
  const { recipient } = req.params;
  const { composedMessage } = req.body;
  const { user } = req.session;
  if (!recipient) {
    res.status(422({ error: 'Please choose a valid recipient for your message.'}));
  }
  if (!composedMessage) {
    res.status(422).send({ error: 'Please enter a message.'});
    return next();
  }
  const conversation = new Conversation({
    participants: [user, recipient]
  });

  conversation.save((err, newConversation) => {
    if (err) {
      res.json({ error: err });
      return next(err);
    }

    const message = new Message({
      conversationId: newConversation._id,
      body: composedMessage,
      author: user
    });

    message.save((err, newMessage) => {
      if (err) {
        res.send({ error: err});
        return next(err);
      }
      res.status(200).json({ message: 'Conversation started', conversationId: conversation._id });
      return next();
    });
  });
};

const sendReply = (req, res, next) => {
  const reply = new Message({
    conversationId: req.params.conversationId,
    body: req.body.composedMessage,
    author: req.session.user
  })

  reply.save((err, sentReply) => {
    if (err) {
      res.json({ error: err });
      return next(err);
    }
    res.status(200).json({ message: 'Reply successfully sent!'});
    return next();
  });
};

const deleteConversation = (req, res, next) => {
  Conversation.findOneAndRemove({
    $and : [
            { '_id': req.params.conversationId }, { 'participants': req.user._id }
           ]}, function(err) {
        if (err) {
          res.send({ error: err });
          return next(err);
        }

        res.status(200).json({ message: 'Conversation removed!' });
        return next();
  });
}



module.exports = {
  getContact,
  allContacts,
  getConversations,
  getConversation,
  newConversation,
  sendReply,
  deleteConversation,
  less
};