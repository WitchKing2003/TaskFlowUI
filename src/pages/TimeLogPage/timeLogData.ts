export interface TimeEntry {
  id: number;
  date: string; // ISO yyyy-mm-dd
  project: string;
  task: string;
  /** Giờ làm việc, VD 2.5 = 2h30 */
  hours: number;
  billable: boolean;
  note?: string;
}

export const WEEK_DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'] as const;

export const TIME_ENTRIES: TimeEntry[] = [
  { id: 1, date: '2026-09-21', project: 'Nelsa web dev', task: 'Thiết kế lại trang pricing', hours: 3.5, billable: true, note: 'Bám brand guideline mới' },
  { id: 2, date: '2026-09-21', project: 'Tasks app', task: 'Fix bug kéo thả kanban', hours: 2, billable: true },
  { id: 3, date: '2026-09-22', project: 'Aurora mobile app', task: 'Onboarding flow', hours: 4, billable: false, note: 'Chờ review design' },
  { id: 4, date: '2026-09-22', project: 'Nelsa web dev', task: 'Tối ưu Lighthouse', hours: 1.5, billable: true },
  { id: 5, date: '2026-09-23', project: 'Tasks app', task: 'Viết test cho modal', hours: 2.5, billable: true },
  { id: 6, date: '2026-09-23', project: 'Aurora mobile app', task: 'Setup CI pipeline', hours: 1, billable: false },
  { id: 7, date: '2026-09-24', project: 'Nelsa web dev', task: 'Họp weekly với client', hours: 1, billable: true },
];

export const WEEKLY_HOURS = [
  { day: 'T2', hours: 5.5 },
  { day: 'T3', hours: 6 },
  { day: 'T4', hours: 4.5 },
  { day: 'T5', hours: 3 },
  { day: 'T6', hours: 7 },
  { day: 'T7', hours: 0 },
  { day: 'CN', hours: 0 },
];

export const WEEK_TARGET = 40;

export const RUNNING_TIMER = {
  project: 'Nelsa web dev',
  task: 'Thiết kế lại trang pricing',
  /** Giây đã chạy từ đầu phiên */
  elapsedSeconds: 5123,
};

export function formatHours(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function formatClock(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((unit) => String(unit).padStart(2, '0')).join(':');
}

export function dayLabel(iso: string): string {
  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year.slice(2)}`;
}
