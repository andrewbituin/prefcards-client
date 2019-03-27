import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

describe("App component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders the UI as expected", () => {
    const tree = renderer.create(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});
