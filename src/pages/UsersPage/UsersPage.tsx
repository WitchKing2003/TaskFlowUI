import { useMemo, useState } from 'react';
import FormModal from '../../components/Modal/FormModal';
import type { FormModalField, FormModalValues } from '../../components/Modal/FormModal';
import ConfirmDeleteModal from '../../components/Modal/ConfirmDeleteModal';
import SuccessDialog from '../../components/Modal/SuccessDialog';
import RoleSummary from './RoleSummary/RoleSummary';
import PermissionsMatrix from './PermissionsMatrix/PermissionsMatrix';
import UserTable from './UserTable/UserTable';
import { AVATAR_COLORS, INITIAL_USERS, ROLES, hasPermission } from './usersData';
import type { AppUser, Role } from './usersData';
import './UsersPage.css';

// Người "đăng nhập" hiện tại — đổi 'viewer'/'developer'/'leader' để thấy UI gate quyền
const CURRENT_USER_ROLE: Role = 'manager';

const ADD_USER_FIELDS: FormModalField[] = [
  { name: 'name', label: 'Họ tên', required: true, placeholder: 'VD: Nguyen Van A' },
  { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'vd@promage.io' },
  {
    name: 'role',
    label: 'Vai trò',
    type: 'select',
    required: true,
    options: ROLES.map((role) => ({ value: role.key, label: role.label })),
  },
  { name: 'projects', label: 'Dự án (cách nhau bởi dấu phẩy)', placeholder: 'Nelsa web dev, Tasks app' },
];

function UsersPage() {
  const [users, setUsers] = useState<AppUser[]>(INITIAL_USERS);
  const [formOpen, setFormOpen] = useState(false);
  const [removing, setRemoving] = useState<AppUser | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const canManage = useMemo(
    () => hasPermission(CURRENT_USER_ROLE, 'manage_users'),
    [],
  );

  const handleAddUser = (values: FormModalValues) => {
    const id = Date.now();
    const projects = (values.projects || '')
      .split(',')
      .map((project) => project.trim())
      .filter(Boolean);

    setUsers((current) => [
      ...current,
      {
        id,
        name: values.name.trim(),
        email: values.email.trim(),
        role: values.role as Role,
        projects,
        joinedLabel: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        avatarColor: AVATAR_COLORS[id % AVATAR_COLORS.length],
      },
    ]);
    setSuccess(`Đã thêm ${values.name.trim()} vào nhóm với vai trò ${values.role}.`);
    setFormOpen(false);
  };

  const handleRemoveUser = () => {
    if (!removing) return;
    setUsers((current) => current.filter((user) => user.id !== removing.id));
    setSuccess(`Đã gỡ ${removing.name} khỏi dự án.`);
  };

  const handleRemoveProject = (userId: number, project: string) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === userId
          ? { ...user, projects: user.projects.filter((item) => item !== project) }
          : user,
      ),
    );
    setSuccess(`Đã gỡ khỏi dự án “${project}”.`);
  };

  return (
    <div className="users-page">
      <RoleSummary users={users} />

      <PermissionsMatrix />

      <UserTable
        users={users}
        currentUserRole={CURRENT_USER_ROLE}
        onRemoveUser={setRemoving}
        onRemoveProject={handleRemoveProject}
        onAddUser={() => setFormOpen(true)}
      />

      <FormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        mode="create"
        title="Thêm thành viên mới"
        fields={ADD_USER_FIELDS}
        onSubmit={handleAddUser}
        submitLabel="Thêm thành viên"
      />

      <ConfirmDeleteModal
        open={Boolean(removing)}
        onClose={() => setRemoving(null)}
        onConfirm={handleRemoveUser}
        itemName={removing?.name}
        description="Bạn có chắc muốn gỡ thành viên này khỏi dự án không?"
      />

      <SuccessDialog
        open={Boolean(success)}
        onClose={() => setSuccess(null)}
        description={success ?? undefined}
      />

      {!canManage ? (
        <p className="users-page__readonly-note">
          Bạn không có quyền quản lý thành viên — chế độ chỉ đọc.
        </p>
      ) : null}
    </div>
  );
}

export default UsersPage;
