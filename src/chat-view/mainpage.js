import React, { Component } from "react";
import NavBar from "./navbar";
import ConversationsWindow from "./conversationswindow";
import ChatWindow from "./chatWindow";
import UserService from "../services/userService";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
    };
  }
  componentDidMount() {
    console.log("mainpage window1");
    UserService.getUser().then((user) => {
      console.log("user fetched" + user);
      if (!user) {
        this.props.history.push("/login");
      } else {
        console.log("mainpage window2", user);
        this.setState({
          userId: user._id,
        });
      }
    });
    console.log("mainpage window3");
  }
  render() {
    const { userId } = this.state;
    return (
      <div>
        <NavBar userId={userId} />
        <div className="container-fluid ">
          <div className="row">
            <div className="col-4 users-box">
              <ConversationsWindow userId={userId} />
            </div>
            <div className="col-8 chat-box">
              <ChatWindow userId={userId} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// const MainPage = () => {
//   const [userId, setUserId] = useState("");
//   const history = useHistory();
//   useEffect(() => {
//     console.log("mainpage window");
//     async function validateUser() {
//       console.log("fetching user");
//       const user = await UserService.getUser();
//       console.log("user fetched" + user);
//       if (!user) {
//         history.push("/login");
//       } else setUserId(user._id);
//     }
//     console.log("mainpage window2");
//     validateUser();
//     console.log("mainpage window3");
//   }, []);
//   return (
//     <div>
//       <NavBar userId={userId} />
//       <div className="container-fluid ">
//         <div className="row">
//           <div className="col-4 users-box">
//             <ConversationsWindow userId={userId} />
//           </div>
//           <div className="col-8 chat-box">
//             <ChatWindow userId={userId} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default MainPage;
