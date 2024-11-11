import "./login.css";
import { Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const onChange = (e, key) => {
    try {
      setLogin({ ...login, [key]: e.target.value });
    } catch (e) {
      console.log("error", e);
    }
  };
  console.log("login:", login);

  const GoToHome = async () => {
    if (!login.email || !login.password) {
      message.error("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:9999/user/login`,
        login
      );
      console.log(response);

      if (response.data.token && response.data.id) {
        localStorage.setItem("ID", response.data.id);
        localStorage.setItem("token", response.data.token);
      }

      console.log("userid", response.data.id);
      console.log("JWT", response.data.token);
      navigate("/home");
      message.success("Login Successful!");
    } catch (e) {
      console.log("Login Failed", e);
      message.error(
        e.response?.data?.message || "Login Failed. Please try again."
      );
    }
  };

  return (
    <div className="login-up-main">
      <h1>LOGIN TODO</h1>
      <div className="form">
        <Input
          type="email"
          placeholder="example@gmail.com"
          onChange={(e) => onChange(e, "email")}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => onChange(e, "password")}
        />
        <div className="login">
          <Button type="primary" onClick={GoToHome}>
            Login
          </Button>
        </div>
      </div>
      <p onClick={() => navigate(`/`)}>Sign Up</p>
    </div>
  );
};

export default Login;
