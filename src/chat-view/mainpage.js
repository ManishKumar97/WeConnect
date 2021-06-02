import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const MainPage = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    console.log("demo");
    fetch("http://localhost:3001/", {
      method: "GET",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(),
      credentials: "include",
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 302) {
          setisLoggedIn(false);
          history.push("/login");
        } else if (response.status === 200) {
          console.log("user authenticated");
          setisLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("user login status " + isLoggedIn);
  });

  return <div>Welcome to WeConnect</div>;
};

export default MainPage;
