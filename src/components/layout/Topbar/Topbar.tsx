import './Topbar.css';

interface TopbarProps {
  /** Tiêu đề trang hiện tại, ví dụ "Dashboard", "Projects", "Tasks" */
  title: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onToggleSidebar: () => void;
}

function Topbar({ title, theme, onToggleTheme, onToggleSidebar }: TopbarProps) {
  return (
    <header className="dash-topbar">
      <button
        type="button"
        className="dash-topbar__icon-btn"
        onClick={onToggleSidebar}
        aria-label="Thu gọn / mở rộng sidebar"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <h1 className="dash-topbar__title">{title}</h1>

      <div className="dash-topbar__search">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m20 20-3.8-3.8" />
        </svg>
        <input type="search" placeholder="Search for anything..." />
      </div>

      <button
        type="button"
        className="dash-topbar__icon-btn"
        onClick={onToggleTheme}
        aria-label={theme === 'light' ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng'}
      >
        {theme === 'light' ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
          </svg>
        )}
      </button>

      <button type="button" className="dash-topbar__bell" aria-label="Thông báo">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 9a6 6 0 1 0-12 0c0 6-2.5 7-2.5 7h17S18 15 18 9" />
          <path d="M10.3 20a2 2 0 0 0 3.4 0" />
        </svg>
        <span className="dash-topbar__bell-dot" />
      </button>

      <button type="button" className="dash-topbar__user">
        <span className="dash-topbar__avatar">AM</span>
        <span className="dash-topbar__user-info">
          <strong>Alex mordi</strong>
          <small>Product manager</small>
        </span>
        <svg viewBox="0 0 10 6" aria-hidden="true">
          <path d="M1 1l4 4 4-4" />
        </svg>
      </button>
    </header>
  );
}

export default Topbar;
