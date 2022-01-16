const Conversation = require("../models/conversation");
const User = require("../models/user");

const getConversations = (req, res) => {
  Conversation.getConversations(req.body.userId)
    .then((conversations) => {
      res.status(200).send(conversations);
    })
    .catch((err) => {
      res.status(400).send({ status: false });
    });
};

const createConversation = (req, res) => {
  User.getUserByEmail(req.body.email)
    .then((user) => {
      if (user && user._id !== req.body.userId) {
        const conversation = new Conversation({
          members: [req.body.userId, user._id.toString()],
        });
        conversation
          .save()
          .then((conversation) => {
            res.status(200).json({ status: true });
          })
          .catch((err) => {
            res.status(400).send({ status: false });
          });
      } else {
        console.log("friend cannot be added");
        res.status(400).send({ status: false });
      }
    })
    .catch((err) => {
      console.log("friend cannot be added");
      res.sendStatus(400);
    });
};
module.exports = { getConversations, createConversation };
