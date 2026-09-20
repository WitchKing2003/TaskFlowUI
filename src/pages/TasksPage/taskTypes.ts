// Types + hằng số dùng chung giữa TasksPage và TaskDetailModal,
// tách ra file riêng để tránh circular import.

export type TaskColumn = 'todo' | 'inprogress' | 'inreview' | 'completed';
export type TaskPriority = 'High' | 'Medium' | 'Low';
export type TaskTag = 'Design' | 'Development' | 'Marketing' | 'Research';
export type TaskAvatarColor = 'orange' | 'purple' | 'yellow' | 'green';

export interface TaskCardData {
  id: number;
  title: string;
  description: string;
  tag: TaskTag;
  priority: TaskPriority;
  checklistDone: number;
  checklistTotal: number;
  dueLabel: string;
  createdLabel: string;
  assignee: string;
  assigneeName: string;
  assigneeRole: string;
  assigneeColor: TaskAvatarColor;
  column: TaskColumn;
}

export interface TaskComment {
  id: number;
  author: string;
  avatarColor: TaskAvatarColor;
  text: string;
  createdAt: string;
}

export const COLUMNS: { key: TaskColumn; label: string; dot: string }[] = [
  { key: 'todo', label: 'To do', dot: 'var(--dash-text-muted)' },
  { key: 'inprogress', label: 'In progress', dot: 'var(--dash-blue)' },
  { key: 'inreview', label: 'In review', dot: 'var(--dash-warning)' },
  { key: 'completed', label: 'Completed', dot: 'var(--dash-success)' },
];

export const PRIORITY_CLASS: Record<TaskPriority, string> = {
  High: 'is-high',
  Medium: 'is-medium',
  Low: 'is-low',
};

export const TAG_CLASS: Record<TaskTag, string> = {
  Design: 'is-design',
  Development: 'is-development',
  Marketing: 'is-marketing',
  Research: 'is-research',
};

export const ASSIGNEE_COLORS: TaskAvatarColor[] = ['orange', 'purple', 'yellow', 'green'];
