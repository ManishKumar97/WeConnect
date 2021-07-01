import { MdExitToApp, MdPersonAdd } from "react-icons/md";
import AuthService from "../services/authService";
import UserService from "../services/userService";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  const history = useHistory();
  const logOut = (e) => {
    AuthService.logOut().then((response) => {
      if (response.status === 200) {
        UserService.deleteUser();
        history.push("/login");
      }
    });
  };
  const addFriend = (e) => {
    history.push("/addfriend");
  };
  return (
    <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className="px-4 h1TextColor">
        <h1>WeConnect</h1>
      </Link>

      <ul className="navbar-nav mr-auto">
        <li className="nav-item mx-2">
          <button
            type="button"
            className="btn navbar-btn text-white"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            onClick={(e) => addFriend(e)}
          >
            <div className="row">
              Add Friend
              <div className="px-2">
                <MdPersonAdd size={22} />
              </div>
            </div>
          </button>
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
