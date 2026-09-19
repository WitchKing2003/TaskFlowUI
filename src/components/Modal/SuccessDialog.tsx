import { useEffect } from 'react';
import Modal from './Modal';
import './Modal.css';

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  /** Mô tả kết quả, ví dụ "Dự án đã được tạo thành công." */
  description?: string;
  /** Tự đóng sau ms này; bỏ qua nếu muốn người dùng bấm nút */
  autoCloseMs?: number;
}

/**
 * Dialog thông báo thành công sau create / update / delete.
 * Mặc định tự đóng sau 2s.
 */
function SuccessDialog({
  open,
  onClose,
  title = 'Thành công!',
  description,
  autoCloseMs = 2000,
}: SuccessDialogProps) {
  useEffect(() => {
    if (!open || !autoCloseMs) return undefined;
    const timer = setTimeout(onClose, autoCloseMs);
    return () => clearTimeout(timer);
  }, [open, autoCloseMs, onClose]);

  return (
    <Modal open={open} onClose={onClose} maxWidth={360} hideClose dismissible>
      <div className="modal--success">
        <div className="modal-success__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M3.4 11.04 8.3 15.94 20.6 3.64" />
          </svg>
        </div>
        <h3 className="modal-success__title">{title}</h3>
        {description ? <p className="modal-success__desc">{description}</p> : null}

        {autoCloseMs ? null : (
          <div className="modal-actions modal-actions--center">
            <button type="button" className="modal-btn modal-btn--primary" onClick={onClose}>
              OK
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

export default SuccessDialog;
