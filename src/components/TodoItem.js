import React, { useState } from "react";
import "./TodoItem.css";

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [editingText, setEditingText] = useState(todo.text);
  const [isEditing, setIsEditing] = useState(false);
  const handleCheckboxChange = (event) => {
    try {
      const checked = event.target.checked;
      onUpdate(todo.id, editingText, checked);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleTextChange = (event) => {
    setEditingText(event.target.value); // Update the edited text in the state
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
    onUpdate(todo.id, editingText);
  };

  const handleDeleteClick = () => {
    onDelete(todo.id);
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={handleCheckboxChange}
      />
      {isEditing ? (
        <input
          type="text"
          value={editingText}
          onChange={handleTextChange}
          onBlur={handleEditClick}
          autoFocus
          className="edit-input"
        />
      ) : (
        <span
          style={{ textDecoration: todo.done ? "line-through" : "none" }}
          onClick={handleEditClick}
        >
          {todo.text}
        </span>
      )}
      <button className="edit-button" onClick={handleEditClick}>
        {isEditing ? "Done" : "Edit"}
      </button>
      <button className="delete-button" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
