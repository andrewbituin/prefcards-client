import React from "react";
import ReactDOM from "react-dom";
import AddCardForm from "./AddCardForm";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { shallow, mount } from "enzyme";
import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

enzyme.configure({ adapter: new Adapter() });

describe("AddCardForm component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <MemoryRouter>
        <AddCardForm />
      </MemoryRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
  it("renders the UI as expected", () => {
    const tree = renderer.create(
      <MemoryRouter>
        <AddCardForm />
      </MemoryRouter>
    );
    expect(tree).toMatchSnapshot();
  });
  it("renders without crashing", () => {
    shallow(
      <MemoryRouter>
        <AddCardForm />
      </MemoryRouter>
    );
  });
});
