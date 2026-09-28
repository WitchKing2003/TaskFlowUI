import { useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import Modal from '../../../components/Modal/Modal';
import { COLUMNS, PRIORITY_CLASS, TAG_CLASS } from '../taskTypes';
import type { TaskCardData, TaskComment } from '../taskTypes';
import './TaskDetailModal.css';

interface TaskDetailModalProps {
  open: boolean;
  onClose: () => void;
  /** Task đang xem chi tiết; null khi đóng */
  task: TaskCardData | null;
  /** Comment theo taskId — giữ nguyên khi đóng/mở lại */
  comments: Record<number, TaskComment[]>;
  /** Thêm comment mới cho task */
  onAddComment: (taskId: number, text: string) => void;
}

function columnLabel(key: TaskCardData['column']): string {
  return COLUMNS.find((column) => column.key === key)?.label ?? key;
}

function TaskDetailModal({ open, onClose, task, comments, onAddComment }: TaskDetailModalProps) {
  const [draft, setDraft] = useState('');

  if (!task) return null;

  /** Task hoàn thành = chế độ chỉ đọc: không chỉnh sửa, không bình luận */
  const readOnly = task.column === 'completed';
  const taskComments = comments[task.id] ?? [];
  const donePercent = task.checklistTotal > 0
    ? Math.round((task.checklistDone / task.checklistTotal) * 100)
    : 0;

  const sendComment = () => {
    if (readOnly) return;
    const text = draft.trim();
    if (!text) return;
    onAddComment(task.id, text);
    setDraft('');
  };

  const submitComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendComment();
  };

  // Enter để gửi, Shift+Enter xuống dòng
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendComment();
    }
  };

  return (
    <Modal open={open} onClose={onClose} maxWidth={780} hideClose className="task-detail">
      {/* ================= Header bar: nhãn + nút Exit ================= */}
      <header className="task-detail__header">
        <div className="task-detail__header-left">
          <span className="task-detail__header-eyebrow">Chi tiết task</span>
          <span className="task-detail__header-id">#{task.id}</span>
        </div>

        <div className="task-detail__header-right">
          {readOnly ? (
            <span className="task-detail__ro-badge">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="5" y="11" width="14" height="9" rx="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" />
              </svg>
              Chỉ đọc
            </span>
          ) : null}

          <button
            type="button"
            className="modal__close task-detail__close"
            onClick={onClose}
            aria-label="Đóng"
            title="Đóng (Exit)"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      </header>

      <div className="task-detail__grid">
        {/* ================= Cột trái: thông tin task ================= */}
        <section className="task-detail__main">
          <div className="task-detail__tags">
            <span className={`task-card__tag ${TAG_CLASS[task.tag]}`}>{task.tag}</span>
            <span className="task-detail__status">{columnLabel(task.column)}</span>
          </div>

          <h3 className="task-detail__title">{task.title}</h3>

          {task.description ? (
            <p className="task-detail__desc">{task.description}</p>
          ) : null}

          <div className="task-detail__facts">
            <div className="task-detail__fact">
              <span className="task-detail__fact-label">Độ ưu tiên</span>
              <span className={`task-card__priority ${PRIORITY_CLASS[task.priority]}`}>
                <span aria-hidden="true">|</span> {task.priority}
              </span>
            </div>

            <div className="task-detail__fact">
              <span className="task-detail__fact-label">Checklist</span>
              <span className="task-detail__fact-value">
                {task.checklistDone}/{task.checklistTotal} · {donePercent}%
              </span>
              <div className="task-detail__bar">
                <span style={{ width: `${donePercent}%` }} />
              </div>
            </div>

            <div className="task-detail__fact">
              <span className="task-detail__fact-label">Trạng thái</span>
              <span className="task-detail__fact-value">{columnLabel(task.column)}</span>
            </div>
          </div>

          {/* ================= Khu comment ================= */}
          <div className="task-detail__comments">
            <h4 className="task-detail__comments-title">
              Bình luận
              <span className="task-detail__comments-count">{taskComments.length}</span>
            </h4>

            <ul className="task-detail__comment-list">
              {taskComments.length === 0 ? (
                <li className="task-detail__comment-empty">
                  {readOnly
                    ? 'Task đã hoàn thành — không thể thêm bình luận mới.'
                    : 'Chưa có bình luận nào — hãy bắt đầu cuộc trò chuyện.'}
                </li>
              ) : (
                taskComments.map((comment) => (
                  <li key={comment.id} className="task-detail__comment">
                    <span
                      className={`task-card__assignee task-card__assignee--${comment.avatarColor} task-detail__comment-avatar`}
                      aria-hidden="true"
                    >
                      {comment.author.trim().charAt(0).toUpperCase()}
                    </span>
                    <div className="task-detail__comment-body">
                      <div className="task-detail__comment-meta">
                        <span className="task-detail__comment-author">{comment.author}</span>
                        <span className="task-detail__comment-time">{comment.createdAt}</span>
                      </div>
                      <p className="task-detail__comment-text">{comment.text}</p>
                    </div>
                  </li>
                ))
              )}
            </ul>

            {readOnly ? (
              <p className="task-detail__ro-note">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="5" y="11" width="14" height="9" rx="2" />
                  <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                </svg>
                Task đã hoàn thành — chế độ chỉ đọc, không thể chỉnh sửa hay bình luận.
              </p>
            ) : (
              <form className="task-detail__composer" onSubmit={submitComment}>
                <textarea
                  className="task-detail__composer-input"
                  placeholder="Viết bình luận... (Enter để gửi, Shift+Enter xuống dòng)"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={2}
                />
                <button
                  type="submit"
                  className="task-detail__composer-send"
                  disabled={!draft.trim()}
                >
                  Gửi
                </button>
              </form>
            )}
          </div>
        </section>

        {/* ================= Cột phải: assignee + ngày ================= */}
        <aside className="task-detail__side">
          <div className="task-detail__side-block">
            <h4 className="task-detail__side-title">Được giao cho</h4>
            <div className="task-detail__assignee">
              <span
                className={`task-card__assignee task-card__assignee--${task.assigneeColor} task-detail__assignee-avatar`}
                aria-hidden="true"
              >
                {task.assignee}
              </span>
              <div>
                <p className="task-detail__assignee-name">{task.assigneeName}</p>
                <p className="task-detail__assignee-role">{task.assigneeRole}</p>
              </div>
            </div>
          </div>

          <div className="task-detail__side-block">
            <h4 className="task-detail__side-title">Thời gian</h4>
            <dl className="task-detail__dates">
              <div className="task-detail__date-row">
                <dt>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M3 10h18M8 3v4M16 3v4" />
                  </svg>
                  Hạn chót
                </dt>
                <dd>{task.dueLabel.replace(/^Due\s*/, '')}</dd>
              </div>
              <div className="task-detail__date-row">
                <dt>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                  Tạo lúc
                </dt>
                <dd>{task.createdLabel}</dd>
              </div>
            </dl>
          </div>

          <div className="task-detail__side-block">
            <h4 className="task-detail__side-title">Chi tiết</h4>
            <dl className="task-detail__dates">
              <div className="task-detail__date-row">
                <dt>Mã task</dt>
                <dd>#{task.id}</dd>
              </div>
              <div className="task-detail__date-row">
                <dt>Loại</dt>
                <dd>{task.tag}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </Modal>
  );
}

export default TaskDetailModal;
