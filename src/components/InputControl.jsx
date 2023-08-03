import React from "react";
import styles from "../assests/css/InputControl.module.css";
import env from "react-dotenv";

function InputControl(props) {
  return (
    <div className={styles.container}>
      {props.label && <label>{props.label}</label>}
      <input required {...props} />
    </div>
  );
}

export default InputControl;
