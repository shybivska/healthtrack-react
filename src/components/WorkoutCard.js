import React, { useState } from 'react';

export default function WorkoutCard({ workout, onComplete }) {
  const [status, setStatus] = useState('not_started');
  const defaultImage = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=500&q=80";

  const handleClick = () => {
    if (status === 'not_started') {
      setStatus('in_progress');
    } else if (status === 'in_progress') {
      setStatus('completed');
      onComplete(workout.title, workout.time, workout.type);
    }
  };

  // Визначаємо текст і колір залежно від поточного статусу
  let statusText = 'Не розпочато';
  let statusColor = '#7f8c8d'; // сірий
  let buttonText = 'Почати тренування';
  let buttonColor = '';

  if (status === 'in_progress') {
    statusText = 'В процесі... ⏳';
    statusColor = '#e67e22'; // помаранчевий
    buttonText = 'Завершити тренування';
    buttonColor = '#e67e22';
  } else if (status === 'completed') {
    statusText = 'Завершено ✅';
    statusColor = '#27ae60'; // зелений
    buttonText = 'Виконано';
    buttonColor = '#bdc3c7'; // світло-сірий
  }

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
        
        {/* Тепер текст і колір підставляються зі змінних, які ми визначили вище */}
        <p style={{ fontWeight: 'bold', color: statusColor }}>
          Статус: {statusText}
        </p>
        
        <button 
          className="btn" 
          onClick={handleClick}
          disabled={status === 'completed'}
          style={{ width: '100%', marginTop: '15px', background: buttonColor }}
        >
          {buttonText}
        </button>
      </div>
    </article>
  );
}