import React from "react";
import ReactDOM from "react-dom";
import Home from "./Home";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

describe("Home component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders the UI as expected", () => {
    const tree = renderer.create(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
