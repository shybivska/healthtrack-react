import React, { useState } from 'react';

export default function WorkoutCard({ workout, onComplete }) {
  const [status, setStatus] = useState('not_started');
  const [startTime, setStartTime] = useState(null); // Стан для збереження часу старту
  
  const defaultImage = "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=500&q=80";

  const handleClick = () => {
    if (status === 'not_started') {
      setStatus('in_progress');
      setStartTime(Date.now()); // Фіксуємо точний час початку (в мілісекундах)
    } else if (status === 'in_progress') {
      const endTime = Date.now();
      // Рахуємо різницю в хвилинах. 
      // Якщо пройшло менше хвилини, запишеться 1, щоб не було 0.
      const durationMs = endTime - startTime;
      const durationMinutes = Math.max(1, Math.round(durationMs / 60000)); 

      setStatus('completed');
      
      // Передаємо durationMinutes як ЧИСЛО
      onComplete(workout.title, durationMinutes, workout.type);
    }
  };

  let statusText = 'Не розпочато';
  let statusColor = '#7f8c8d'; 
  let buttonText = 'Почати тренування';
  let buttonColor = '';

  if (status === 'in_progress') {
    statusText = 'В процесі... ⏳';
    statusColor = '#e67e22'; 
    buttonText = 'Завершити тренування';
    buttonColor = '#e67e22';
  } else if (status === 'completed') {
    statusText = 'Завершено ✅';
    statusColor = '#27ae60'; 
    buttonText = 'Виконано';
    buttonColor = '#bdc3c7'; 
  }

  return (
    <article className="card" style={{ opacity: status === 'completed' ? 0.8 : 1 }}>
      <img src={workout.img || defaultImage} alt={workout.title} />
      <div className="card-content">
        <h3>{workout.title}</h3>
        {workout.desc && <p>{workout.desc}</p>}
        <ul className="features">
          {/* Показуємо запланований час, поки тренування не завершене */}
          <li>⏱ {status === 'completed' ? 'Було виконано' : workout.time}</li>
          <li>📊 {workout.level}</li>
        </ul>
        
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