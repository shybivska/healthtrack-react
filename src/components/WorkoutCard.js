import React, { useState } from 'react';

export default function WorkoutCard({ workout, onComplete }) {
  const [status, setStatus] = useState('not_started');
  const defaultImage = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=500&q=80";

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
      <img src={workout.img || defaultImage} alt={workout.title} />
      <div className="card-content">
        <h3>{workout.title}</h3>
        {workout.desc && <p>{workout.desc}</p>}
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