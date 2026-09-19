import { useEffect, useState } from 'react';

const TRACKING_PROJECTS = 95;

function BrandPanel({ progress, avatars }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setDisplayValue(progress));
    return () => cancelAnimationFrame(frame);
  }, [progress]);

  const circumference = 2 * Math.PI * 20;

  return (
    <aside className="auth-brand">
      <div className="auth-brand__logo">
        <span className="auth-brand__logo-mark">P</span>
        <span className="auth-brand__logo-name">Promage</span>
      </div>

      <h1 className="auth-brand__heading">
        Theo dõi mọi dự án
        <br />
        ở một nơi duy nhất.
      </h1>

      <p className="auth-brand__sub">
        Đăng nhập để xem tiến độ, ngân sách và khối lượng công việc của cả nhóm
        theo thời gian thực.
      </p>

      <div className="auth-brand__card">
        <div className="auth-brand__ring">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <circle className="auth-brand__ring-track" cx="24" cy="24" r="20" />
            <circle
              className="auth-brand__ring-value"
              cx="24"
              cy="24"
              r="20"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - displayValue / 100)}
            />
          </svg>
          <span className="auth-brand__ring-text">{progress}%</span>
        </div>
        <div>
          <p className="auth-brand__card-title">
            {progress}% dự án hoàn thành
          </p>
          <p className="auth-brand__card-sub">
            {TRACKING_PROJECTS} dự án đang theo dõi
          </p>
        </div>
      </div>

      <div className="auth-brand__team">
        <div className="auth-brand__avatars">
          {avatars.map((initials, index) => (
            <span
              key={initials + index}
              className={`auth-brand__avatar auth-brand__avatar--${index % 4}`}
            >
              {initials}
            </span>
          ))}
          <span className="auth-brand__avatar auth-brand__avatar--more">
            +7
          </span>
        </div>
        <p className="auth-brand__team-note">đang hoạt động hôm nay</p>
      </div>

      <p className="auth-brand__footer">
        © 2026 Promage. Mọi quyền được bảo lưu.
      </p>
    </aside>
  );
}

function AuthLayout({ progress = 72, avatars = ['S', 'D', 'K', 'H'], children }) {
  return (
    <div className="auth-screen">
      <div className="auth-shell">
        <BrandPanel progress={progress} avatars={avatars} />
        <main className="auth-main">{children}</main>
      </div>
    </div>
  );
}

export default AuthLayout;
