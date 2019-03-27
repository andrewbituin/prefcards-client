import React from "react";
import ReactDOM from "react-dom";
import AddCardForm from "./AddCardForm";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { shallow, mount } from "enzyme";
import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

enzyme.configure({ adapter: new Adapter() });

