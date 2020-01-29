import React from "react";
import ReactDOM from "react-dom";
import ReactErrorScreen from "../src";

const App = () => (
  <ReactErrorScreen error={503} description="Ocorreu um problema no servidor" />
);

ReactDOM.render(<App />, document.getElementById("root"));
