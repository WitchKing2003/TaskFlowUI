import { ROLES, countByRole } from '../usersData';
import type { AppUser } from '../usersData';
import './RoleSummary.css';

const ROLE_CLASS: Record<string, string> = {
  manager: 'is-manager',
  leader: 'is-leader',
  developer: 'is-developer',
  viewer: 'is-viewer',
};

function RoleSummary({ users }: { users: AppUser[] }) {
  const counts = countByRole(users);

  return (
    <div className="role-summary">
      <div className="role-summary__total">
        <span className="role-summary__total-number">{users.length}</span>
        <span className="role-summary__total-label">Tổng thành viên</span>
      </div>

      {ROLES.map((role) => (
        <article key={role.key} className={`role-summary__card ${ROLE_CLASS[role.key]}`}>
          <span className="role-summary__card-count">{counts[role.key]}</span>
          <span className="role-summary__card-label">{role.label}</span>
          <span className="role-summary__card-desc">{role.description}</span>
        </article>
      ))}
    </div>
  );
}

export default RoleSummary;
