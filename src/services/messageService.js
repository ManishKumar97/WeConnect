const API_URL = "http://localhost:3001/";
class MessageService {
  getMessages(conversationId) {
    const req = { conversationId };
    return fetch(API_URL + "getmessages", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(req),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sendMessage(conversationId, sender, content) {
    const req = { conversationId, sender, content };
    return fetch(API_URL + "sendmessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
export default new MessageService();
