const API_URL = "http://localhost:3001/";
class ConversationService {
  getConversations(userId) {
    const req = { userId };
    return fetch(API_URL + "getconversations", {
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

  createCoversation(userId, email) {
    const req = { userId, email };
    return fetch(API_URL + "createconversation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("service " + data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
export default new ConversationService();
