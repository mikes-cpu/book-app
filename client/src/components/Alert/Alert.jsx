import React from "react";
import "./Alert.scss";

function Alert({ message }) {
  return (
    <>
      <div className="alert">
        <div className="alert__container">
          <p>{message}</p>
        </div>
      </div>
    </>
  );
}

export default Alert;
