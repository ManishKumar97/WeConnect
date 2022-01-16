import React from "react";
import NavBar from "./navbar";
import Conversation from "./conversationswindow";
import Message from "./message";
import UserService from "../services/userService";
import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import ConversationService from "../services/conversationService";
import MessageService from "../services/messageService";

const MainPage = () => {
  const [userid, setuserid] = useState();
  const [email, setemail] = useState();
  const [conversations, setconversations] = useState([]);
  const [currentchat, setcurrentchat] = useState();
  const [messages, setmessages] = useState();
  const [newMessage, setnewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();
  const history = useHistory();

  useEffect(() => {
    socket.current = io("ws://localhost:3001");
    socket.current.on("getMessage", (data) => {
      console.log("testing");
      setArrivalMessage({
        sender: data.senderid,
        content: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentchat?.members.includes(arrivalMessage.sender) &&
      setmessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentchat]);

  useEffect(() => {
    socket?.current.emit("addUser", userid);
  }, [userid]);

  useEffect(() => {
    UserService.getUser().then((user) => {
      if (!user) {
        history.push("/login");
      } else {
        setuserid(user._id);
        setemail(user.email);
        ConversationService.getConversations(user._id).then((data) => {
          if (conversations.length !== data.length) {
            setconversations(data);
          }
        });
      }
    });
  }, []);
  useEffect(() => {
    MessageService.getMessages(currentchat?._id).then((messages) => {
      if (messages) setmessages(messages);
    });
  }, [currentchat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const receiverid = currentchat.members.find((member) => member !== userid);
    socket.current.emit("sendMessage", {
      senderid: userid,
      receiverid,
      text: newMessage,
    });
    MessageService.sendMessage(currentchat._id, userid, newMessage).then(
      (data) => {
        setmessages([...messages, data]);
        setnewMessage("");
      }
    );
  };

  return (
    <div>
      <NavBar email={email} />
      <div className="container-fluid ">
        <div className="row">
          <div className="col-4 users-box">
            <div className="bg-gray px-4 py-2 bg-light">
              <p className="h5 mb-0 py-1">Recent</p>
            </div>
            <div className="messages-box">
              <div className="list-group rounded-0">
                {conversations?.map((c) => (
                  <div onClick={() => setcurrentchat(c)} key={c._id}>
                    <Conversation
                      currentuserId={userid}
                      conversation={c}
                      key={c._id}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {currentchat ? (
            <>
              <div className="col-8 chat-box">
                <div className="px-2 py-2">
                  <div className="chat-scroll-window">
                    {messages?.map((m) => (
                      <div ref={scrollRef}>
                        <Message
                          message={m}
                          own={m.sender === userid}
                          key={m._id}
                        />
                      </div>
                    ))}
                  </div>

                  <form action="/" className="bg-light">
                    <div className="input-group">
                      <textarea
                        className="form-control rounded-0 border-0 py-4 bg-light"
                        rows="3"
                        onChange={(e) => setnewMessage(e.target.value)}
                        value={newMessage}
                        placeholder="write something..."
                      ></textarea>
                      <div className="input-group-append">
                        <button
                          id="button-addon2"
                          type="submit"
                          className="btn btn-link"
                          onClick={(e) => handleSubmit(e)}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
};
export default MainPage;
