import "./home.css";
import Navbar from "../../components/NavBar/navbar";
import Create from "../Create/create";

const Home = () => {
  return (
    <div className="Home">
      <Navbar />
      <Create/>
    </div>
  );
};
export default Home;
