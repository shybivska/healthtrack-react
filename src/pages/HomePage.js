import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  // --- Стан для корисних звичок ---
  const [habitInfo, setHabitInfo] = useState('Оберіть звичку, щоб дізнатися більше.');
  const [activeHabit, setActiveHabit] = useState(null);

  const handleHabitClick = (info, index) => {
    setHabitInfo(`Цікавий факт: ${info}`);
    setActiveHabit(index);
  };

  // --- Стан для блогу (відкриття/закриття статей) ---
  const [openArticles, setOpenArticles] = useState({});

  const articlesData = [
    { title: "Як правильно дихати під час бігу?", content: "Дихання має бути ритмічним: вдих на 2 кроки, видих на 2 кроки. Дихайте через ніс і рот одночасно, щоб м'язи отримували достатньо кисню." },
    { title: "Топ 5 продуктів для набору маси", content: "1. Яйця. 2. Куряча грудка. 3. Сир (домашній). 4. Горіхи. 5. Гречка. Ці продукти багаті на білок та складні вуглеводи." },
    { title: "Чому важлива розминка?", content: "Розминка розігріває м'язи, суглоби та зв'язки, готуючи їх до навантажень. Це знижує ризик травм на 40% і покращує результати." }
  ];

  const toggleArticle = (index) => {
    setOpenArticles(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // --- Стан для відгуків ---
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [showError, setShowError] = useState(false);

  const handleReviewSubmit = () => {
    if (name.trim() === '' || comment.trim() === '') {
      setShowError(true);
    } else {
      setShowError(false);
      const newReview = {
        name: name.trim(),
        comment: comment.trim(),
        date: new Date().toLocaleDateString('uk-UA')
      };
      setReviews([...reviews, newReview]);
      setName('');
      setComment('');
    }
  };

  return (
    <>
      {/* Секція Банер */}
      <section className="hero">
        <div className="container hero-content">
          <h1>Твій шлях до ідеального тіла</h1>
          <p>Відстежуй тренування, харчування та досягай нових вершин щодня!</p>
          <Link to="/workouts" className="btn">Почати тренування</Link>
        </div>
      </section>

      <div className="container">
        {/* Секція Корисні звички */}
        <section className="section bg-light rounded-section" style={{ marginTop: '40px' }}>
          <h2 className="section-title">Корисні звички 🧠</h2>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
            <button 
              className="btn habit-btn" 
              style={{ opacity: activeHabit === 0 || activeHabit === null ? '1' : '0.5' }}
              onClick={() => handleHabitClick("Сон - це основа відновлення. Намагайтеся спати 7-8 годин.", 0)}
            >Сон</button>
            <button 
              className="btn habit-btn" 
              style={{ opacity: activeHabit === 1 || activeHabit === null ? '1' : '0.5' }}
              onClick={() => handleHabitClick("Вода допомагає суглобам та травленню. Пийте часто, але невеликими порціями.", 1)}
            >Гідратація</button>
            <button 
              className="btn habit-btn" 
              style={{ opacity: activeHabit === 2 || activeHabit === null ? '1' : '0.5' }}
              onClick={() => handleHabitClick("Розтяжка після тренування зменшує біль у м'язах та покращує гнучкість.", 2)}
            >Відновлення</button>
          </div>
          <div style={{ padding: '20px', textAlign: 'center', border: '2px dashed #27ae60', borderRadius: '10px', fontSize: '1.1rem' }}>
            {habitInfo}
          </div>
        </section>

        {/* Секція Блог */}
        <section className="section">
          <h2 className="section-title">Корисні статті 📚</h2>
          <div>
            {articlesData.map((article, index) => (
              <div key={index} className="article-item">
                <h3 className="article-title" onClick={() => toggleArticle(index)}>
                  {article.title} {openArticles[index] ? '🔼' : '🔽'}
                </h3>
                {openArticles[index] && (
                  <p className="article-content" style={{ display: 'block' }}>{article.content}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Секція Відгуки */}
        <section className="section bg-light rounded-section" style={{ marginBottom: '40px' }}>
          <h2 className="section-title">Залиште відгук про платформу 💬</h2>
          <div className="form-container">
            <input 
              type="text" 
              placeholder="Ваше ім'я" 
              className="form-control" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
            <textarea 
              placeholder="Напишіть ваші враження або побажання..." 
              className="form-control" 
              rows="3" 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
            />
            {showError && <p style={{ color: '#e74c3c', fontWeight: 'bold' }}>⚠️ Будь ласка, заповніть усі поля!</p>}
            <button className="btn" onClick={handleReviewSubmit}>Надіслати відгук</button>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3 style={{ borderBottom: '2px solid #27ae60', paddingBottom: '5px' }}>Останні відгуки:</h3>
            {reviews.map((rev, index) => (
              <div key={index} style={{ background: 'white', padding: '15px', marginTop: '15px', borderRadius: '8px', borderLeft: '5px solid #3498db', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                <strong style={{ color: '#2c3e50', fontSize: '1.1rem' }}>{rev.name}</strong> 
                <span style={{ color: '#95a5a6', fontSize: '0.8rem', marginLeft: '10px' }}>({rev.date})</span>
                <p style={{ margin: '10px 0 0 0' }}>{rev.comment}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}