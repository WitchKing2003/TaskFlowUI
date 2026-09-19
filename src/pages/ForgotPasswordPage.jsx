import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import FormField from '../components/auth/FormField';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(undefined);
  const [sentTo, setSentTo] = useState(undefined);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setError('Vui lòng nhập email.');
      return;
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError('Email chưa đúng định dạng.');
      return;
    }
    setError(undefined);
    setSentTo(email.trim());
  };

  if (sentTo) {
    return (
      <AuthLayout>
        <div className="auth-card auth-card--sent">
          <div className="auth-sent-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M3.4 11.04 8.3 15.94 20.6 3.64" />
            </svg>
          </div>

          <h2 className="auth-card__title">Kiểm tra email của bạn</h2>

          <p className="auth-card__sub">
            Chúng tôi đã gửi liên kết đặt lại mật khẩu đến{' '}
            <strong>{sentTo}</strong>. Vui lòng kiểm tra hộp thư đến (và thư
            rác) để tiếp tục.
          </p>

          <button
            type="button"
            className="auth-submit"
            onClick={() => {
              setSentTo(undefined);
              setEmail('');
            }}
          >
            Gửi lại email
          </button>

          <Link to="/login" className="auth-back-link">
            ← Quay lại đăng nhập
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="auth-card">
        <h2 className="auth-card__title">Quên mật khẩu?</h2>

        <p className="auth-card__sub">
          Nhập email đăng ký và chúng tôi sẽ gửi cho bạn liên kết đặt lại mật
          khẩu.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <FormField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError(undefined);
            }}
            placeholder="ban@congty.com"
            error={error}
            autoComplete="email"
          />

          <button type="submit" className="auth-submit">
            Gửi liên kết đặt lại
          </button>
        </form>

        <Link to="/login" className="auth-back-link">
          ← Quay lại đăng nhập
        </Link>
      </div>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
