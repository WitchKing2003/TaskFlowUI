export interface ResourceMember {
  id: number;
  name: string;
  role: string;
  /** Giờ đã book trong tuần */
  booked: number;
  /** Công suất chuẩn tuần */
  capacity: number;
  projects: string[];
  avatarColor: string;
}

export const TEAM: ResourceMember[] = [
  { id: 1, name: 'Alex Moian', role: 'Project manager', booked: 34, capacity: 40, projects: ['Nelsa web dev', 'Tasks app'], avatarColor: '#e5622c' },
  { id: 2, name: 'Sokhem Sun', role: 'UI/UX designer', booked: 38, capacity: 40, projects: ['Aurora mobile app'], avatarColor: '#8b5cf6' },
  { id: 3, name: 'Priya Menon', role: 'Frontend developer', booked: 41, capacity: 40, projects: ['Nelsa web dev', 'Tasks app', 'Aurora mobile app'], avatarColor: '#4d8fdd' },
  { id: 4, name: 'David Chen', role: 'Backend developer', booked: 22, capacity: 40, projects: ['Tasks app'], avatarColor: '#4f9b63' },
  { id: 5, name: 'Linh Tran', role: 'QA engineer', booked: 30, capacity: 40, projects: ['Aurora mobile app', 'Tasks app'], avatarColor: '#d9a92e' },
  { id: 6, name: 'Mai Pham', role: 'Marketing', booked: 12, capacity: 40, projects: ['Nelsa web dev'], avatarColor: '#d86f69' },
];

export interface Allocation {
  member: string;
  /** Giờ phân bổ cho từng dự án trong tuần */
  hours: Record<string, number>;
}

export const PROJECTS: string[] = ['Nelsa web dev', 'Tasks app', 'Aurora mobile app'];

export const ALLOCATIONS: Allocation[] = [
  { member: 'Alex Moian', hours: { 'Nelsa web dev': 14, 'Tasks app': 12, 'Aurora mobile app': 8 } },
  { member: 'Sokhem Sun', hours: { 'Nelsa web dev': 0, 'Tasks app': 4, 'Aurora mobile app': 34 } },
  { member: 'Priya Menon', hours: { 'Nelsa web dev': 18, 'Tasks app': 11, 'Aurora mobile app': 12 } },
  { member: 'David Chen', hours: { 'Nelsa web dev': 0, 'Tasks app': 22, 'Aurora mobile app': 0 } },
  { member: 'Linh Tran', hours: { 'Nelsa web dev': 0, 'Tasks app': 14, 'Aurora mobile app': 16 } },
  { member: 'Mai Pham', hours: { 'Nelsa web dev': 12, 'Tasks app': 0, 'Aurora mobile app': 0 } },
];

export const UTILIZATION_NOTES = {
  over: 'Trên công suất — cần giảm tải',
  optimal: 'Đang tối ưu',
  under: 'Còn dư năng lực — có thể nhận thêm',
};

export function utilizationStatus(booked: number, capacity: number): 'over' | 'optimal' | 'under' {
  const ratio = booked / capacity;
  if (ratio > 1) return 'over';
  if (ratio >= 0.75) return 'optimal';
  return 'under';
}
