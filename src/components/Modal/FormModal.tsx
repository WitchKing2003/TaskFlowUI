import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import Modal from './Modal';
import './Modal.css';

export type FormModalFieldType = 'text' | 'email' | 'number' | 'date' | 'textarea' | 'select';

export interface FormModalField {
  name: string;
  label: string;
  type?: FormModalFieldType;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  /** Ẩn trong chế độ edit (ví dụ password) */
  createOnly?: boolean;
  half?: boolean;
}

export type FormModalValues = Record<string, string>;

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  /** 'create' | 'update' — đổi tiêu đề và nhãn nút */
  mode: 'create' | 'update';
  title: string;
  fields: FormModalField[];
  /** Giá trị ban đầu (khi update); rỗng khi create */
  initialValues?: FormModalValues;
  /** Gọi khi form hợp lệ; trả về false/null để giữ modal mở (ví dụ lỗi server) */
  onSubmit?: (values: FormModalValues) => void;
  submitLabel?: string;
}

function validateField(field: FormModalField, value: string): string | undefined {
  if (field.required && !value.trim()) {
    return `${field.label} là bắt buộc.`;
  }
  if (field.type === 'email' && value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
    return 'Email chưa đúng định dạng.';
  }
  return undefined;
}

/**
 * Modal tạo / cập nhật: khai báo fields, component tự lo
 * render input, validate required và gom giá trị gửi ra onSubmit.
 */
function FormModal({
  open,
  onClose,
  mode,
  title,
  fields,
  initialValues = {},
  onSubmit,
  submitLabel,
}: FormModalProps) {
  const [values, setValues] = useState<FormModalValues>({});
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  // Reset form mỗi lần mở
  useEffect(() => {
    if (!open) return;
    const next: FormModalValues = {};
    for (const field of fields) {
      next[field.name] = initialValues[field.name] ?? '';
    }
    setValues(next);
    setErrors({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const visibleFields = fields.filter((field) => !(mode === 'update' && field.createOnly));

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Record<string, string | undefined> = {};
    for (const field of visibleFields) {
      const message = validateField(field, values[field.name] ?? '');
      if (message) nextErrors[field.name] = message;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onSubmit?.(values);
    }
  };

  const renderField = (field: FormModalField) => {
    const error = errors[field.name];
    const inputClass = `modal-input${error ? ' modal-input--error' : ''}`;
    const id = `modal-field-${field.name}`;

    return (
      <div className="modal-field" key={field.name}>
        <label className="modal-field__label" htmlFor={id}>
          {field.label}
          {field.required ? <span aria-hidden="true"> *</span> : null}
        </label>

        {field.type === 'textarea' ? (
          <textarea
            id={id}
            name={field.name}
            className={`modal-textarea${error ? ' modal-input--error' : ''}`}
            placeholder={field.placeholder}
            value={values[field.name] ?? ''}
            onChange={handleChange}
          />
        ) : field.type === 'select' ? (
          <select
            id={id}
            name={field.name}
            className={`modal-select${error ? ' modal-input--error' : ''}`}
            value={values[field.name] ?? ''}
            onChange={handleChange}
          >
            <option value="">— Chọn —</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            name={field.name}
            type={field.type ?? 'text'}
            className={inputClass}
            placeholder={field.placeholder}
            value={values[field.name] ?? ''}
            onChange={handleChange}
          />
        )}

        {error ? <p className="modal-field__error">{error}</p> : null}
      </div>
    );
  };

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <form className="modal-form" onSubmit={handleSubmit} noValidate>
        {visibleFields.map((field) =>
          field.half ? (
            <div className="modal-form__row" key={field.name}>
              {renderField(field)}
            </div>
          ) : (
            renderField(field)
          ),
        )}

        <div className="modal-actions">
          <button type="button" className="modal-btn modal-btn--ghost" onClick={onClose}>
            Hủy
          </button>
          <button type="submit" className="modal-btn modal-btn--primary">
            {submitLabel ?? (mode === 'create' ? 'Tạo mới' : 'Lưu thay đổi')}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default FormModal;
