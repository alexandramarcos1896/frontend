// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainMenuPage from './pages/MainMenuPage';
import JournalsPage from './pages/JournalsPage';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<MainMenuPage />} />
      <Route path="/journals" element={<JournalsPage />} />
    </Routes>
  </Router>
  );
}

export default App;
