import Message from "./message";
const ChatWindow = () => {
  return (
    <div>
      <div className="px-2 py-2">
        <div className="bg-light text-center">
          <p className="h5 py-1">User</p>
        </div>
        <div className="chat-scroll-window">
          <Message />
          <Message own="true" />
          <Message />
          <Message />
          <Message />
          <Message own="true" />
          <Message />
          <Message />
          <Message />
          <Message own="true" />
          <Message />
          <Message />{" "}
        </div>

        <form action="#" className="bg-light">
          <div className="input-group">
            <input
              type="text"
              placeholder="Type a message"
              aria-describedby="button-addon2"
              className="form-control rounded-0 border-0 py-4 bg-light"
            />
            <div className="input-group-append">
              <button id="button-addon2" type="submit" className="btn btn-link">
                Send
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
