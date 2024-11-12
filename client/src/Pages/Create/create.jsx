import "./create.css";
import { Modal, Button, Input, DatePicker, message } from "antd";
import { useState, useEffect } from "react";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";

const Create = () => {
  const [editIndex, setEditIndex] = useState(null);
  const [delopn, setDelOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [typed, setTyped] = useState({
    projectName: "",
    projectDescription: "",
    date: "",
    completed: false,
  });
  const [todo, setTodo] = useState([]);

  const showModal = () => {
    setDelOpen(true);
    setTyped({
      projectName: "",
      projectDescription: "",
      date: "",
      completed: false,
    });
    setEditIndex(null);
  };

  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const onChange = (e, key) => {
    if (key === "date") {
      setTyped({ ...typed, date: e ? e.format("YYYY-MM-DD") : null });
    } else {
      setTyped({ ...typed, [key]: e.target.value });
    }
  };

  const whenCreateClicked = async () => {
    try {
      setLoading(true);
      if (editIndex !== null) {
        const updatedTask = { ...typed };
        const response = await axios.patch(
          `http://localhost:9999/todo/${todo[editIndex]._id}`,
          updatedTask
        );
        message.success("Task updated successfully!");
        const updatedTodos = [...todo];
        updatedTodos[editIndex] = response.data;
        setTodo(updatedTodos);
        setEditIndex(null);
      } else {
        const response = await axios.post(
          `http://localhost:9999/todo/create`,
          typed
        );
        message.success("Task created successfully!");
        setTodo([...todo, response.data]);
      }
      setTyped({
        projectName: "",
        projectDescription: "",
        date: "",
        completed: false,
      });
      setOpen(false);
    } catch (e) {
      console.error("Error in create/edit:", e.message);
      message.error("Failed to create/edit task");
    } finally {
      setLoading(false);
      fetchTodos();
    }
  };

  const handleDeleteOk = async (index) => {
    try {
      const response = await axios.delete(
        `http://localhost:9999/todo/${index}`
      );
      message.success("Successfully Deleted!");
      console.log("res", response);
      setDelOpen(false);
      fetchTodos();
    } catch (e) {
      message.error("Delete Failed", e);
    }

    setTodo(todo.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setDelOpen(false);
  };

  const onEditClick = (index) => {
    setLoading(false);
    setTyped(todo[index]);
    setEditIndex(index);
    setOpen(true);
  };

  const handleCheckboxChange = async (index, id) => {
    const updatedTodos = [...todo];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodo(updatedTodos);
    console.log("up", updatedTodos);
    try {
      await axios.patch(`http://localhost:9999/todo/${id}/completed`, {
        completed: updatedTodos[index].completed,
      });
      console.log("Todo completion status updated successfully");
    } catch (error) {
      console.error("Error updating completion status:", error);
    }
  };

  const completedTodos = todo.filter((item) => item.completed);
  const inCompletedTodos = todo.filter((item) => !item.completed);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/todo`);
      if (Array.isArray(response.data.todo)) {
        setTodo(response.data.todo);
      } else {
        console.error("Fetched data is not an array:", response.data.todo);
        setTodo([]);
      }
    } catch (e) {
      console.log("error fetching todos", e);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="Create">
      <Modal
        title={
          <p>
            {editIndex !== null ? "Edit TODO Project" : "Create TODO Project"}
          </p>
        }
        footer={
          <Button type="primary" onClick={whenCreateClicked}>
            {editIndex !== null ? "Save Changes" : "Create"}
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <p>Project Name</p>
        <Input
          onChange={(e) => onChange(e, "projectName")}
          value={typed.projectName}
        />
        <p>Description</p>
        <Input
          onChange={(e) => onChange(e, "projectDescription")}
          value={typed.projectDescription}
        />
        <p>Task Start Date</p>
        <DatePicker
          value={typed.date ? moment(typed.date, "YYYY-MM-DD") : null}
          onChange={(e) => onChange(e, "date")}
        />
      </Modal>
      <div className="first">
        <div className="create-header">
          <h1>My Dashboard</h1>
          <div className="summary">
            <p>
              Summary: {completedTodos.length} / {todo.length} todos completed
            </p>
            <p>
              Pending:
              {inCompletedTodos.length === 0 ? 0 : inCompletedTodos.length}
            </p>
          </div>
        </div>
        <div className="to-do-list-main" onClick={showLoading}>
          <PlusOutlined />
          <p>CREATE</p>
        </div>

        <div className="cards-main">
          {todo.map((item, index) => {
            return (
              <div key={item._id || index} className="cards completed">
                <div className="icons">
                  <div className="pro-name">
                    <input
                      className="check-box"
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleCheckboxChange(index, item._id)}
                    />
                    <h4 className="headd">
                      Project: {String(item.projectName || "")}
                    </h4>
                    <DeleteOutlined
                      onClick={() => showModal(item._id)}
                      className="delete"
                    />
                  </div>

                  <div className="name-desc">
                    <h3>{String(item.projectName)}</h3>
                    <p>{String(item.projectDescription)}</p>
                  </div>
                </div>
                <Modal
                  title="! Are you sure you want to Delete?"
                  open={delopn}
                  onOk={() => handleDeleteOk(item._id)}
                  onCancel={handleCancel}
                ></Modal>
                <div className="date">
                  <EditOutlined
                    onClick={() => onEditClick(index)}
                    className="edit"
                  />
                  <h4>
                    {" "}
                    {item.date ? moment(item.date).format("YYYY-MM-DD") : ""}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="completedto">
        <h1>Completed Tasks</h1>
        <div className="tasks">
          {completedTodos.map((item) => {
            return (
              <div key={item._id} className="completed-tasks">
                <input type="checkbox" checked={true} readOnly />
                <p>task : {item.projectName}</p>
                <p className="completed-date">{item.date}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Create;
