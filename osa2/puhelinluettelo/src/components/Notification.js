import React from "react";

const Notification = ({ message, status }) => {
  if (message === null) {
    return null;
  }
  if (status === "error") {
    return <div className="error">{message}</div>;
  }
  if (status === "confirm") {
    return <div className="confirm">{message}</div>;
  }
};
export default Notification;
