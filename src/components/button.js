import React from "react";

const Button = ({ onClick, label, top, left }) => (
  <button
    style={{
      backgroundColor: "white",
      color: "black",
      fontSize: "18px",
      fontStyle: "italic",
      padding: "10px 60px",
      borderRadius: "5px",
      cursor: "pointer",
      position: "absolute",
      top,
      left,
    }}
    onClick={onClick}
  >
    {label}
  </button>
);

export default Button;