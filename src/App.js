import Login from "./login/login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { useEffect, useState } from "react";
import MainPage from "./chat-view/mainpage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
