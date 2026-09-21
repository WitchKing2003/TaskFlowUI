import { ROLE_BADGE_CLASS, ROLES, hasPermission } from '../usersData';
import type { AppUser, Role } from '../usersData';
import './UserTable.css';

interface UserTableProps {
  users: AppUser[];
  /** Role của người đang đăng nhập (đang giả lập = manager) */
  currentUserRole: Role;
  onRemoveUser: (user: AppUser) => void;
  /** Gỡ 1 chip dự án khỏi user */
  onRemoveProject: (userId: number, project: string) => void;
  onAddUser: () => void;
}

function RoleBadge({ role }: { role: Role }) {
  const label = ROLES.find((item) => item.key === role)?.label ?? role;
  return <span className={`dash-badge ${ROLE_BADGE_CLASS[role]}`}>{label}</span>;
}

function UserTable({
  users,
  currentUserRole,
  onRemoveUser,
  onRemoveProject,
  onAddUser,
}: UserTableProps) {
  const canRemove = hasPermission(currentUserRole, 'remove_user_from_project');
  const canRemoveProject = hasPermission(currentUserRole, 'remove_user_from_project');

  return (
    <section className="user-table">
      <header className="user-table__head">
        <div>
          <h3 className="user-table__title">Thành viên dự án</h3>
          <p className="user-table__subtitle">
            {users.length} thành viên · bạn đang đăng nhập với vai trò{' '}
            <strong>{ROLES.find((item) => item.key === currentUserRole)?.label}</strong>
          </p>
        </div>
        {hasPermission(currentUserRole, 'add_user_to_project') ? (
          <button type="button" className="user-table__add" onClick={onAddUser}>
            + Add user
          </button>
        ) : null}
      </header>

      <div className="user-table__scroll">
        <table className="user-table__table">
          <thead>
            <tr>
              <th scope="col">Thành viên</th>
              <th scope="col">Vai trò</th>
              <th scope="col">Dự án</th>
              <th scope="col">Tham gia</th>
              <th scope="col" aria-label="Hành động" />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-table__user">
                    <span className={`user-table__avatar user-table__avatar--${user.avatarColor}`} aria-hidden="true">
                      {user.name.slice(0, 1)}
                    </span>
                    <div>
                      <p className="user-table__name">{user.name}</p>
                      <p className="user-table__email">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <RoleBadge role={user.role} />
                </td>
                <td>
                  <div className="user-table__projects">
                    {user.projects.length === 0 ? (
                      <span className="user-table__no-project">—</span>
                    ) : (
                      user.projects.map((project) => (
                        <span key={project} className="user-table__project-chip">
                          {project}
                          {canRemoveProject ? (
                            <button
                              type="button"
                              className="user-table__chip-remove"
                              aria-label={`Gỡ ${user.name} khỏi ${project}`}
                              onClick={() => onRemoveProject(user.id, project)}
                            >
                              ×
                            </button>
                          ) : null}
                        </span>
                      ))
                    )}
                  </div>
                </td>
                <td className="user-table__joined">{user.joinedLabel}</td>
                <td className="user-table__actions">
                  <button
                    type="button"
                    className="user-table__remove"
                    disabled={!canRemove || user.role === 'manager'}
                    title={
                      !canRemove
                        ? 'Bạn không có quyền remove user'
                        : user.role === 'manager'
                          ? 'Không thể gỡ Quản lý'
                        : `Gỡ ${user.name} khỏi dự án`
                    }
                    onClick={() => onRemoveUser(user)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default UserTable;
