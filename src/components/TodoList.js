import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onUpdateTodo, onDelete }) => {
  const handleUpdateTodo = (id, text, done) => {
    onUpdateTodo(id, text, done);
  };
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={(id, text, done) => handleUpdateTodo(todo.id, text, done)}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList;
