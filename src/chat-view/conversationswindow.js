import React from "react";
// import conversationService from "../services/conversationService";
import UserService from "../services/userService";
import { useState, useEffect } from "react";
import logo from "../assets/person-icon.png";

const Conversation = ({ currentuserId, conversation }) => {
  const [fuser, setfuser] = useState();
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentuserId);
    async function getUser() {
      const user = await UserService.findUser(friendId);
      if (user) {
        setfuser(user);
      }
    }
    getUser();
  }, [currentuserId, conversation]);
  return (
    <div className="row my-1 py-1">
      <img src={logo} alt="user" width="50" className="rounded" />

      <h6 className="m-3">{fuser?.name}</h6>
    </div>
  );
};

export default Conversation;
