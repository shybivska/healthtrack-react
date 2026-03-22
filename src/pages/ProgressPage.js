import React, { useState, useEffect } from 'react';
import ProgressStats from '../components/ProgressStats'; 

export default function ProgressPage({ user }) {
  // Стан для збереження згрупованих тренувань, які прийдуть з сервера
  const [groupedLogs, setGroupedLogs] = useState(null);
  const [loading, setLoading] = useState(true);

  // Коли сторінка відкривається, робимо GET-запит на сервер
  useEffect(() => {
    const fetchLogs = async () => {
      if (!user) return;
      
      try {
        // Звертаємось до нашого Node.js сервера, передаючи ID користувача
        const response = await fetch(`https://healthtrack-backend-7neg.onrender.com/api/workouts?userId=${user.uid}`);
        const data = await response.json();
        
        // Зберігаємо отримані дані (вони вже згруповані бекендом)
        setGroupedLogs(data);
        setLoading(false);
      } catch (error) {
        console.error("Помилка завантаження журналу з сервера:", error);
        setLoading(false);
      }
    };

    fetchLogs();
  }, [user]);

  // Допоміжна функція, щоб красиво малювати списки тренувань
  const renderWorkoutList = (workouts, title, emoji) => {
    if (!workouts || workouts.length === 0) return null; // Якщо в цій групі порожньо - нічого не малюємо
    
    return (
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: '#2c3e50', borderBottom: '1px solid #bdc3c7', paddingBottom: '5px' }}>
          {emoji} {title}
        </h4>
        <ul className="diet-list">
          {workouts.map((w, index) => {
            // Робимо красивий формат дати і часу
            const dateObj = new Date(w.date);
            const timeString = dateObj.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
            const dateString = dateObj.toLocaleDateString('uk-UA');
            
            return (
              <li key={index} style={{ borderLeft: '4px solid #27ae60', paddingLeft: '10px', marginBottom: '10px' }}>
                <strong>{w.title}</strong> — Тривалість: {w.time} <em>(Виконано: {dateString} о {timeString})</em>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <section className="section bg-light rounded-section" style={{ marginTop: '40px' }}>
      <h2 className="section-title">Мій прогрес 📈</h2>
      
      <ProgressStats />

      <h3 style={{ borderBottom: '2px solid #27ae60', paddingBottom: '5px', marginTop: '30px' }}>Журнал тренувань 📓</h3>
      
      {/* Якщо дані ще вантажаться */}
      {loading ? (
        <p>Завантаження даних з сервера... ⏳</p>
      ) : !groupedLogs || (groupedLogs.yoga.length === 0 && groupedLogs.cardio.length === 0 && groupedLogs.strength.length === 0 && groupedLogs.all.length === 0) ? (
        // Якщо сервер відповів, але тренувань ще немає
        <p>Ви ще не виконали нових тренувань.</p>
      ) : (
        // Якщо тренування є, виводимо їх по групах
        <div>
          {renderWorkoutList(groupedLogs.yoga, 'Йога', '🧘‍♀️')}
          {renderWorkoutList(groupedLogs.cardio, 'Кардіо', '🏃‍♀️')}
          {renderWorkoutList(groupedLogs.strength, 'Силові', '🏋️‍♂️')}
          {renderWorkoutList(groupedLogs.all, 'Інші тренування', '🤸‍♀️')}
        </div>
      )}
    </section>
  );
}