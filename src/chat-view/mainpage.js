import NavBar from "./navbar";
import UsersWindow from "./userswindow";
import ChatWindow from "./chatWindow";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserService from "../services/userService";
const MainPage = () => {
  const history = useHistory();
  useEffect(() => {
    async function validateUser() {
      const user = await UserService.getUser();
      if (!user) {
        history.push("/login");
      }
    }
    validateUser();
  });
  return (
    <div>
      <NavBar />
      <div className="row">
        <div className="col-4" style={{ backgroundColor: "lavender" }}>
          <ChatWindow />
        </div>
        <div className="col-8" style={{ backgroundColor: "lightsalmon" }}>
          <UsersWindow />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
