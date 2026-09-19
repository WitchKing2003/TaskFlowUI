import { useMemo, useState } from 'react';
import FormModal from '../../components/Modal/FormModal';
import type { FormModalField, FormModalValues } from '../../components/Modal/FormModal';
import ConfirmDeleteModal from '../../components/Modal/ConfirmDeleteModal';
import SuccessDialog from '../../components/Modal/SuccessDialog';
import './TasksPage.css';

export type TaskColumn = 'todo' | 'inprogress' | 'inreview' | 'completed';
export type TaskPriority = 'High' | 'Medium' | 'Low';
export type TaskTag = 'Design' | 'Development' | 'Marketing' | 'Research';

export interface TaskCardData {
  id: number;
  title: string;
  tag: TaskTag;
  priority: TaskPriority;
  checklistDone: number;
  checklistTotal: number;
  dueLabel: string;
  assignee: string;
  assigneeColor: 'orange' | 'purple' | 'yellow' | 'green';
  column: TaskColumn;
}

const COLUMNS: { key: TaskColumn; label: string; dot: string }[] = [
  { key: 'todo', label: 'To do', dot: 'var(--dash-text-muted)' },
  { key: 'inprogress', label: 'In progress', dot: 'var(--dash-blue)' },
  { key: 'inreview', label: 'In review', dot: 'var(--dash-warning)' },
  { key: 'completed', label: 'Completed', dot: 'var(--dash-success)' },
];

const INITIAL_TASKS: TaskCardData[] = [
  { id: 1, title: 'Create a user flow of social application design', tag: 'Design', priority: 'High', checklistDone: 0, checklistTotal: 4, dueLabel: 'Due May 28', assignee: 'O', assigneeColor: 'orange', column: 'todo' },
  { id: 2, title: 'Landing page design for Fintech project of Singapore', tag: 'Marketing', priority: 'Medium', checklistDone: 1, checklistTotal: 3, dueLabel: 'Due Jun 02', assignee: 'P', assigneeColor: 'yellow', column: 'todo' },
  { id: 3, title: 'Interactive prototype for app screens of dattamine project', tag: 'Development', priority: 'High', checklistDone: 3, checklistTotal: 5, dueLabel: 'Due Jun 08', assignee: 'N', assigneeColor: 'purple', column: 'inprogress' },
  { id: 4, title: 'Competitor analysis for resource management module', tag: 'Research', priority: 'Low', checklistDone: 2, checklistTotal: 2, dueLabel: 'Due Jun 10', assignee: 'K', assigneeColor: 'green', column: 'inprogress' },
  { id: 5, title: 'Create a user flow of social application design — v2', tag: 'Design', priority: 'Medium', checklistDone: 4, checklistTotal: 4, dueLabel: 'Due Jun 03', assignee: 'O', assigneeColor: 'orange', column: 'inreview' },
  { id: 6, title: 'Interactive prototype for app screens of dattamine project', tag: 'Development', priority: 'Low', checklistDone: 5, checklistTotal: 5, dueLabel: 'Done May 30', assignee: 'O', assigneeColor: 'orange', column: 'completed' },
  { id: 7, title: 'Landing page design for Fintech project of Singapore — final', tag: 'Marketing', priority: 'Low', checklistDone: 3, checklistTotal: 3, dueLabel: 'Done Jun 01', assignee: 'P', assigneeColor: 'yellow', column: 'completed' },
];

const PROJECT_FILTERS = ['All tasks', 'Nelsa web dev', 'Datascale AI app', 'Fintech Singapore'] as const;

const PRIORITY_CLASS: Record<TaskPriority, string> = {
  High: 'is-high',
  Medium: 'is-medium',
  Low: 'is-low',
};

const TAG_CLASS: Record<TaskTag, string> = {
  Design: 'is-design',
  Development: 'is-development',
  Marketing: 'is-marketing',
  Research: 'is-research',
};

const TASK_FORM_FIELDS: FormModalField[] = [
  { name: 'title', label: 'Tên task', type: 'textarea', required: true, placeholder: 'Mô tả ngắn công việc...' },
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
  { name: 'assignee', label: 'Assignee (1 chữ cái)', required: true, placeholder: 'VD: O' },
];

const ASSIGNEE_COLORS = ['orange', 'purple', 'yellow', 'green'] as const;

function TaskCard({
  task,
  onDelete,
}: {
  task: TaskCardData;
  onDelete: (task: TaskCardData) => void;
}) {
  return (
    <article className="task-card">
      <div className="task-card__top">
        <span className={`task-card__tag ${TAG_CLASS[task.tag]}`}>{task.tag}</span>
        <button
          type="button"
          className="task-card__delete"
          onClick={() => onDelete(task)}
          aria-label={`Xóa task`}
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
        <span className={`task-card__assignee task-card__assignee--${task.assigneeColor}`}>
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
  const [projectFilter, setProjectFilter] = useState<string>('All tasks');

  // Modal state
  const [formOpen, setFormOpen] = useState(false);
  const [formColumn, setFormColumn] = useState<TaskColumn>('todo');
  const [deleting, setDeleting] = useState<TaskCardData | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      projectFilter === 'All tasks'
        ? tasks
        : tasks.filter((_, index) => index % 2 === 0),
    [tasks, projectFilter],
  );

  const openCreate = (column: TaskColumn = 'todo') => {
    setFormColumn(column);
    setFormOpen(true);
  };

  const handleCreate = (values: FormModalValues) => {
    const id = Date.now();
    setTasks((current) => [
      {
        id,
        title: values.title,
        tag: values.tag as TaskTag,
        priority: values.priority as TaskPriority,
        checklistDone: 0,
        checklistTotal: 3,
        dueLabel: 'Due —',
        assignee: (values.assignee || '?').slice(0, 1).toUpperCase(),
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
                  <TaskCard key={task.id} task={task} onDelete={setDeleting} />
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
        itemName={deleting ? `#${deleting.id}` : undefined}
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
