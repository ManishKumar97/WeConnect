const API_URL = "http://localhost:3001/";
class AuthService {
  login(email, password) {
    const user = { email, password };
    return fetch(API_URL + "login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
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

  signup(name, email, password) {
    const user = {
      name,
      email,
      password,
    };
    return fetch(API_URL + "signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
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
  logOut() {
    return fetch(API_URL + "logout", {
      method: "GET",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(),
      credentials: "include",
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
export default new AuthService();
