import React from "react";
import useWindowDimensions from "./ScreenSize";

const Notification = ({ avatarBg, avatarSrc, title, text, author, date }) => {
  // To get Screen Size
  const { height, width } = useWindowDimensions();
  return (
    <li className="list-group-item border-0" style={{ marginBottom: "5px" }}>
      <div className="d-flex">
        <div className={`avatar-xs me-3 rounded-circle bg-${avatarBg}`}>
          <span style={{ borderRadius: "20px" }} className="avatar-title">
            <img
              src={avatarSrc}
              alt="User_Image"
              height="32"
              width="32"
              style={{ borderRadius: "20px" }}
            />
          </span>
        </div>
        <div className="flex-grow-1">
          <h5 className="font-size-14">{title}</h5>
          <p className="text-muted">{text}</p>
          <div className="float-end">
            <p className="text-muted mb-0">
              <i className="mdi mdi-account me-1" /> {author}
            </p>
          </div>
          <p className="text-muted mb-0">{date}</p>
        </div>
      </div>
    </li>
  );
};
export default Notification;
