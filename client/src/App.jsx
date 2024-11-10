import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/HomePage/home";
import Complete from "./Pages/Create/CompletedTodos/complete";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/complete/:id" element={<Complete />} />
      </Routes>
    </div>
  );
};

export default App;
