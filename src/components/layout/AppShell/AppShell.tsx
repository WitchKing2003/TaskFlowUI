import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Topbar from '../Topbar/Topbar';
import { useTheme } from '../../../hooks/useTheme';
import './AppShell.css';

const TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/projects': 'Projects',
  '/tasks': 'Tasks',
  '/users': 'Users',
  '/about': 'About',
};

/**
 * Khung layout chung cho các màn app (dashboard, projects, tasks...):
 * Sidebar thu gọn được + Topbar với tìm kiếm / đổi theme / user.
 */
function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();
  const title = TITLES[pathname] ?? 'Promage';

  return (
    <div className="dash-screen">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={() => setCollapsed((value) => !value)}
      />

      <div className="dash-content">
        <Topbar
          title={title}
          theme={theme}
          onToggleTheme={toggle}
          onToggleSidebar={() => setCollapsed((value) => !value)}
        />
        <Outlet />
      </div>
    </div>
  );
}

export default AppShell;
