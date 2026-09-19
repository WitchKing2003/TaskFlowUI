import './Topbar.css';

function Topbar() {
  return (
    <header className="dash-topbar">
      <h1 className="dash-topbar__title">Dashboard</h1>

      <div className="dash-topbar__search">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" />
          <path d="m20 20-3.8-3.8" />
        </svg>
        <input type="search" placeholder="Search for anything..." />
      </div>

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
