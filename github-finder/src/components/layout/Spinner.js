import React, { Fragment } from "react";
import spinner from "./spinner.gif";

const Spinner = () => (
  <Fragment>
    <img src={spinner} alt="Loading" style={style} />
  </Fragment>
);

const style = {
  width: 200,
  margin: "auto",
  display: "block"
};

export default Spinner;
