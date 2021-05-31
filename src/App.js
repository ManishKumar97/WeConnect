import Login from "./login/login";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import MainPage from "./chat-view/mainpage";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    const isLoggedIn = user === null ? false : true;
    console.log("User logged in :" + user);
    setLoggedIn(isLoggedIn);
  }, []);

  return (
    <Router>
      {!isLoggedIn && (
        <div className="login">
          <Login />
        </div>
      )}
      {isLoggedIn && <MainPage />}
    </Router>
  );
}

export default App;
