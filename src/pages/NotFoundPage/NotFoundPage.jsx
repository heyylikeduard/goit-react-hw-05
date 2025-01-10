import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Сторінку не знайдено</h1>
      <p>Схоже, ви потрапили не туди. Поверніться на <Link to="/">головну сторінку</Link>.</p>
    </div>
  );
};

export default NotFoundPage;
