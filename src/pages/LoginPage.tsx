import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import FormField from '../components/auth/FormField';
import GoogleButton from '../components/auth/GoogleButton';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN = 8;

interface LoginForm {
  email: string;
  password: string;
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2.58 12C4.14 8.7 7.76 6.1 12 6.1s7.86 2.6 9.42 5.9c-1.56 3.3-5.18 5.9-9.42 5.9S4.14 15.3 2.58 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4.04 4.04 19.96 19.96" />
      <path d="M9.53 10.7a3 3 0 0 0 3.77 3.77" />
      <path d="M6.55 8.4C4.53 9.69 3.13 11.09 2.58 12c1.56 3.3 5.18 5.9 9.42 5.9 1.35 0 2.65-.25 3.84-.7M10.06 6.28A9.4 9.4 0 0 1 12 6.1c4.24 0 7.86 2.6 9.42 5.9-.5 1.06-1.26 2.08-2.23 2.97" />
    </svg>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<LoginForm> & { form?: string }>({});
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const updateField = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const validate = (): Partial<LoginForm> => {
    const nextErrors: Partial<LoginForm> = {};
    if (!form.email.trim()) {
      nextErrors.email = 'Vui lòng nhập email.';
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = 'Email chưa đúng định dạng.';
    }
    if (!form.password) {
      nextErrors.password = 'Vui lòng nhập mật khẩu.';
    } else if (form.password.length < PASSWORD_MIN) {
      nextErrors.password = `Mật khẩu cần ít nhất ${PASSWORD_MIN} ký tự.`;
    }
    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      navigate('/');
    }
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <h2 className="auth-card__title">Chào mừng trở lại</h2>

        <p className="auth-card__switch">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="auth-link">
            Đăng ký miễn phí
          </Link>
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <FormField
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder="ban@congty.com"
            error={errors.email}
            autoComplete="email"
          />

          <FormField
            id="password"
            label="Mật khẩu"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={updateField}
            placeholder="••••••••"
            error={errors.password}
            autoComplete="current-password"
          >
            <button
              type="button"
              className="auth-toggle"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </FormField>

          <div className="auth-row">
            <label className="auth-check">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
              />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <Link to="/forgot-password" className="auth-link">
              Quên mật khẩu?
            </Link>
          </div>

          {errors.form ? <p className="auth-form-error">{errors.form}</p> : null}

          <button type="submit" className="auth-submit">
            Đăng nhập
          </button>
        </form>

        <div className="auth-divider">
          <span>hoặc tiếp tục với</span>
        </div>

        <GoogleButton />
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
