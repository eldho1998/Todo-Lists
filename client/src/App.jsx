import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/HomePage/home";
import SignUp from "./Pages/SignUp/signup";
import Login from "./Pages/Login/login";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
