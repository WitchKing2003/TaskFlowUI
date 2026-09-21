import { PERMISSIONS, ROLES, ROLE_PERMISSIONS, hasPermission } from '../usersData';
import './PermissionsMatrix.css';

function PermissionsMatrix() {
  return (
    <section className="perm-matrix">
      <div className="perm-matrix__scroll">
        <table className="perm-matrix__table">
          <thead>
            <tr>
              <th scope="col">Quyền hạn</th>
              {ROLES.map((role) => (
                <th scope="col" key={role.key} className="perm-matrix__role-col">
                  <span className={`perm-matrix__role-dot is-${role.key}`} aria-hidden="true" />
                  {role.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERMISSIONS.map((permission) => (
              <tr key={permission.key}>
                <th scope="row">{permission.label}</th>
                {ROLES.map((role) => {
                  const allowed = hasPermission(role.key, permission.key);
                  return (
                    <td
                      key={role.key}
                      className={allowed ? 'is-allowed' : 'is-denied'}
                      title={`${role.label} ${allowed ? 'có' : 'không có'} quyền: ${permission.label}`}
                    >
                      {allowed ? '✓' : '—'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="perm-matrix__hint">
        Quyền khai báo tập trung trong <code>ROLE_PERMISSIONS</code> — UI tự gate theo{' '}
        <code>{Object.keys(ROLE_PERMISSIONS).length} role</code> hiện có.
      </p>
    </section>
  );
}

export default PermissionsMatrix;
