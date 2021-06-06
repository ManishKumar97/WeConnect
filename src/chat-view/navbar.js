import {
  MdExitToApp,
  MdPersonAdd,
  MdAccountCircle,
  MdChatBubbleOutline,
} from "react-icons/md";
import AuthService from "../services/authService";
import UserService from "../services/userService";
import { useHistory } from "react-router-dom";
const NavBar = () => {
  const history = useHistory();
  const logOut = (e) => {
    AuthService.logOut().then((response) => {
      if (response.status === 200) {
        UserService.deleteUser();
        history.push("/login");
      }
    });
  };
  return (
    <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
      <h1 className="px-4 h1TextColor">WeConnect</h1>

      <ul className="navbar-nav mr-auto">
        <li className="nav-item active mx-2">
          <a className="nav-link" href="/#">
            <div className="row">
              New Chat
              <div className="mx-2">
                <MdChatBubbleOutline size={22} />
              </div>
            </div>
          </a>
        </li>
        <li className="nav-item mx-2">
          <a className="nav-link" href="/#">
            <div className="row">
              Profile
              <div className="px-2">
                <MdAccountCircle size={22} />
              </div>
            </div>
          </a>
        </li>
        <li className="nav-item mx-2">
          <a className="nav-link" href="/#">
            <div className="row">
              Add Friends
              <div className="px-2">
                <MdPersonAdd size={22} />
              </div>
            </div>
          </a>
        </li>
      </ul>
      <ul className="navbar-nav ">
        <li className="nav-item mx-2">
          <a className="nav-link disabled" href="/#">
            test@a.com
          </a>
        </li>
        <li className="nav-item mx-2">
          <button
            type="button"
            className="btn navbar-btn text-white"
            onClick={(e) => logOut(e)}
          >
            <div className="row">
              Log Out
              <div className="px-2">
                <MdExitToApp size={22} />
              </div>
            </div>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
