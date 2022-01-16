const Message = ({ message, own }) => {
  const date = new Date(message?.createdAt);
  return (
    <div className={own ? "media w-50 ml-auto mb-3" : "media w-50 mb-3"}>
      {/* <img
        src="./assets/person-icon-1682.png"
        alt="user"
        width="50"
        className="rounded-circle"
      /> */}
      <div className="media-body ml-3">
        <div
          className={
            own
              ? "bg-primary rounded py-2 px-3 mb-2"
              : "bg-light rounded py-2 px-3 mb-2"
          }
        >
          <p
            className={
              own ? "text-small mb-0 text-white" : "text-small mb-0 text-muted"
            }
          >
            {message?.content}
          </p>
        </div>
        <p className="small text-muted">{date.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Message;
