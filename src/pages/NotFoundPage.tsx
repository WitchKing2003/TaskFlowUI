import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section>
      <h2>404</h2>
      <p>Không tìm thấy trang.</p>
      <Link to="/">Về trang chủ</Link>
    </section>
  );
}

export default NotFoundPage;
