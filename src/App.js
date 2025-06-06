// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MainMenuPage from './pages/MainMenuPage';
import JournalsPage from './pages/JournalsPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './routes/ProtectedRoute';


function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<ProtectedRoute> <MainMenuPage /></ProtectedRoute> }/>
        <Route path="/journals" element={<ProtectedRoute> <JournalsPage /></ProtectedRoute>}/>
        <Route path="/profile" element={<ProfilePage />} />
    </Routes>
    </Router>
  );
}

export default App;
