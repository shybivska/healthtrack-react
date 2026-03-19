import React from 'react';

export default function ProgressStats() {
  return (
    <div>
      <p>Ваша активність за останній тиждень зросла на <strong>15%</strong>. Ви виконали 4 тренування та спалили 1200 ккал!</p>
      <div className="stats" style={{ padding: '20px', border: '2px dashed #2980b9', borderRadius: '10px', marginTop: '20px', marginBottom: '30px' }}>
        <p><strong>Ваші досягнення:</strong> 🌟 "Рання пташка", 🚫 "Тиждень без цукру".</p>
      </div>
    </div>
  );
}