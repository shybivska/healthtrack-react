import React, { useState } from 'react';

export default function DietPlan() {
  const [showTips, setShowTips] = useState(false);

  return (
    <div>
      <p>Плануйте своє щоденне харчування та контролюйте баланс калорій.</p>
      <ul className="diet-list">
        <li><strong>Сніданок:</strong> Вівсянка з ягодами та горіхами</li>
        <li><strong>Обід:</strong> Запечена куряча грудка та кіноа</li>
        <li><strong>Вечеря:</strong> Легкий салат з тунцем та оливковою олією</li>
      </ul>
      
      <button 
        className="btn habit-btn" 
        style={{ marginTop: '20px', background: showTips ? '#e74c3c' : '#27ae60', color: 'white', border: 'none' }} 
        onClick={() => setShowTips(!showTips)}
      >
        {showTips ? 'Приховати поради' : 'Показати поради щодо раціону'}
      </button>
      
      {showTips && (
        <div style={{ marginTop: '15px', padding: '15px', background: '#e8f8f5', borderRadius: '8px' }}>
          <p style={{ color: '#27ae60', margin: 0 }}>💡 <strong>Порада:</strong> Пийте мінімум 2 літри води на день та уникайте швидких вуглеводів після 18:00 для кращого результату.</p>
        </div>
      )}
    </div>
  );
}