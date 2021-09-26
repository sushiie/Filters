import React from "react";
import ReactDOM from "react-dom";
import { FilterContainer } from "./FilterContainer";

it("It should mount", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FilterContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
