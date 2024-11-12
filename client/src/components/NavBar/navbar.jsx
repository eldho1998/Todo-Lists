import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("ID");
    navigate("/login");
  };

  return (
    <div className="Navbar">
      <h2>TODO.s</h2>
      <p onClick={() => navigate(`/`)}>SIGNUP</p>
      <p onClick={logOut}>LOGOUT</p>
    </div>
  );
};
export default Navbar;
