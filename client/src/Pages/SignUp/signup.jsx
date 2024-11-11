import "./signup.css";
import { Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [signup, setSignups] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e, key) => {
    try {
      setSignups({ ...signup, [key]: e.target.value });
    } catch (e) {
      console.log("error", e);
    }
  };
  console.log("signn:", signup);

  const GoToLogin = async () => {
    try {
      const response = await axios.post(
        `http://localhost:9999/user/signup`,
        signup
      );
      console.log(response);
      navigate("/login");
      message.success("SignUp Successful!");
      console.log("signed in successfully");
    } catch (e) {
      console.log("Sign Up Failed", e);
      message.error("Sign Up Failed.");
    }
  };

  return (
    <div className="sign-up-main">
      <div className="log">
        <p onClick={() => navigate("/login")}>Login</p>
      </div>
      <div className="sign">
        <h1>SIGNUP TODO</h1>
        <div className="form">
          <Input
            type="text"
            placeholder="firstname"
            onChange={(e) => onChange(e, "firstName")}
          />
          <Input
            type="text"
            placeholder="lastname"
            onChange={(e) => onChange(e, "lastName")}
          />
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
          <Input
            type="password"
            placeholder="confirm password"
            onChange={(e) => onChange(e, "confirmPassword")}
          />
          <div className="signup">
            <Button type="primary" onClick={GoToLogin}>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
