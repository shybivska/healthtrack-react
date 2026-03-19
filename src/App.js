import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore'; 
import { auth, db } from './firebase'; 

import HomePage from './pages/HomePage';
import WorkoutsPage from './pages/WorkoutsPage';
import ProgressPage from './pages/ProgressPage';
import DietPage from './pages/DietPage';
import AuthPage from './pages/AuthPage';
import './index.css'; 

function App() {
  const [user, setUser] = useState(null);
  const [workoutLog, setWorkoutLog] = useState([]); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          const userDocRef = doc(db, "userLogs", currentUser.uid);
          const docSnap = await getDoc(userDocRef);
          
          if (docSnap.exists()) {
            setWorkoutLog(docSnap.data().log || []);
          } else {
            setWorkoutLog([]);
          }
        } catch (error) {
          console.error("Помилка завантаження журналу:", error);
        }
      } else {
        setWorkoutLog([]);
      }
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

  const handleAddLog = async (entry) => {
    const updatedLog = [...workoutLog, entry];
    setWorkoutLog(updatedLog); 

    if (user) {
      try {
        const userDocRef = doc(db, "userLogs", user.uid);
        await setDoc(userDocRef, { log: updatedLog }, { merge: true });
      } catch (error) {
        console.error("Помилка збереження журналу в базу:", error);
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
              {/* === ПУБЛІЧНІ СТОРІНКИ (Бачать усі) === */}
              <li><Link to="/">Головна</Link></li>
              <li><Link to="/workouts">Тренування</Link></li>
              <li><Link to="/diet">Раціон</Link></li>
              
              {/* === ЗАКРИТА СТОРІНКА (Тільки для авторизованих) === */}
              {user && <li><Link to="/progress">Прогрес</Link></li>}
              
              {/* Кнопки */}
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
          {/* ВІДКРИТІ МАРШРУТИ */}
          <Route path="/" element={<HomePage />} />
          <Route path="/workouts" element={<WorkoutsPage onAddLog={handleAddLog} />} />
          <Route path="/diet" element={<DietPage />} />
          <Route path="/auth" element={user ? <Navigate to="/" replace /> : <AuthPage />} />
          
          {/* ЗАКРИТИЙ МАРШРУТ */}
          <Route 
            path="/progress" 
            element={user ? <ProgressPage log={workoutLog} /> : <Navigate to="/auth" replace />} 
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