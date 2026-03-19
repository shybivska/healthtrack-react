import React, { useState } from 'react';

// Компонент окремої картки тренування з власним станом
function WorkoutCard({ workout, onComplete }) {
  const [status, setStatus] = useState('not_started'); // Стани: not_started, in_progress, completed

  const handleClick = () => {
    if (status === 'not_started') {
      setStatus('in_progress');
    } else if (status === 'in_progress') {
      setStatus('completed');
      onComplete(workout.title, workout.time);
    }
  };

  return (
    <article className="card" style={{ opacity: status === 'completed' ? 0.8 : 1 }}>
      <img src={workout.img} alt={workout.title} />
      <div className="card-content">
        <h3>{workout.title}</h3>
        <p>{workout.desc}</p>
        <ul className="features">
          <li>⏱ {workout.time}</li>
          <li>📊 {workout.level}</li>
        </ul>
        <p style={{ fontWeight: 'bold', color: status === 'completed' ? '#27ae60' : '#7f8c8d' }}>
          Статус: {status === 'not_started' ? 'Не розпочато' : status === 'in_progress' ? 'В процесі... ⏳' : 'Завершено ✅'}
        </p>
        <button 
          className="btn" 
          onClick={handleClick}
          disabled={status === 'completed'}
          style={{ width: '100%', marginTop: '15px', background: status === 'in_progress' ? '#e67e22' : status === 'completed' ? '#bdc3c7' : '' }}
        >
          {status === 'not_started' ? 'Почати тренування' : status === 'in_progress' ? 'Завершити тренування' : 'Виконано'}
        </button>
      </div>
    </article>
  );
}

// Головний компонент сторінки тренувань
export default function WorkoutsPage() {
  const [filter, setFilter] = useState('all');
  const [log, setLog] = useState([]);

  const workouts = [
    { id: 1, type: 'yoga', title: 'Ранкова йога 🧘‍♀️', desc: 'Комплекс вправ для гнучкості.', time: '20 хв', level: 'Початківець', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80' },
    { id: 2, type: 'strength', title: 'Силовий інтенсив 🏋️‍♂️', desc: 'Робота з власною вагою.', time: '45 хв', level: 'Середній', img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=500&q=80' },
    { id: 3, type: 'cardio', title: 'Кардіо HIIT 🏃‍♀️', desc: 'Високоінтенсивне спалювання калорій.', time: '30 хв', level: 'Профі', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=500&q=80' }
  ];

  // Фільтрація масиву тренувань (Вимога варіанту 21)
  const filteredWorkouts = workouts.filter(w => filter === 'all' || w.type === filter);

  const handleWorkoutComplete = (title, time) => {
    const currentTime = new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
    setLog([...log, `<strong>${title}</strong> — Тривалість: ${time} (Завершено о ${currentTime})`]);
  };

  return (
    <section className="section">
      <h2 className="section-title">Доступні тренування</h2>
      
      {/* Фільтрація */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button className="btn" style={{ margin: '0 5px' }} onClick={() => setFilter('all')}>Всі</button>
        <button className="btn" style={{ margin: '0 5px' }} onClick={() => setFilter('cardio')}>Кардіо</button>
        <button className="btn" style={{ margin: '0 5px' }} onClick={() => setFilter('strength')}>Силові</button>
        <button className="btn" style={{ margin: '0 5px' }} onClick={() => setFilter('yoga')}>Йога</button>
      </div>

      <div className="workout-grid">
        {filteredWorkouts.map(workout => (
          <WorkoutCard key={workout.id} workout={workout} onComplete={handleWorkoutComplete} />
        ))}
      </div>

      <div className="bg-light rounded-section" style={{ marginTop: '40px' }}>
        <h3 style={{ borderBottom: '2px solid #27ae60', paddingBottom: '5px' }}>Журнал тренувань 📓</h3>
        {log.length === 0 ? <p>Ви ще не виконали нових тренувань сьогодні.</p> : (
          <ul className="diet-list">
            {log.map((entry, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: entry }} style={{ borderLeft: '4px solid #27ae60', paddingLeft: '10px' }} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}