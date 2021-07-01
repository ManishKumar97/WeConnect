const API_URL = "http://localhost:3001/";
class UserService {
  static user = null;
  async getUser() {
    if (this.user) {
      console.log("already fecthed user");
      return this.user;
    }
    console.log("user still not fetched");
    return await fetch(API_URL + "getuser", {
      method: "GET",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.user = data.user;
        }
        console.log("dataaa" + JSON.stringify(this.user));
        return this.user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  deleteUser() {
    this.user = null;
  }
  findUser(userId) {
    const req = { userId };
    return fetch(API_URL + "findUser", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(req),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          this.user = data.currentuser;
        }
        console.log("dataaa" + JSON.stringify(this.user));
        return this.user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
export default new UserService();
