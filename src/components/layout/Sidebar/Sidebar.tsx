import { NavLink } from 'react-router-dom';
import { SIDEBAR_NAV } from './navItems';
import './Sidebar.css';

const ICON_PATHS: Record<string, React.ReactNode> = {
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />,
  check: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V10" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 5.5a3.5 3.5 0 0 1 0 5" />
      <path d="M17.5 14.4a6.5 6.5 0 0 1 4 5.6" />
    </>
  ),
  template: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 20V9" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19.2 14.7a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.11-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.56-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34h.08A1.7 1.7 0 0 0 10.12 3.6V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.08a1.7 1.7 0 0 0 1.56 1.03H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.56 1.03Z" />
    </>
  ),
};

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

/**
 * Sidebar dùng chung cho toàn bộ phần app (dashboard, projects, tasks...).
 * Hỗ trợ thu gọn: chỉ còn logo + nút + FAB.
 */
function Sidebar({ collapsed, onToggleCollapsed }: SidebarProps) {
  return (
    <aside className={`dash-sidebar${collapsed ? ' is-collapsed' : ''}`}>
      <div className="dash-sidebar__top">
        <div className="dash-sidebar__logo">
          <span className="dash-sidebar__logo-mark">P</span>
          <span className="dash-sidebar__logo-name">Promage</span>
        </div>
        <button
          type="button"
          className="dash-sidebar__collapse"
          onClick={onToggleCollapsed}
          aria-label={collapsed ? 'Mở rộng thanh điều hướng' : 'Thu gọn thanh điều hướng'}
          aria-expanded={!collapsed}
        >
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d={collapsed ? 'm6 4 4 4-4 4' : 'm10 4-4 4 4 4'} />
          </svg>
        </button>
      </div>

      <button type="button" className="dash-sidebar__cta" title="Create new project">
        <span className="dash-sidebar__cta-plus">+</span>
        <span className="dash-sidebar__cta-label">Create new project</span>
      </button>

      <nav className="dash-sidebar__nav">
        {SIDEBAR_NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `dash-sidebar__link${isActive ? ' is-active' : ''}`
            }
            title={collapsed ? item.label : undefined}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {ICON_PATHS[item.icon]}
            </svg>
            <span className="dash-sidebar__link-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button type="button" className="dash-sidebar__fab" aria-label="Menu">
        P
      </button>
    </aside>
  );
}

export default Sidebar;
