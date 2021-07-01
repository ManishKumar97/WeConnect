import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "./navbar";
import ConversationService from "../services/conversationService";
import UserService from "../services/userService";

const AddFriend = () => {
  const [userid, setUserId] = useState("");
  const [email, setemail] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  useEffect(() => {
    async function validateUser() {
      const user = await UserService.getUser();

      if (!user) {
        history.push("/login");
      } else setUserId(user._id);
    }
    validateUser();
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    ConversationService.createCoversation(userid, email).then((data) => {
      if (data.status) {
        history.push("/");
      } else {
        setError("User not found");
      }
    });
  };
  return (
    <div>
      <NavBar />
      <div className="row pt-3">
        <div className="col-sm-4"></div>
        <div className="col-sm-4">
          <div className="shadow mt-5 p-5 mb-4 bg-white">
            <form onSubmit={(e) => handleSubmit(e)} method="POST">
              <br />
              <input
                type="email"
                className="form-control mb-2 mr-sm-2"
                placeholder="Email"
                id="email"
                name="email"
                onChange={(e) => setemail(e.target.value)}
              />
              <p className="text-center text-danger">{error}</p>
              <br />
              <div className="col text-center">
                <input
                  type="submit"
                  className="btn btn-outline-light text-white mb-2"
                  style={{ backgroundColor: "#DC3D24", width: "100px" }}
                  name="add"
                  value="Add Friend"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="col-sm-4"></div>
      </div>
    </div>
  );
};

export default AddFriend;
