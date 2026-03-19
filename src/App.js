import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WorkoutsPage from './pages/WorkoutsPage';
import ProgressPage from './pages/ProgressPage';
import DietPage from './pages/DietPage';
import './index.css'; 

function App() {
  return (
    <Router>
      <header className="header">
        <div className="container header-container">
          <div className="logo">Health<span>Track</span></div>
          <nav className="nav">
            <ul className="nav-list">
              <li><Link to="/">Головна</Link></li>
              <li><Link to="/workouts">Тренування</Link></li>
              <li><Link to="/progress">Прогрес</Link></li>
              <li><Link to="/diet">Раціон</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workouts" element={<WorkoutsPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/diet" element={<DietPage />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3>HealthTrack</h3>
              <p>Твій персональний помічник у світі фітнесу.</p>
            </div>
            <div>
              <h3>Контакти</h3>
              <p>📞 +38 (0**) ***-**-**</p>
              <p>📧 s****t@healthtrack.ua</p>
              <p>📍 м. Львів, вул. Спортивна, 1</p>
            </div>
          </div>
          <div className="copy">
            <p>&copy; 2026 HealthTrack. Всі права захищено.</p>
          </div>
        </div>
      </footer>
    </Router>
  );
}

export default App;