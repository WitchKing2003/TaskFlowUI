import { NavLink } from 'react-router-dom';
import './Sidebar.css';

interface NavItem {
  label: string;
  accent?: boolean;
  active?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Create new project', accent: true },
  { label: 'Dashboards', active: true },
  { label: 'Projects' },
  { label: 'Tasks' },
  { label: 'Dashboard' },
  { label: 'Time log' },
  { label: 'Resource mgnt' },
  { label: 'Users' },
  { label: 'Project template' },
  { label: 'Menu settings' },
];

function Sidebar() {
  return (
    <aside className="dash-sidebar">
      <div className="dash-sidebar__logo">
        <span className="dash-sidebar__logo-mark">P</span>
        <span className="dash-sidebar__logo-name">Promage</span>
      </div>

      <nav className="dash-sidebar__nav">
        {NAV_ITEMS.map((item) =>
          item.accent ? (
            <button key={item.label} type="button" className="dash-sidebar__cta">
              + Create new project
            </button>
          ) : (
            <NavLink
              key={item.label}
              to="/"
              className={`dash-sidebar__link${item.active ? ' is-active' : ''}`}
            >
              {item.label}
            </NavLink>
          ),
        )}
      </nav>

      <button type="button" className="dash-sidebar__fab" aria-label="Menu">
        P
      </button>
    </aside>
  );
}

export default Sidebar;
