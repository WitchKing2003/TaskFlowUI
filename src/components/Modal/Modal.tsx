import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';
import './Modal.css';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Tiêu đề hiển thị trên đầu modal */
  title?: ReactNode;
  /** Chặn đóng khi bấm ESC/backdrop (dùng cho form bắt buộc) */
  dismissible?: boolean;
  /** Độ rộng tối đa của modal */
  maxWidth?: number;
  /** Ẩn nút X góc phải (dùng cho dialog thông báo) */
  hideClose?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Modal nền tảng: portal vào body, đóng bằng ESC / nút X / bấm nền,
 * khóa scroll trang bên dưới, focus phần tử đầu tiên khi mở.
 * Các modal khác (Form, Delete, Success) đều dựng trên component này.
 */
function Modal({
  open,
  onClose,
  title,
  dismissible = true,
  maxWidth = 480,
  hideClose = false,
  className,
  children,
}: ModalProps) {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && dismissible) onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose, dismissible]);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => {
      const dialog = document.querySelector<HTMLElement>('.modal');
      dialog?.querySelector<HTMLElement>(
        'input, textarea, select, button:not(.modal__close)',
      )?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      className="modal-overlay"
      onMouseDown={(event) => {
        if (dismissible && event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : undefined}
        className={`modal${className ? ` ${className}` : ''}`}
        style={{ maxWidth }}
      >
        {!hideClose ? (
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            aria-label="Đóng"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        ) : null}

        {title ? <h3 className="modal__title">{title}</h3> : null}
        {children}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
