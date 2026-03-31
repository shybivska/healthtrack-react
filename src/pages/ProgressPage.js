import React, { useState, useEffect } from 'react';
// Якщо файл ProgressStats більше не потрібен для інших сторінок, 
// цей рядок імпорту ми прибираємо, оскільки статистика тепер буде тут.

export default function ProgressPage({ user }) {
  const [groupedLogs, setGroupedLogs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      if (!user) return;
      
      try {
        const response = await fetch(`https://healthtrack-backend-7neg.onrender.com/api/workouts?userId=${user.uid}`);
        const data = await response.json();
        
        setGroupedLogs(data);
        setLoading(false);
      } catch (error) {
        console.error("Помилка завантаження журналу з сервера:", error);
        setLoading(false);
      }
    };

    fetchLogs();
  }, [user]);

  // --- 1. ДОДАЄМО ЛОГІКУ ПІДРАХУНКУ ---
  let totalWorkouts = 0;
  let totalCalories = 0;

  if (groupedLogs) {
    // Збираємо всі тренування з усіх груп в один великий список
    const allLogs = [
      ...(groupedLogs.yoga || []),
      ...(groupedLogs.cardio || []),
      ...(groupedLogs.strength || []),
      ...(groupedLogs.all || []) // Інші тренування
    ];
    
    // Рахуємо кількість і суму калорій
    totalWorkouts = allLogs.length;
    totalCalories = allLogs.reduce((acc, log) => acc + (Number(log.calories) || 0), 0);
  }

  // Динамічні досягнення залежно від кількості тренувань
  let achievements = ["🚫 Тиждень без цукру"];
  if (totalWorkouts >= 1) achievements.push("🌟 Перші кроки");
  if (totalWorkouts >= 4) achievements.push("🔥 Рання пташка");
  if (totalCalories >= 1000) achievements.push("💪 Машина");

  // Допоміжна функція
  const renderWorkoutList = (workouts, title, emoji) => {
    if (!workouts || workouts.length === 0) return null; 
    
    return (
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: '#2c3e50', borderBottom: '1px solid #bdc3c7', paddingBottom: '5px' }}>
          {emoji} {title}
        </h4>
        <ul className="diet-list">
          {workouts.map((w, index) => {
            const dateObj = new Date(w.date);
            const timeString = dateObj.toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
            const dateString = dateObj.toLocaleDateString('uk-UA');
            
            return (
              <li key={index} style={{ borderLeft: '4px solid #27ae60', paddingLeft: '10px', marginBottom: '10px' }}>
                {/* 3. Замінили w.time на w.duration, щоб показувати реальний час секундоміра */}
                <strong>{w.title}</strong> — Тривалість: <strong>{w.duration} хв</strong> <em>(Виконано: {dateString} о {timeString})</em>
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
      
      {/* 2. НОВИЙ ДИНАМІЧНИЙ БЛОК СТАТИСТИКИ (показується тільки коли дані завантажились) */}
      {!loading && groupedLogs && (
        <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <p style={{ fontSize: '1.1em', marginBottom: '10px' }}>
            Ваша активність за останній тиждень зросла на <strong>15%</strong>. 
            Ви виконали <strong>{totalWorkouts}</strong> тренування та спалили <strong>{totalCalories}</strong> ккал!
          </p>
          <p style={{ fontSize: '1em', color: '#e67e22', fontWeight: 'bold' }}>
            Ваші досягнення: {achievements.join(", ")}
          </p>
        </div>
      )}

      <h3 style={{ borderBottom: '2px solid #27ae60', paddingBottom: '5px', marginTop: '30px' }}>Журнал тренувань 📓</h3>
      
      {loading ? (
        <p>Завантаження даних з сервера... ⏳</p>
      ) : !groupedLogs || (groupedLogs.yoga.length === 0 && groupedLogs.cardio.length === 0 && groupedLogs.strength.length === 0 && groupedLogs.all.length === 0) ? (
        <p>Ви ще не виконали нових тренувань.</p>
      ) : (
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