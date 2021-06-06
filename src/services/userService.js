const API_URL = "http://localhost:3001/";
class UserService {
  static user = null;
  async getUser() {
    if (this.user) {
      return this.user;
    }
    return await fetch(API_URL + "getuser", {
      method: "GET",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.email) this.user = data.email;
        return this.user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  deleteUser() {
    this.user = null;
  }
}
export default new UserService();
