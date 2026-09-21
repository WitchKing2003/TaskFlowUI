// Types + dữ liệu mẫu cho trang quản lý User.
// Permissions được khai báo theo role; UI dùng hasPermission() để gate nút bấm.

export type Role = 'manager' | 'leader' | 'developer' | 'viewer';

export type Permission =
  | 'view_dashboard'
  | 'manage_projects'
  | 'manage_tasks'
  | 'assign_tasks'
  | 'view_reports'
  | 'manage_users'
  | 'add_user_to_project'
  | 'remove_user_from_project';

export const ROLES: { key: Role; label: string; description: string }[] = [
  { key: 'manager', label: 'Quản lý', description: 'Toàn quyền: dự án, task và thành viên' },
  { key: 'leader', label: 'Trưởng nhóm', description: 'Quản lý task và phân công trong nhóm' },
  { key: 'developer', label: 'Nhân viên', description: 'Thực hiện task được giao' },
  { key: 'viewer', label: 'Người xem', description: 'Chỉ xem, không chỉnh sửa' },
];

export const PERMISSIONS: { key: Permission; label: string }[] = [
  { key: 'view_dashboard', label: 'Xem dashboard' },
  { key: 'manage_projects', label: 'Quản lý dự án' },
  { key: 'manage_tasks', label: 'Quản lý task' },
  { key: 'assign_tasks', label: 'Phân công task' },
  { key: 'view_reports', label: 'Xem báo cáo' },
  { key: 'manage_users', label: 'Quản lý thành viên' },
  { key: 'add_user_to_project', label: 'Thêm user vào dự án' },
  { key: 'remove_user_from_project', label: 'Xóa user khỏi dự án' },
];

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  manager: [
    'view_dashboard',
    'manage_projects',
    'manage_tasks',
    'assign_tasks',
    'view_reports',
    'manage_users',
    'add_user_to_project',
    'remove_user_from_project',
  ],
  leader: ['view_dashboard', 'manage_tasks', 'assign_tasks', 'view_reports'],
  developer: ['view_dashboard', 'manage_tasks'],
  viewer: ['view_dashboard'],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

export const ROLE_BADGE_CLASS: Record<Role, string> = {
  manager: 'is-manager',
  leader: 'is-leader',
  developer: 'is-developer',
  viewer: 'is-viewer',
};

export interface AppUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  projects: string[];
  joinedLabel: string;
  avatarColor: 'orange' | 'purple' | 'yellow' | 'green';
}

export const INITIAL_USERS: AppUser[] = [
  { id: 1, name: 'Alex moian', email: 'alex@promage.io', role: 'manager', projects: ['Nelsa web dev', 'Datascale AI app', 'Fintech Singapore'], joinedLabel: 'Jan 05, 2024', avatarColor: 'orange' },
  { id: 2, name: 'Om Prakash Sao', email: 'om@promage.io', role: 'manager', projects: ['Nelsa web dev'], joinedLabel: 'Jan 12, 2024', avatarColor: 'purple' },
  { id: 3, name: 'Priya menon', email: 'priya@promage.io', role: 'leader', projects: ['Fintech Singapore', 'Website builder'], joinedLabel: 'Feb 02, 2024', avatarColor: 'yellow' },
  { id: 4, name: 'Neilsan mando', email: 'neilsan@promage.io', role: 'leader', projects: ['Datascale AI app'], joinedLabel: 'Feb 18, 2024', avatarColor: 'green' },
  { id: 5, name: 'Katty Nguyen', email: 'katty@promage.io', role: 'developer', projects: ['Nelsa web dev', 'Website builder'], joinedLabel: 'Mar 01, 2024', avatarColor: 'green' },
  { id: 6, name: 'Sukumar rao', email: 'sukumar@promage.io', role: 'developer', projects: ['Website builder'], joinedLabel: 'Mar 15, 2024', avatarColor: 'orange' },
  { id: 7, name: 'Matte hanory', email: 'matte@promage.io', role: 'viewer', projects: [], joinedLabel: 'Apr 09, 2024', avatarColor: 'purple' },
];

/** Tổng số thành viên theo role — dùng cho thẻ tổng quan */
export function countByRole(users: AppUser[]): Record<Role, number> {
  const counts = { manager: 0, leader: 0, developer: 0, viewer: 0 } as Record<Role, number>;
  for (const user of users) counts[user.role] += 1;
  return counts;
}

export const AVATAR_COLORS = ['orange', 'purple', 'yellow', 'green'] as const;
