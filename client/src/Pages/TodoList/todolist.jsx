import axios from "axios";
import "./todolist.css";
import { useEffect, useState } from "react";

const TodoList = () => {
  const [todo, setTodo] = useState({
    projectName: "",
    todos: [],
  });

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/todo`);
      setTodo(response.data.todo);
      console.log("rrespo", response.data);
    } catch (e) {
      console.log("error fetching todos", e);
    }
  };

  const deleteMany = async () => {
    try {
      const response = await axios.delete(`http://localhost:9999/todo`);
      console.log(response);
      fetchTodos();
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  console.log("todos array:", todo.todos);

  return (
    <div className="todolist-main">
      <div className="buttonss">
        <h1>History</h1>
        <button onClick={deleteMany}>Clear all</button>
      </div>

      <div className="cardss">
        {Array.isArray(todo) && todo.length > 0 ? (
          todo.map((item, index) => (
            <div key={item._id || index} className="to">
              {item.projectName}
            </div>
          ))
        ) : (
          <div>No tasks available</div>
        )}
      </div>
    </div>
  );
};
export default TodoList;
