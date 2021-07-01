import React, { Component } from "react";
import conversationService from "../services/conversationService";
import UserService from "../services/userService";
// import { useState, useEffect } from "react";

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      conversation: this.props.conversation,
    };
  }
  componentDidMount() {
    console.log("asdfghjk loading");
    const friendId = this.state.conversation.members.find(
      (m) => m !== this.props.userId
    );
    UserService.findUser(friendId)
      .then((data) => {
        console.log(data);
        this.setState({
          user: data,
        });
      })
      .catch((err) => console.log("error"));
  }
  render() {
    const { user } = this.state;
    return (
      <a
        key={user._id}
        href="/#"
        className="list-group-item list-group-item-action list-group-item-light  rounded-0"
      >
        <div className="media">
          <img
            src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
            alt="user"
            width="50"
            className="rounded-circle"
          />
          <div className="media-body ml-4">
            <div className="d-flex align-items-center justify-content-between mb-1">
              <h6 className="mb-0">{user.name}</h6>
              <small className="small font-weight-bold">25 Dec</small>
            </div>
            <p className="font-italic mb-0 text-small">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </div>
        </div>
      </a>
    );
  }
}
// const Conversation = ({ userId, conversation }) => {
//   const [user, setUser] = useState(null);
//   useEffect(() => {
//     console.log("asdfghjk loading");
//     const friendId = conversation.members.find((m) => m !== userId);
//     const getUser = async () => {
//       UserService.findUser(friendId)
//         .then((data) => {
//           console.log(data);
//           setUser(data);
//         })
//         .catch((err) => console.log("error"));
//     };
//     getUser();
//   }, [userId, conversation]);
//   return (
//     <a
//       key={user._id}
//       href="/#"
//       className="list-group-item list-group-item-action list-group-item-light  rounded-0"
//     >
//       <div className="media">
//         <img
//           src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
//           alt="user"
//           width="50"
//           className="rounded-circle"
//         />
//         <div className="media-body ml-4">
//           <div className="d-flex align-items-center justify-content-between mb-1">
//             <h6 className="mb-0">{user.name}</h6>
//             <small className="small font-weight-bold">25 Dec</small>
//           </div>
//           <p className="font-italic mb-0 text-small">
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
//             eiusmod tempor incididunt ut labore.
//           </p>
//         </div>
//       </div>
//     </a>
//   );
// };

class ConversationsWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      conversations: [],
    };
  }
  componentDidUpdate() {
    conversationService.getConversations(this.props.userId).then((data) => {
      console.log("data2", data);
      if (this.state.conversations.length !== data.length) {
        this.setState({
          userId: this.props.userId,
          conversations: data,
        });
      }
    });
  }
  render() {
    const { userId, conversations } = this.state;

    return (
      <div>
        <div className="bg-gray px-4 py-2 bg-light">
          <p className="h5 mb-0 py-1">Recent</p>
        </div>
        <div className="messages-box">
          <div className="list-group rounded-0">
            {conversations.map((c) => (
              <Conversation userId={userId} conversation={c} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

// const ConversationsWindow = (props) => {
//   const [userId, setUserId] = useState(props.userId);
//   const [conversations, setConversations] = useState([]);
//   useEffect(() => {
//     setUserId(props.userId);
//     console.log("convo window start");
//     async function fetchData() {
//       conversationService.getConversations(props.userId).then((data) => {
//         console.log("data2", data);
//         setConversations(data);
//         console.log("conversationsv " + conversations);
//       });
//     }
//     console.log("convo window 2");
//     fetchData();
//     console.log("convo window3");
//   }, []);
//   return (
//     <div>
//       <div className="bg-gray px-4 py-2 bg-light">
//         <p className="h5 mb-0 py-1">Recent</p>
//       </div>
//       <div className="messages-box">
//         <div className="list-group rounded-0">
//           {conversations.map((c) => (
//             <Conversation userId={userId} conversation={c} />
//           ))}
/* <a
            href="/#"
            className="list-group-item list-group-item-action active text-white rounded-0"
          >
            <div className="media">
              <img
                src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                alt="user"
                width="50"
                className="rounded-circle"
              />
              <div className="media-body ml-4">
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <h6 className="mb-0">Jason Doe</h6>
                  <small className="small font-weight-bold">25 Dec</small>
                </div>
                <p className="font-italic mb-0 text-small">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore.
                </p>
              </div>
            </div>
          </a>

          <a
            href="/#"
            className="list-group-item list-group-item-action list-group-item-light rounded-0"
          >
            <div className="media">
              <img
                src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                alt="user"
                width="50"
                className="rounded-circle"
              />
              <div className="media-body ml-4">
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <h6 className="mb-0">Jason Doe</h6>
                  <small className="small font-weight-bold">14 Dec</small>
                </div>
                <p className="font-italic text-muted mb-0 text-small">
                  Lorem ipsum dolor sit amet, consectetur. incididunt ut labore.
                </p>
              </div>
            </div>
          </a>

          <a
            href="/#"
            className="list-group-item list-group-item-action list-group-item-light rounded-0"
          >
            <div className="media">
              <img
                src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                alt="user"
                width="50"
                className="rounded-circle"
              />
              <div className="media-body ml-4">
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <h6 className="mb-0">Jason Doe</h6>
                  <small className="small font-weight-bold">9 Nov</small>
                </div>
                <p className="font-italic text-muted mb-0 text-small">
                  consectetur adipisicing elit, sed do eiusmod tempor incididunt
                  ut labore.
                </p>
              </div>
            </div>
          </a>

          <a
            href="/#"
            className="list-group-item list-group-item-action list-group-item-light rounded-0"
          >
            <div className="media">
              <img
                src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                alt="user"
                width="50"
                className="rounded-circle"
              />
              <div className="media-body ml-4">
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <h6 className="mb-0">Jason Doe</h6>
                  <small className="small font-weight-bold">18 Oct</small>
                </div>
                <p className="font-italic text-muted mb-0 text-small">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore.
                </p>
              </div>
            </div>
          </a>

          <a
            href="/#"
            className="list-group-item list-group-item-action list-group-item-light rounded-0"
          >
            <div className="media">
              <img
                src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                alt="user"
                width="50"
                className="rounded-circle"
              />
              <div className="media-body ml-4">
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <h6 className="mb-0">Jason Doe</h6>
                  <small className="small font-weight-bold">17 Oct</small>
                </div>
                <p className="font-italic text-muted mb-0 text-small">
                  consectetur adipisicing elit, sed do eiusmod tempor incididunt
                  ut labore.
                </p>
              </div>
            </div>
          </a>

          <a
            href="/#"
            className="list-group-item list-group-item-action list-group-item-light rounded-0"
          >
            <div className="media">
              <img
                src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                alt="user"
                width="50"
                className="rounded-circle"
              />
              <div className="media-body ml-4">
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <h6 className="mb-0">Jason Doe</h6>
                  <small className="small font-weight-bold">2 Sep</small>
                </div>
                <p className="font-italic text-muted mb-0 text-small">
                  Quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                  ea commodo consequat.
                </p>
              </div>
            </div>
          </a>

          <a
            href="/#"
            className="list-group-item list-group-item-action list-group-item-light rounded-0"
          >
            <div className="media">
              <img
                src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                alt="user"
                width="50"
                className="rounded-circle"
              />
              <div className="media-body ml-4">
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <h6 className="mb-0">Jason Doe</h6>
                  <small className="small font-weight-bold">30 Aug</small>
                </div>
                <p className="font-italic text-muted mb-0 text-small">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore.
                </p>
              </div>
            </div>
          </a>

          <a
            href="/#"
            className="list-group-item list-group-item-action list-group-item-light rounded-0"
          >
            <div className="media">
              <img
                src="https://res.cloudinary.com/mhmd/image/upload/v1564960395/avatar_usae7z.svg"
                alt="user"
                width="50"
                className="rounded-circle"
              />
              <div className="media-body ml-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h6 className="mb-0">Jason Doe</h6>
                  <small className="small font-weight-bold">21 Aug</small>
                </div>
                <p className="font-italic text-muted mb-0 text-small">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore.
                </p>
              </div>
            </div>
          </a> */
//}
//         </div>
//       </div>
//     </div>
//   );
// };

export default ConversationsWindow;
