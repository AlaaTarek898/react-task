import { Fragment } from "react";
// import styles from "./Form.module.css";
const Form = (props) => {
  return <form>{props.children}</form>;
};

const Controller = (props) => {
  return (
    <Fragment>
      {" "}
      <div>{props.children}</div>
    </Fragment>
  );
};
Form.Controller = Controller;
export default Form;
