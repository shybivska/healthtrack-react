import React, { useState } from 'react';
import { auth } from '../firebase'; // Імпортуємо налаштування з твого файлу
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function AuthPage() {
  // Стани для збереження введених даних
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Перемикач Вхід/Реєстрація
  const [error, setError] = useState('');

  // Функція, яка спрацьовує при натисканні на кнопку форми
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegistering) {
        // Логіка реєстрації
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Реєстрація успішна! Тепер ви увійшли в систему.");
      } else {
        // Логіка входу
        await signInWithEmailAndPassword(auth, email, password);
        alert("Вхід успішний!");
      }
    } catch (err) {
      setError("Помилка: " + err.message);
    }
  };

  return (
    <section className="section">
      <div className="container form-container bg-light rounded-section" style={{ maxWidth: '400px', marginTop: '40px' }}>
        <h2 className="section-title" style={{ marginBottom: '20px' }}>
          {isRegistering ? 'Реєстрація' : 'Вхід'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Ваш Email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Пароль (мінімум 6 символів)" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            minLength="6"
          />
          
          {error && <p style={{ color: '#e74c3c', fontWeight: 'bold', fontSize: '0.9rem' }}>{error}</p>}
          
          <button type="submit" className="btn" style={{ width: '100%' }}>
            {isRegistering ? 'Зареєструватися' : 'Увійти'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: 'var(--text-muted)' }}>
            {isRegistering ? 'Вже маєте акаунт?' : 'Ще не зареєстровані?'}
          </p>
          <button 
            className="btn habit-btn" 
            onClick={() => setIsRegistering(!isRegistering)}
            style={{ width: '100%', marginTop: '10px' }}
          >
            {isRegistering ? 'Перейти до входу' : 'Створити акаунт'}
          </button>
        </div>
      </div>
    </section>
  );
}