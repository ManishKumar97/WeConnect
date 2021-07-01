import Login from "./login/login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddFriend from "./chat-view/addFriend";
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
        <Route exact path="/addfriend">
          <AddFriend />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
