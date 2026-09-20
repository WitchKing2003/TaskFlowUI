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

  const taskComments = comments[task.id] ?? [];
  const donePercent = task.checklistTotal > 0
    ? Math.round((task.checklistDone / task.checklistTotal) * 100)
    : 0;

  const sendComment = () => {
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
    <Modal open={open} onClose={onClose} maxWidth={780} className="task-detail">
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
                  Chưa có bình luận nào — hãy bắt đầu cuộc trò chuyện.
                </li>
              ) : (
                taskComments.map((comment) => (
                  <li key={comment.id} className="task-detail__comment">
                    <span
                      className={`task-card__assignee task-card__assignee--${comment.avatarColor}`}
                      aria-hidden="true"
                    >
                      {comment.author}
                    </span>
                    <div className="task-detail__comment-body">
                      <p className="task-detail__comment-text">{comment.text}</p>
                      <span className="task-detail__comment-time">{comment.createdAt}</span>
                    </div>
                  </li>
                ))
              )}
            </ul>

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
