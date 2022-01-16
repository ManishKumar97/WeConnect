const Message = require("../models/messages");

const getMessages = (req, res) => {
  Message.getMessages(req.body.conversationId)
    .then((messages) => res.status(200).send(messages))
    .catch((err) => {
      console.log("error");
      res.status(400).send({ status: false });
    });
};

const sendMessage = (req, res) => {
  const message = new Message(req.body);
  message
    .save()
    .then((message) => {
      res.status(200).json({ message });
    })
    .catch((err) => {
      res.status(400).json({ status: false });
    });
};

module.exports = { getMessages, sendMessage };
