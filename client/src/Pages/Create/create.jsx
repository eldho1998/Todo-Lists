import "./create.css";
import { Modal, Button, Input, DatePicker } from "antd";
import { useState } from "react";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";

const Create = () => {
  const [editIndex, setEditIndex] = useState(null);
  const [delopn, setDelOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [typed, setTyped] = useState({
    name: "",
    description: "",
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
  console.log(typed);

  const whenCreateClicked = () => {
    if (!typed.name || !typed.description || !typed.date) {
      return;
    }

    const updatedTodos = [...todo];
    if (editIndex !== null) {
      updatedTodos[editIndex] = typed;
    } else {
      updatedTodos.push(typed);
    }
    setTodo(updatedTodos);
    setEditIndex(null);
    setTyped({ name: "", description: "", date: "", completed: false });
    setOpen(false);
  };

  const handleDeleteOk = (index) => {
    setTodo(todo.filter((_, i) => i !== index));
    setDelOpen(false);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setDelOpen(false);
  };

  const onEditClick = (index) => {
    setTyped(todo[index]);
    setEditIndex(index);
    setOpen(true);
  };

  const handleCheckboxChange = (index) => {
    const updatedTodos = [...todo];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodo(updatedTodos);
  };

  const completedTodos = todo.filter((item) => item.completed) || [];
  const inCompletedTodos = todo.filter((item) => !item.completed) || [];

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
        <Input onChange={(e) => onChange(e, "name")} />
        <p>Description</p>
        <Input onChange={(e) => onChange(e, "description")} />
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
              <div key={index} className="cards completed">
                <div className="icons">
                  <div className="pro-name">
                    <input
                      className="check-box"
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleCheckboxChange(index)}
                    />
                    <h4>Project: {index}</h4>

                    <DeleteOutlined
                      onClick={() => showModal(index)}
                      className="delete"
                    />
                  </div>

                  <div className="name-desc">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                  {/* delete modal */}
                </div>
                <Modal
                  title="! Are you sure you want to Delete?"
                  open={delopn}
                  onOk={() => handleDeleteOk(index)}
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
                <p>{item.name}</p>
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
