import { useState } from 'react';
import type { ChangeEvent } from 'react';
import Modal from '../../../components/Modal/Modal';
import { PERMISSIONS, ROLES, permissionsForRole } from '../usersData';
import type { AppUser, Permission, Role } from '../usersData';
import './EditMemberModal.css';

interface EditMemberModalProps {
  open: boolean;
  onClose: () => void;
  /** User đang sửa; null khi đóng */
  member: AppUser | null;
  /** permissions = undefined nghĩa là bỏ tùy chỉnh, dùng mặc định của role */
  onSave: (userId: number, role: Role, permissions?: Permission[]) => void;
}

/**
 * Modal cập nhật vai trò + quyền riêng cho từng thành viên.
 * - Chọn role → quyền reset về mặc định của role đó.
 * - Tick "Tùy chỉnh quyền riêng" → bật checkbox để chỉnh từng quyền.
 */
function EditMemberModal({ open, onClose, member, onSave }: EditMemberModalProps) {
  // State khởi tạo từ member lúc mount — component được remount qua `key`
  // ở phía cha mỗi khi member đổi, nên không cần effect đồng bộ.
  const [role, setRole] = useState<Role>(member?.role ?? 'developer');
  const [permissions, setPermissions] = useState<Permission[]>(
    member?.permissions ?? permissionsForRole(member?.role ?? 'developer'),
  );
  const [custom, setCustom] = useState(Boolean(member?.permissions));
  const [error, setError] = useState<string | null>(null);

  if (!member) return null;

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const nextRole = event.target.value as Role;
    setRole(nextRole);
    setPermissions(permissionsForRole(nextRole)); // reset về mặc định của role mới
    setCustom(false);
    setError(null);
  };

  const toggleCustom = () => {
    setCustom((value) => !value);
    setError(null);
  };

  const togglePermission = (permission: Permission) => {
    setPermissions((current) =>
      current.includes(permission)
        ? current.filter((item) => item !== permission)
        : [...current, permission],
    );
    setError(null);
  };

  const handleSave = () => {
    if (custom && permissions.length === 0) {
      setError('Phải chọn ít nhất 1 quyền (hoặc bỏ tùy chỉnh để dùng mặc định của role).');
      return;
    }
    onSave(member.id, role, custom ? [...permissions] : undefined);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Cập nhật thành viên" maxWidth={460}>
      <div className="edit-member">
        {/* Người được sửa */}
        <div className="edit-member__who">
          <span className={`edit-member__avatar edit-member__avatar--${member.avatarColor}`} aria-hidden="true">
            {member.name.slice(0, 1)}
          </span>
          <div>
            <p className="edit-member__name">{member.name}</p>
            <p className="edit-member__email">{member.email}</p>
          </div>
        </div>

        {/* Chọn role */}
        <label className="edit-member__field" htmlFor="edit-member-role">
          Vai trò
        </label>
        <select
          id="edit-member-role"
          className="modal-select"
          value={role}
          onChange={handleRoleChange}
        >
          {ROLES.map((item) => (
            <option key={item.key} value={item.key}>
              {item.label}
            </option>
          ))}
        </select>
        <p className="edit-member__role-desc">
          {ROLES.find((item) => item.key === role)?.description}
        </p>

        {/* Tùy chỉnh quyền */}
        <label className="edit-member__toggle">
          <input type="checkbox" checked={custom} onChange={toggleCustom} />
          <span>
            Tùy chỉnh quyền riêng
            <small>(bỏ tick = dùng quyền mặc định của vai trò)</small>
          </span>
        </label>

        <div className={`edit-member__permissions${custom ? ' is-enabled' : ' is-disabled'}`}>
          {PERMISSIONS.map((permission) => {
            const checked = permissions.includes(permission.key);
            return (
              <label key={permission.key} className="edit-member__permission">
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={!custom}
                  onChange={() => togglePermission(permission.key)}
                />
                <span>{permission.label}</span>
              </label>
            );
          })}
        </div>

        {error ? <p className="edit-member__error">{error}</p> : null}

        <div className="modal-actions">
          <button type="button" className="modal-btn modal-btn--ghost" onClick={onClose}>
            Hủy
          </button>
          <button type="button" className="modal-btn modal-btn--primary" onClick={handleSave}>
            Lưu thay đổi
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default EditMemberModal;
