import React, { useState } from "react";
import "./AddTodoForm.css";

const AddTodoForm = ({ addTodo }) => {
  const [newTodoText, setNewTodoText] = useState("");

  const handleChange = (e) => {
    setNewTodoText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newTodoText.trim()) return;
    addTodo(newTodoText);
    setNewTodoText("");
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit}>
      <input
        className="input-field"
        type="text"
        value={newTodoText}
        onChange={handleChange}
        placeholder="Enter new todo"
      />
      <button className="add-button" type="submit">
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;
