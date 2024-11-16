import React from "react";
import { render, fireEvent, waitFor, within } from "@testing-library/react";
import TodoApp from "../App";
import "@testing-library/jest-dom";

describe("TodoApp", () => {
  it("renders add task form", () => {
    const { getByText } = render(<TodoApp />);
    expect(getByText("Add Task")).toBeInTheDocument();
  });

  it("should add a new task to the task list when a task is added", () => {
    const { getByText, getByPlaceholderText } = render(<TodoApp />);
    const input = getByPlaceholderText("Add a new task");
    const addButton = getByText("Add Task");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(getByText("New Task")).toBeInTheDocument();
  });

  it("edits task", async () => {
    window.prompt = jest.fn().mockReturnValue("Edited task");
    const { getByText, getAllByText, getByPlaceholderText, queryByPlaceholderText } = render(<TodoApp />);
    const input = getByPlaceholderText("Add a new task");
    const button = getByText("Add Task");
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(button);
    const tasks = getAllByText("New Task");
    const taskLi = tasks[0].closest("li"); // get the li element that contains the task
    const editButton = within(taskLi).getByText("Edit"); // get the edit button within the li element
    fireEvent.click(editButton);
    const editInput = await waitFor(() => getByPlaceholderText("Edit task:"));
    fireEvent.change(editInput, { target: { value: "Edited task" } });
    fireEvent.blur(editInput); // trigger onBlur event
    await waitFor(() => {
      expect(getByText("Edited task")).toBeInTheDocument();
      expect(queryByPlaceholderText("Edit task:")).toBeNull(); // verify edit input field is not visible
    });
  });

  it("deletes task", async () => {
    const { getByText, getByPlaceholderText, queryByText, getAllByRole } = render(<TodoApp />);
    const input = getByPlaceholderText("Add a new task");
    const button = getByText("Add Task");
    fireEvent.change(input, { target: { value: "New task" } });
    fireEvent.click(button);
    const taskLi = getByText("New task").closest("li"); // get the li element that contains the task
    const buttons = within(taskLi).getAllByRole("button"); // get all buttons within the li element
    const deleteButton = buttons[0]; // assuming the delete button is the first button
    fireEvent.click(deleteButton);
    await waitFor(() => expect(queryByText("New task")).toBeNull());
  });

  it("toggles task completion", async () => {
    const { getByText, getByPlaceholderText, getByRole } = render(<TodoApp />);
    const input = getByPlaceholderText("Add a new task");
    const button = getByText("Add Task");
    fireEvent.change(input, { target: { value: "New task" } });
    fireEvent.click(button);
    const taskLi = getByText("New task").closest("li"); // get the li element that contains the task
    const checkbox = within(taskLi).getByRole("checkbox"); // get the checkbox within the li element
    fireEvent.click(checkbox);
    await waitFor(() => expect(getByText("New task")).toHaveStyle({ textDecoration: "line-through" }));
  });
  
  it("filters tasks", async () => {
    const { getAllByText, getByPlaceholderText, queryByText, getByRole } = render(<TodoApp />);
    const input = getByPlaceholderText("Add a new task");
    const button = getAllByText("Add Task")[0];
    const taskName = `New task ${Math.random()}`;
  
    fireEvent.change(input, { target: { value: taskName } });
    fireEvent.click(button); // Add this line to click the "Add Task" button
    await waitFor(() => expect(getAllByText(taskName)).toHaveLength(1)); // Wait for the task to be added
    const tasks = getAllByText(taskName);
    const taskLi = tasks[0].closest("li"); // get the li element that contains the task
    const checkbox = within(taskLi).getByRole("checkbox"); // get the checkbox within the li element
    fireEvent.click(checkbox); // mark task as completed
    const filterButton = getAllByText("Completed")[0];
    fireEvent.click(filterButton);
    await waitFor(() =>
      expect(getAllByText((content, element) => content.startsWith(taskName))).toHaveLength(
        1
      )
    );
  });

});
