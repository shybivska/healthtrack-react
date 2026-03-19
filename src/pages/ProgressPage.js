import React from 'react';
import ProgressStats from '../components/ProgressStats'; // ІМПОРТУЄМО КОМПОНЕНТ

export default function ProgressPage({ log }) {
  return (
    <section className="section bg-light rounded-section" style={{ marginTop: '40px' }}>
      <h2 className="section-title">Мій прогрес 📈</h2>
      
      {/* ВИКОРИСТОВУЄМО КОМПОНЕНТ СТАТИСТИКИ */}
      <ProgressStats />

      <h3 style={{ borderBottom: '2px solid #27ae60', paddingBottom: '5px' }}>Журнал тренувань 📓</h3>
      {(!log || log.length === 0) ? (
        <p>Ви ще не виконали нових тренувань сьогодні.</p>
      ) : (
        <ul className="diet-list">
          {log.map((entry, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: entry }} style={{ borderLeft: '4px solid #27ae60', paddingLeft: '10px', marginBottom: '10px' }} />
          ))}
        </ul>
      )}
    </section>
  );
}