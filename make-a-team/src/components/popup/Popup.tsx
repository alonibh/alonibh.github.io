import React from "react";
import "./Popup.css";

interface PopupProps {
  children: React.ReactElement;
  handleClose: () => void;
}

export default function Popup(props: PopupProps) {
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        {props.children}
      </div>
    </div>
  );
}
