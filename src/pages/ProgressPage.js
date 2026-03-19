import React from 'react';

export default function ProgressPage() {
  return (
    <section className="section bg-light rounded-section" style={{ marginTop: '40px' }}>
      <h2 className="section-title">Мій прогрес 📈</h2>
      <p>Ваша активність за останній тиждень зросла на <strong>15%</strong>. Ви виконали 4 тренування та спалили 1200 ккал!</p>
      <div className="stats" style={{ padding: '20px', border: '2px dashed #2980b9', borderRadius: '10px', marginTop: '20px' }}>
        <p><strong>Ваші досягнення:</strong> 🌟 "Рання пташка", 🚫 "Тиждень без цукру".</p>
      </div>
    </section>
  );
}