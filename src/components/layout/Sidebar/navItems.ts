export type SidebarNavItem = {
  label: string;
  icon: string;
  to: string;
};

export const SIDEBAR_NAV: SidebarNavItem[] = [
  { label: 'Dashboard', icon: 'grid', to: '/' },
  { label: 'Projects', icon: 'folder', to: '/projects' },
  { label: 'Tasks', icon: 'check', to: '/tasks' },
  { label: 'Time log', icon: 'clock', to: '/time-log' },
  { label: 'Resource mgnt', icon: 'chart', to: '/resources' },
  { label: 'Users', icon: 'users', to: '/users' },
  { label: 'Project template', icon: 'template', to: '/templates' },
  { label: 'Menu settings', icon: 'gear', to: '/settings' },
];
