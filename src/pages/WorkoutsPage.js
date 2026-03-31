import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; 
import WorkoutCard from '../components/WorkoutCard'; // ІМПОРТУЄМО КОМПОНЕНТ

export default function WorkoutsPage({ onAddLog }) {
  const [filter, setFilter] = useState('all');
  const [workouts, setWorkouts] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "workouts"));
        const workoutsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setWorkouts(workoutsList); 
        setLoading(false); 
      } catch (error) {
        console.error("Помилка при завантаженні бази даних:", error);
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

  const filteredWorkouts = workouts.filter(w => filter === 'all' || w.type === filter);

  const handleWorkoutComplete = (title, durationMinutes, type) => {
  onAddLog(title, durationMinutes, type);
};

  return (
    <section className="section">
      <h2 className="section-title">Доступні тренування</h2>
      
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button className="btn habit-btn" style={{ margin: '0 5px' }} onClick={() => setFilter('all')}>Всі</button>
        <button className="btn habit-btn" style={{ margin: '0 5px' }} onClick={() => setFilter('cardio')}>Кардіо</button>
        <button className="btn habit-btn" style={{ margin: '0 5px' }} onClick={() => setFilter('strength')}>Силові</button>
        <button className="btn habit-btn" style={{ margin: '0 5px' }} onClick={() => setFilter('yoga')}>Йога</button>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#64748b' }}>Завантаження тренувань з хмари... ⏳</p>
      ) : (
        <div className="workout-grid">
          {filteredWorkouts.map(workout => (
            <WorkoutCard key={workout.id} workout={workout} onComplete={handleWorkoutComplete} />
          ))}
        </div>
      )}
    </section>
  );
}