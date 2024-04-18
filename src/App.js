import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const baseUrl = "http://localhost:4000";

  useEffect(() => {
    fetchTodos(sortOrder);
  }, [sortOrder]);

  const fetchTodos = async (sort) => {
    try {
      const response = await axios.get(`${baseUrl}/todos?sort=${sort}`);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const addTodo = async (newTodoText) => {
    try {
      const response = await axios.post(`${baseUrl}/todos`, {
        text: newTodoText,
        done: false,
      });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (id, text, done) => {
    try {
      await axios.put(`${baseUrl}/todos/${id}`, { text: text, done: done });
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${baseUrl}/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-heading">Todo App</h1>
      <div className="app-content">
        <AddTodoForm addTodo={addTodo} />
        <div className="sort-container">
          <label htmlFor="sort" className="sort-label">
            Sort:
          </label>
          <select
            id="sort"
            value={sortOrder}
            onChange={handleSortChange}
            className="sort-select"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        <TodoList
          todos={todos}
          onUpdateTodo={updateTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
