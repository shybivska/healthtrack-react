import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase'; 

import HomePage from './pages/HomePage';
import WorkoutsPage from './pages/WorkoutsPage';
import ProgressPage from './pages/ProgressPage';
import DietPage from './pages/DietPage';
import AuthPage from './pages/AuthPage';
import './index.css'; 

function App() {
  const [user, setUser] = useState(null);

  // Відстежуємо вхід/вихід користувача
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Ви успішно вийшли з системи!");
    } catch (error) {
      console.error("Помилка виходу:", error);
    }
  };

  // НОВА ФУНКЦІЯ: Відправляємо POST запит на наш власний сервер
  const handleAddLog = async (title, time, type) => {
    if (user) {
      try {
        await fetch("https://healthtrack-backend-7neg.onrender.com/api/workouts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: title,
            time: time,
            type: type,
            userId: user.uid
          })
        });
        alert("Клас! Тренування відправлено на сервер!");
      } catch (error) {
        console.error("Помилка відправки на сервер:", error);
      }
    }
  };

  return (
    <Router>
      <header className="header">
        <div className="container header-container">
          <div className="logo">Health<span>Track</span></div>
          <nav className="nav">
            <ul className="nav-list" style={{ alignItems: 'center' }}>
              <li><Link to="/">Головна</Link></li>
              <li><Link to="/workouts">Тренування</Link></li>
              <li><Link to="/diet">Раціон</Link></li>
              {user && <li><Link to="/progress">Прогрес</Link></li>}
              {user ? (
                <li>
                  <button onClick={handleLogout} className="btn habit-btn" style={{ padding: '8px 16px', marginLeft: '15px' }}>
                    Вийти ({user.email.split('@')[0]})
                  </button>
                </li>
              ) : (
                <li>
                  <Link to="/auth" className="btn habit-btn" style={{ padding: '8px 16px', marginLeft: '15px' }}>
                    Увійти
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workouts" element={<WorkoutsPage onAddLog={handleAddLog} />} />
          <Route path="/diet" element={<DietPage />} />
          <Route path="/auth" element={user ? <Navigate to="/" replace /> : <AuthPage />} />
          {/* ЗМІНЕНО: Тепер ми передаємо user в сторінку прогресу, щоб вона сама дістала дані з сервера */}
          <Route 
            path="/progress" 
            element={user ? <ProgressPage user={user} /> : <Navigate to="/auth" replace />} 
          />
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