import { useMemo, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import FormModal from '../../components/Modal/FormModal';
import type { FormModalField, FormModalValues } from '../../components/Modal/FormModal';
import ConfirmDeleteModal from '../../components/Modal/ConfirmDeleteModal';
import SuccessDialog from '../../components/Modal/SuccessDialog';
import TaskDetailModal from './TaskDetailModal/TaskDetailModal';
import { ASSIGNEE_COLORS, COLUMNS, PRIORITY_CLASS, TAG_CLASS } from './taskTypes';
import type { TaskCardData, TaskColumn, TaskComment, TaskPriority, TaskTag } from './taskTypes';
import './TasksPage.css';

const INITIAL_TASKS: TaskCardData[] = [
  {
    id: 1,
    title: 'Create a user flow of social application design',
    description: 'Thiết kế user flow cho ứng dụng mạng xã hội: onboarding, feed, profile và messaging. Đếndeck để review buổi sprint kế tiếp.',
    tag: 'Design',
    priority: 'High',
    checklistDone: 0,
    checklistTotal: 4,
    dueLabel: 'Due May 28',
    createdLabel: 'May 20, 2024',
    assignee: 'O',
    assigneeName: 'Om Prakash Sao',
    assigneeRole: 'Project manager',
    assigneeColor: 'orange',
    column: 'todo',
  },
  {
    id: 2,
    title: 'Landing page design for Fintech project of Singapore',
    description: 'Landing page cho thị trường Singapore: hero, social proof, pricing table. Bám sát brand guideline màu cam — đen.',
    tag: 'Marketing',
    priority: 'Medium',
    checklistDone: 1,
    checklistTotal: 3,
    dueLabel: 'Due Jun 02',
    createdLabel: 'May 22, 2024',
    assignee: 'P',
    assigneeName: 'Priya menon',
    assigneeRole: 'Product manager',
    assigneeColor: 'yellow',
    column: 'todo',
  },
  {
    id: 3,
    title: 'Interactive prototype for app screens of dattamine project',
    description: 'Prototype tương tác 12 màn hình chính bằng Figma, sẵn sàng cho buổi usability testing tuần sau.',
    tag: 'Development',
    priority: 'High',
    checklistDone: 3,
    checklistTotal: 5,
    dueLabel: 'Due Jun 08',
    createdLabel: 'May 21, 2024',
    assignee: 'N',
    assigneeName: 'Neilsan mando',
    assigneeRole: 'Frontend developer',
    assigneeColor: 'purple',
    column: 'inprogress',
  },
  {
    id: 4,
    title: 'Competitor analysis for resource management module',
    description: 'Phân tích 5 đối thủ trực tiếp về tính năng resource management, tổng hợp bảng so sánh và đề xuất.',
    tag: 'Research',
    priority: 'Low',
    checklistDone: 2,
    checklistTotal: 2,
    dueLabel: 'Due Jun 10',
    createdLabel: 'May 19, 2024',
    assignee: 'K',
    assigneeName: 'Katty Nguyen',
    assigneeRole: 'QA engineer',
    assigneeColor: 'green',
    column: 'inprogress',
  },
  {
    id: 5,
    title: 'Create a user flow of social application design — v2',
    description: 'Bản v2 sau feedback vòng 1: tối giản luồng đăng ký, thêm trạng thái empty state.',
    tag: 'Design',
    priority: 'Medium',
    checklistDone: 4,
    checklistTotal: 4,
    dueLabel: 'Due Jun 03',
    createdLabel: 'May 24, 2024',
    assignee: 'O',
    assigneeName: 'Om Prakash Sao',
    assigneeRole: 'Project manager',
    assigneeColor: 'orange',
    column: 'inreview',
  },
  {
    id: 6,
    title: 'Interactive prototype for app screens of dattamine project',
    description: 'Đã bàn giao bản prototype cuối cho team dev, kèm annotation chi tiết.',
    tag: 'Development',
    priority: 'Low',
    checklistDone: 5,
    checklistTotal: 5,
    dueLabel: 'Done May 30',
    createdLabel: 'May 12, 2024',
    assignee: 'O',
    assigneeName: 'Om Prakash Sao',
    assigneeRole: 'Project manager',
    assigneeColor: 'orange',
    column: 'completed',
  },
  {
    id: 7,
    title: 'Landing page design for Fintech project of Singapore — final',
    description: 'Bản final đã handoff, asset export đầy đủ trên Drive.',
    tag: 'Marketing',
    priority: 'Low',
    checklistDone: 3,
    checklistTotal: 3,
    dueLabel: 'Done Jun 01',
    createdLabel: 'May 14, 2024',
    assignee: 'P',
    assigneeName: 'Priya menon',
    assigneeRole: 'Product manager',
    assigneeColor: 'yellow',
    column: 'completed',
  },
];

const SEED_COMMENTS: Record<number, TaskComment[]> = {
  1: [
    { id: 1, author: 'Om Prakash Sao', avatarColor: 'orange', text: 'Mình đã update flow ở Figma, mọi người review giúp phần onboarding nhé.', createdAt: 'May 25, 2024 · 09:41' },
    { id: 2, author: 'Priya menon', avatarColor: 'yellow', text: 'Ok, mình sẽ check buổi chiều. Flow đăng ký nên rút còn 2 bước.', createdAt: 'May 25, 2024 · 13:05' },
  ],
  3: [
    { id: 1, author: 'Neilsan mando', avatarColor: 'purple', text: 'Đã xong 3/5 màn hình, phần settings cần thêm asset icon từ team design.', createdAt: 'May 26, 2024 · 15:22' },
  ],
};

const PROJECT_FILTERS = ['All tasks', 'Nelsa web dev', 'Datascale AI app', 'Fintech Singapore'] as const;

const TASK_FORM_FIELDS: FormModalField[] = [
  { name: 'title', label: 'Tên task', type: 'textarea', required: true, placeholder: 'Mô tả ngắn công việc...' },
  { name: 'description', label: 'Mô tả chi tiết', type: 'textarea', placeholder: 'Bối cảnh, yêu cầu, link tài liệu...' },
  {
    name: 'column',
    label: 'Trạng thái',
    type: 'select',
    required: true,
    options: [
      { value: 'todo', label: 'To do' },
      { value: 'inprogress', label: 'In progress' },
      { value: 'inreview', label: 'In review' },
      { value: 'completed', label: 'Completed' },
    ],
  },
  {
    name: 'tag',
    label: 'Loại',
    type: 'select',
    required: true,
    options: [
      { value: 'Design', label: 'Design' },
      { value: 'Development', label: 'Development' },
      { value: 'Marketing', label: 'Marketing' },
      { value: 'Research', label: 'Research' },
    ],
  },
  {
    name: 'priority',
    label: 'Độ ưu tiên',
    type: 'select',
    required: true,
    options: [
      { value: 'High', label: 'High' },
      { value: 'Medium', label: 'Medium' },
      { value: 'Low', label: 'Low' },
    ],
  },
  { name: 'assignee', label: 'Người thực hiện', required: true, placeholder: 'VD: Om Prakash Sao' },
];

function formatToday(): string {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function TaskCard({
  task,
  onOpen,
  onDelete,
}: {
  task: TaskCardData;
  onOpen: (task: TaskCardData) => void;
  onDelete: (task: TaskCardData) => void;
}) {
  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen(task);
    }
  };

  return (
    <article
      className="task-card is-clickable"
      role="button"
      tabIndex={0}
      aria-label={`Xem chi tiết: ${task.title}`}
      onClick={() => onOpen(task)}
      onKeyDown={handleKeyDown}
    >
      <div className="task-card__top">
        <span className={`task-card__tag ${TAG_CLASS[task.tag]}`}>{task.tag}</span>
        <button
          type="button"
          className="task-card__delete"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(task);
          }}
          aria-label="Xóa task"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <h4 className="task-card__title">{task.title}</h4>

      <p className={`task-card__priority ${PRIORITY_CLASS[task.priority]}`}>
        <span aria-hidden="true">|</span> {task.priority}
      </p>

      <div className="task-card__meta">
        <span className="task-card__checklist">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="4" />
            <path d="m8 12 3 3 5-6" />
          </svg>
          {task.checklistDone}/{task.checklistTotal}
        </span>
        <span
          className={`task-card__assignee task-card__assignee--${task.assigneeColor}`}
          title={task.assigneeName}
        >
          {task.assignee}
        </span>
      </div>

      <p className="task-card__due">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
        {task.dueLabel}
      </p>
    </article>
  );
}

function TasksPage() {
  const [tasks, setTasks] = useState<TaskCardData[]>(INITIAL_TASKS);
  const [comments, setComments] = useState<Record<number, TaskComment[]>>(SEED_COMMENTS);
  const [projectFilter, setProjectFilter] = useState<string>('All tasks');

  // Modal state
  const [formOpen, setFormOpen] = useState(false);
  const [formColumn, setFormColumn] = useState<TaskColumn>('todo');
  const [deleting, setDeleting] = useState<TaskCardData | null>(null);
  const [detailTaskId, setDetailTaskId] = useState<number | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      projectFilter === 'All tasks'
        ? tasks
        : tasks.filter((_, index) => index % 2 === 0),
    [tasks, projectFilter],
  );

  // Task trong modal luôn lấy từ state hiện tại để cập nhật live
  const detailTask = useMemo(
    () => (detailTaskId == null ? null : tasks.find((task) => task.id === detailTaskId) ?? null),
    [tasks, detailTaskId],
  );

  const openCreate = (column: TaskColumn = 'todo') => {
    setFormColumn(column);
    setFormOpen(true);
  };

  const handleCreate = (values: FormModalValues) => {
    const id = Date.now();
    const assigneeName = (values.assignee || '?').trim();
    setTasks((current) => [
      {
        id,
        title: values.title,
        description: values.description?.trim() || 'Chưa có mô tả cho task này.',
        tag: values.tag as TaskTag,
        priority: values.priority as TaskPriority,
        checklistDone: 0,
        checklistTotal: 3,
        dueLabel: 'Due —',
        createdLabel: formatToday(),
        assignee: assigneeName.slice(0, 1).toUpperCase(),
        assigneeName,
        assigneeRole: 'Team member',
        assigneeColor: ASSIGNEE_COLORS[id % ASSIGNEE_COLORS.length],
        column: values.column as TaskColumn,
      },
      ...current,
    ]);
    setSuccess(`Đã tạo task mới trong cột “${COLUMNS.find((c) => c.key === values.column)?.label}”.`);
    setFormOpen(false);
  };

  const handleDelete = () => {
    if (!deleting) return;
    setTasks((current) => current.filter((task) => task.id !== deleting.id));
    setSuccess('Đã xóa task.');
  };

  const handleAddComment = (taskId: number, text: string) => {
    setComments((current) => ({
      ...current,
      [taskId]: [
        { id: Date.now(), author: 'Bạn', avatarColor: 'orange', text, createdAt: 'Vừa xong' },
        ...(current[taskId] ?? []),
      ],
    }));
  };

  return (
    <div className="tasks-page">
      <div className="tasks-toolbar">
        <div className="tasks-toolbar__tabs" role="tablist">
          {PROJECT_FILTERS.map((label) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={projectFilter === label}
              className={`tasks-toolbar__tab${projectFilter === label ? ' is-active' : ''}`}
              onClick={() => setProjectFilter(label)}
            >
              {label}
              {label === 'All tasks' ? ` · ${tasks.length}` : ''}
            </button>
          ))}
        </div>

        <div className="tasks-toolbar__right">
          <select className="dash-select" defaultValue="all" aria-label="Người thực hiện">
            <option value="all">Assignee: All</option>
            <option value="o">Assignee: Om</option>
            <option value="n">Assignee: Neilsan</option>
          </select>
          <button type="button" className="tasks-toolbar__add" onClick={() => openCreate()}>
            + Add task
          </button>
        </div>
      </div>

      <div className="tasks-board">
        {COLUMNS.map((column) => {
          const items = visible.filter((task) => task.column === column.key);
          return (
            <section key={column.key} className="tasks-column">
              <header className="tasks-column__head">
                <span className="tasks-column__title">
                  <span className="tasks-column__dot" style={{ background: column.dot }} />
                  {column.label}
                </span>
                <span className="tasks-column__count">{items.length}</span>
              </header>

              <div className="tasks-column__body">
                {items.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onOpen={(opened) => setDetailTaskId(opened.id)}
                    onDelete={setDeleting}
                  />
                ))}

                <button
                  type="button"
                  className="tasks-column__add"
                  onClick={() => openCreate(column.key)}
                >
                  + Add task
                </button>
              </div>
            </section>
          );
        })}
      </div>

      <TaskDetailModal
        open={detailTask != null}
        onClose={() => setDetailTaskId(null)}
        task={detailTask}
        comments={comments}
        onAddComment={handleAddComment}
      />

      <FormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        mode="create"
        title="Tạo task mới"
        fields={TASK_FORM_FIELDS}
        initialValues={{ column: formColumn }}
        onSubmit={handleCreate}
        submitLabel="Tạo task"
      />

      <ConfirmDeleteModal
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        itemName={deleting?.title}
        description="Bạn có chắc muốn xóa task này không?"
      />

      <SuccessDialog
        open={Boolean(success)}
        onClose={() => setSuccess(null)}
        description={success ?? undefined}
      />
    </div>
  );
}

export default TasksPage;
