const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const conversationSchema = new Schema(
  {
    members: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

conversationSchema.statics.getConversations = async function (id) {
  const conversations = await this.find({ members: { $in: id } });
  return conversations;
};

const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
