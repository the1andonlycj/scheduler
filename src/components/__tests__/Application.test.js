import React from "react";

import { render, cleanup } from "@testing-library/react";

import { getByPlaceholderText, 
  queryByText, 
  waitForElement, 
  getAllByTestId, 
  getByAltText, 
  getByText, 
  fireEvent,
  debug,
  prettyDOM} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () =>{
  const { container } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, "appointment")[0];
  fireEvent.click(getByAltText(appointment, "Add"));
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
  fireEvent.click(getByText(appointment, "Save"));
  expect(getByText(appointment, "Saving")).toBeInTheDocument();
  //await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  const day = getAllByTestId(container, "day").find(day => {
    return queryByText(day, "Monday");
  });
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  })





  // it("defaults to Monday and changes the schedule when a new day is selected", () => {
  //   const { getByText } = render(<Application />);

  //   return waitForElement(() => getByText("Monday"));
  // });

  // it("changes the schedule when a new day is selected", async () => {
  //   const { getByText } = render(<Application />);

  //   await waitForElement(() => getByText("Monday"));

  //   fireEvent.click(getByText("Tuesday"));

  //   expect(getByText("Leopold Silvers")).toBeInTheDocument();
  // });
})