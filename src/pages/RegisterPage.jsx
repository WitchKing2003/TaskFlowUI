import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import FormField from '../components/auth/FormField';
import GoogleButton from '../components/auth/GoogleButton';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_MIN = 2;
const PASSWORD_MIN = 8;

const STRENGTH_STEPS = [
  { threshold: 0, label: 'Yếu', className: 'is-weak' },
  { threshold: 34, label: 'Trung bình', className: 'is-medium' },
  { threshold: 67, label: 'Mạnh', className: 'is-strong' },
];

function scorePassword(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= PASSWORD_MIN) score += 34;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 22;
  if (/\d/.test(password)) score += 22;
  if (/[^A-Za-z0-9]/.test(password)) score += 22;
  return Math.min(100, score);
}

function StrengthMeter({ score }) {
  const step = STRENGTH_STEPS.reduce(
    (best, current) => (score >= current.threshold ? current : best),
    STRENGTH_STEPS[0],
  );

  return (
    <div className={`auth-strength ${step.className}`}>
      <div className="auth-strength__track">
        <div className="auth-strength__bar" style={{ width: `${score}%` }} />
      </div>
      <span className="auth-strength__label">{step.label}</span>
    </div>
  );
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

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [errors, setErrors] = useState({});
  const [accepted, setAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const strength = useMemo(() => scorePassword(form.password), [form.password]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    if (form.name.trim().length < NAME_MIN) {
      nextErrors.name = 'Vui lòng nhập họ tên (ít nhất 2 ký tự).';
    }
    if (!form.email.trim()) {
      nextErrors.email = 'Vui lòng nhập email.';
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = 'Email chưa đúng định dạng.';
    }
    if (form.password.length < PASSWORD_MIN) {
      nextErrors.password = `Mật khẩu cần ít nhất ${PASSWORD_MIN} ký tự.`;
    }
    if (!form.confirm || form.confirm !== form.password) {
      nextErrors.confirm = 'Mật khẩu nhập lại chưa khớp.';
    }
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (!accepted) {
      nextErrors.form = 'Vui lòng đồng ý với điều khoản sử dụng.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      navigate('/');
    }
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <h2 className="auth-card__title">Tạo tài khoản</h2>

        <p className="auth-card__switch">
          Đã có tài khoản?{' '}
          <Link to="/login" className="auth-link">
            Đăng nhập
          </Link>
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <FormField
            id="name"
            label="Họ và tên"
            value={form.name}
            onChange={updateField}
            placeholder="Nguyễn Văn A"
            error={errors.name}
            autoComplete="name"
          />

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
            autoComplete="new-password"
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
          <StrengthMeter score={strength} />

          <FormField
            id="confirm"
            label="Nhập lại mật khẩu"
            type={showPassword ? 'text' : 'password'}
            value={form.confirm}
            onChange={updateField}
            placeholder="••••••••"
            error={errors.confirm}
            autoComplete="new-password"
          />

          <label className="auth-check auth-check--terms">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
            />
            <span>
              Tôi đồng ý với{' '}
              <a href="#" className="auth-link">
                điều khoản
              </a>{' '}
              và{' '}
              <a href="#" className="auth-link">
                chính sách bảo mật
              </a>
              .
            </span>
          </label>

          {errors.form ? <p className="auth-form-error">{errors.form}</p> : null}

          <button type="submit" className="auth-submit">
            Đăng ký miễn phí
          </button>
        </form>

        <div className="auth-divider">
          <span>hoặc tiếp tục với</span>
        </div>

        <GoogleButton>Đăng ký với Google</GoogleButton>
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;
