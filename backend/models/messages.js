const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema(
  {
    conversationId: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

messageSchema.statics.getMessages = async function (id) {
  const messages = await this.find({ conversationId: id });
  return messages;
};

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
