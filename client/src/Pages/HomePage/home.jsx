import "./home.css";
import Navbar from "../../components/NavBar/navbar";
import Create from "../Create/create";
import TodoList from "../TodoList/todolist";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="Home">
      <Navbar />
      <Create />
      <TodoList />
    </div>
  );
};
export default Home;
