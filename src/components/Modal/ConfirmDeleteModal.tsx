import Modal from './Modal';
import './Modal.css';

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  /** Hành vi khi bấm "Có, xóa" */
  onConfirm: () => void;
  /** Tên đối tượng bị xóa, hiển thị đậm trong mô tả */
  itemName?: string;
  /** Mô tả hiển thị; mặc định dùng câu chuẩn */
  description?: string;
  title?: string;
}

/**
 * Modal xác nhận xóa — tách riêng vì có layout và nút riêng (No / Yes).
 * Dev chỉ cần truyền description (và itemName nếu muốn in đậm tên đối tượng).
 */
function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  itemName,
  description,
  title = 'Xác nhận xóa',
}: ConfirmDeleteModalProps) {
  return (
    <Modal open={open} onClose={onClose} title={title} maxWidth={420}>
      <div className="modal-delete">
        <div className="modal-delete__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          </svg>
        </div>

        <p className="modal-delete__text">
          {description ?? 'Bạn có chắc muốn xóa không?'}
          {itemName ? (
            <>
              {' '}
              <strong>“{itemName}”</strong>
            </>
          ) : null}
          {' '}
          Hành động này không thể hoàn tác.
        </p>

        <div className="modal-actions modal-actions--center">
          <button type="button" className="modal-btn modal-btn--ghost" onClick={onClose}>
            No
          </button>
          <button
            type="button"
            className="modal-btn modal-btn--danger"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Yes, delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDeleteModal;
