import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
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
    const { getByText, getByPlaceholderText } = render(<TodoApp />);
    const input = getByPlaceholderText("Add a new task");
    const button = getByText("Add Task");
    fireEvent.change(input, { target: { value: "New task" } });
    fireEvent.click(button);
    const task = getByText("New task");
    const editButton = task.nextSibling;
    fireEvent.click(editButton);
    const editInput = getByPlaceholderText("Edit task:");
    fireEvent.change(editInput, { target: { value: "Edited task" } });
    fireEvent.blur(editInput);
    await waitFor(() => expect(getByText("Edited task")).toBeInTheDocument());
  });

  it("deletes task", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<TodoApp />);
    const input = getByPlaceholderText("Add a new task");
    const button = getByText("Add Task");
    fireEvent.change(input, { target: { value: "New task" } });
    fireEvent.click(button);
    const task = getByText("New task");
    const deleteButton = task.nextSibling.nextSibling;
    fireEvent.click(deleteButton);
    await waitFor(() => expect(queryByText("New task")).toBeNull());
  });

  it("toggles task completion", async () => {
    const { getByText, getByPlaceholderText } = render(<TodoApp />);
    const input = getByPlaceholderText("Add a new task");
    const button = getByText("Add Task");
    fireEvent.change(input, { target: { value: "New task" } });
    fireEvent.click(button);
    const task = getByText("New task");
    const checkbox = task.previousSibling;
    fireEvent.click(checkbox);
    await waitFor(() => expect(task).toHaveStyle({ textDecoration: "line-through" }));
  });
  

  it("filters tasks", async () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<TodoApp />);
    const input = getByPlaceholderText("Add a new task");
    const button = getByText("Add Task");
    fireEvent.change(input, { target: { value: "New task" } });
    fireEvent.click(button);
    const filterButton = getByText("Completed");
    fireEvent.click(filterButton);
    await waitFor(() => expect(queryByText("New task")).toBeNull());
  });
  
});
