import React from 'react';
import DietPlan from '../components/DietPlan'; // ІМПОРТУЄМО КОМПОНЕНТ

export default function DietPage() {
  return (
    <section className="section">
      <h2 className="section-title">Раціон 🥗</h2>
      
      {/* ВИКОРИСТОВУЄМО КОМПОНЕНТ РАЦІОНУ */}
      <DietPlan />
      
    </section>
  );
}