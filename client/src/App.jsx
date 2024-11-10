import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/HomePage/home';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
