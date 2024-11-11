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
  const [loading, setLoading] = useState(true);
  const [typed, setTyped] = useState({
    projectName: "",
    projectDescription: "",
    date: "",
    completed: false,
  });
  const [todo, setTodo] = useState([]);

  const showModal = () => {
    setDelOpen(true);
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
  // console.log(typed);

  const whenCreateClicked = async () => {
    try {
      const response = await axios.post(
        `http://localhost:9999/todo/create`,
        typed
      );
      console.log("Response from backend:", response.data);
      setTodo((prevTodo) => [...prevTodo, response.data]);
      const updatedTodos = [...todo];
      if (editIndex !== null) {
        updatedTodos[editIndex] = typed;
      } else {
        updatedTodos.push(typed);
      }
      setTodo(updatedTodos);
      setEditIndex(null);
      setTyped({
        projectName: "",
        projectDescription: "",
        date: "",
        completed: false,
      });
      setOpen(false);
    } catch (e) {
      if (e.response) {
        console.log("Error response from server:", e.response.data);
        console.log("Status code:", e.response.status);
        console.log("Headers:", e.response.headers);
      } else {
        console.log("Error while creating task:", e.message);
      }
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

  // const onEditClick = async (index) => {
  //   console.log("ddd:", index);
  //   try {
  //     setOpen(true);
  //     setLoading(false);
  //     const taskToEdit = todo[index];
  //     setTyped({
  //       projectName: taskToEdit.projectName,
  //       projectDescription: taskToEdit.projectDescription,
  //       date: taskToEdit.date,
  //       completed: taskToEdit.completed,
  //     });
  //     const response = await axios.patch(
  //       `http://localhost:9999/todo/${taskToEdit._id}`,
  //       {
  //         projectName: taskToEdit.projectName,
  //         projectDescription: taskToEdit.projectDescription,
  //         date: taskToEdit.date,
  //         completed: taskToEdit.completed,
  //       }
  //     );
  //     console.log("Task edited successfully:", response.data);
  //   } catch (e) {
  //     message.error("error while editing", e);
  //   }
  // };

  const handleCheckboxChange = (index) => {
    const updatedTodos = [...todo];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodo(updatedTodos);
    console.log("up", updatedTodos);
  };

  const completedTodos = todo.filter((item) => item.completed);
  const inCompletedTodos = todo.filter((item) => !item.completed);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:9999/todo`);
      setTodo(response.data.todo);
      console.log("rrespo", response.data);
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
        title={<p>Create your new TODO Project</p>}
        footer={
          <Button type="primary" onClick={whenCreateClicked}>
            Create
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
                      onChange={() => handleCheckboxChange(index)}
                    />
                    <h4 className="headd">Project: {item.projectName}</h4>
                    <DeleteOutlined
                      onClick={() => showModal(index)}
                      className="delete"
                    />
                  </div>

                  <div className="name-desc">
                    <h3>{item.projectName}</h3>
                    <p>{item.projectDescription}</p>
                  </div>
                  {/* delete modal */}
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
                  <h4> {item.date}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="completedto">
        <h1>Completed Tasks</h1>
        <div className="tasks">
          {completedTodos.map((item, index) => {
            return (
              <div key={index} className="completed-tasks">
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
