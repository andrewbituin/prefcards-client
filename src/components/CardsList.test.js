import React from "react";
import ReactDOM from "react-dom";
import CardsList from "./CardsList";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";

describe("CardsList component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <CardsList />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders the UI as expected", () => {
    const tree = renderer.create(
      <MemoryRouter>
        <CardsList />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
});