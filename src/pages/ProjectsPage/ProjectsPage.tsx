import { useMemo, useState } from 'react';
import FormModal from '../../components/Modal/FormModal';
import type { FormModalField, FormModalValues } from '../../components/Modal/FormModal';
import ConfirmDeleteModal from '../../components/Modal/ConfirmDeleteModal';
import SuccessDialog from '../../components/Modal/SuccessDialog';
import './ProjectsPage.css';

export type ProjectCardStatus = 'Completed' | 'Ongoing' | 'At risk' | 'Delayed';

export interface ProjectCardData {
  id: number;
  name: string;
  manager: string;
  progress: number;
  dueDate: string;
  status: ProjectCardStatus;
  icon: string;
  iconAccent: 'purple' | 'blue' | 'orange' | 'green' | 'red' | 'yellow';
  members: string[];
  extraMembers: number;
}

type FilterKey = 'all' | 'ongoing' | 'completed' | 'delayed';

const INITIAL_PROJECTS: ProjectCardData[] = [
  { id: 1, name: 'Nelsa web development', manager: 'Om Prakash Sao', progress: 100, dueDate: 'May 25, 2023', status: 'Completed', icon: 'monitor', iconAccent: 'purple', members: ['OM', 'SL'], extraMembers: 3 },
  { id: 2, name: 'Datascale AI app', manager: 'Neilsan mando', progress: 64, dueDate: 'Jun 20, 2023', status: 'Ongoing', icon: 'chart', iconAccent: 'blue', members: ['N', 'K'], extraMembers: 0 },
  { id: 3, name: 'Media channel branding', manager: 'Tiruvely priya', progress: 42, dueDate: 'Jul 13, 2023', status: 'At risk', icon: 'clock', iconAccent: 'yellow', members: ['T', 'P'], extraMembers: 4 },
  { id: 4, name: 'Corlax iOS app development', manager: 'Matte hanory', progress: 100, dueDate: 'Dec 20, 2023', status: 'Completed', icon: 'home', iconAccent: 'green', members: ['M', 'K'], extraMembers: 0 },
  { id: 5, name: 'Website builder development', manager: 'Sukumar rao', progress: 28, dueDate: 'Mar 15, 2024', status: 'Delayed', icon: 'layout', iconAccent: 'red', members: ['S'], extraMembers: 2 },
  { id: 6, name: 'Fintech dashboard revamp', manager: 'Priya menon', progress: 55, dueDate: 'Apr 02, 2024', status: 'Ongoing', icon: 'monitor', iconAccent: 'blue', members: ['P', 'R'], extraMembers: 4 },
];

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All projects' },
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'completed', label: 'Completed' },
  { key: 'delayed', label: 'Delayed' },
];

const STATUS_CLASS: Record<ProjectCardStatus, string> = {
  Completed: 'dash-badge--completed',
  Ongoing: 'dash-badge--on-going',
  'At risk': 'dash-badge--at-risk',
  Delayed: 'dash-badge--delayed',
};

const PROJECT_FORM_FIELDS: FormModalField[] = [
  { name: 'name', label: 'Tên dự án', required: true, placeholder: 'VD: Mobile app redesign' },
  { name: 'manager', label: 'Project manager', required: true, placeholder: 'VD: Nguyễn Văn A' },
  {
    name: 'status',
    label: 'Trạng thái',
    type: 'select',
    required: true,
    options: [
      { value: 'Ongoing', label: 'Ongoing' },
      { value: 'Completed', label: 'Completed' },
      { value: 'At risk', label: 'At risk' },
      { value: 'Delayed', label: 'Delayed' },
    ],
  },
  { name: 'progress', label: 'Tiến độ (%)', type: 'number', required: true, placeholder: '0–100' },
  { name: 'dueDate', label: 'Hạn chót', type: 'date', required: true },
];

const ICON_ACCENTS = ['purple', 'blue', 'orange', 'green', 'red', 'yellow'] as const;
const ICONS = ['monitor', 'chart', 'clock', 'home', 'layout'];

const ICON_PATHS: Record<string, React.ReactNode> = {
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  chart: <path d="M4 19V5m0 14h16M8 15v-4m4 4V8m4 7v-6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  home: (
    <>
      <path d="m3 10 9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9Z" />
      <path d="M9 21v-7h6v7" />
    </>
  ),
  layout: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18M10 10v10" />
    </>
  ),
};

const AVATAR_COLORS = ['o', 'p', 'b', 'g', 'y', 'r'];

function formatDate(iso: string): string {
  if (!iso) return '';
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}

/** Đổi ngày hiển thị ("Mar 15, 2024") về ISO cho input[type=date] khi edit */
function toIsoDate(display: string): string {
  const date = new Date(display);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10);
}

function ProjectCard({
  project,
  onEdit,
  onDelete,
}: {
  project: ProjectCardData;
  onEdit: (project: ProjectCardData) => void;
  onDelete: (project: ProjectCardData) => void;
}) {
  return (
    <article className="project-card">
      <header className="project-card__head">
        <span className={`project-card__icon project-card__icon--${project.iconAccent}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            {ICON_PATHS[project.icon]}
          </svg>
        </span>
        <div className="project-card__head-actions">
          <span className={`dash-badge ${STATUS_CLASS[project.status]}`}>{project.status}</span>
          <button
            type="button"
            className="project-card__action"
            onClick={() => onEdit(project)}
            aria-label={`Sửa ${project.name}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z" />
            </svg>
          </button>
          <button
            type="button"
            className="project-card__action project-card__action--danger"
            onClick={() => onDelete(project)}
            aria-label={`Xóa ${project.name}`}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </header>

      <h3 className="project-card__name">{project.name}</h3>
      <p className="project-card__manager">Project manager: {project.manager}</p>

      <div className="project-card__progress">
        <div className="dash-progress">
          <div className="dash-progress__fill" style={{ width: `${project.progress}%` }} />
        </div>
        <span className="project-card__percent">{project.progress}%</span>
      </div>

      <footer className="project-card__foot">
        <div className="project-card__members">
          {project.members.map((initials, index) => (
            <span key={initials + index} className={`project-card__avatar project-card__avatar--${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}>
              {initials}
            </span>
          ))}
          {project.extraMembers > 0 ? (
            <span className="project-card__avatar project-card__avatar--more">
              +{project.extraMembers}
            </span>
          ) : null}
        </div>
        <span className="project-card__due">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M3 10h18M8 3v4M16 3v4" />
          </svg>
          {project.dueDate}
        </span>
      </footer>
    </article>
  );
}

function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectCardData[]>(INITIAL_PROJECTS);
  const [filter, setFilter] = useState<FilterKey>('all');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortDesc, setSortDesc] = useState(false);

  // Modal state
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ProjectCardData | null>(null);
  const [deleting, setDeleting] = useState<ProjectCardData | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const counts = useMemo(
    () =>
      projects.reduce<Record<FilterKey, number>>(
        (acc, project) => {
          acc.all += 1;
          if (project.status === 'Ongoing') acc.ongoing += 1;
          if (project.status === 'Completed') acc.completed += 1;
          if (project.status === 'Delayed' || project.status === 'At risk') acc.delayed += 1;
          return acc;
        },
        { all: 0, ongoing: 0, completed: 0, delayed: 0 },
      ),
    [projects],
  );

  const visible = useMemo(() => {
    const filtered = projects.filter((project) => {
      if (filter === 'all') return true;
      if (filter === 'ongoing') return project.status === 'Ongoing';
      if (filter === 'completed') return project.status === 'Completed';
      return project.status === 'Delayed' || project.status === 'At risk';
    });
    return [...filtered].sort((a, b) => (sortDesc ? b.progress - a.progress : a.progress - b.progress));
  }, [projects, filter, sortDesc]);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (project: ProjectCardData) => {
    setEditing(project);
    setFormOpen(true);
  };

  const handleSubmit = (values: FormModalValues) => {
    const progress = Math.max(0, Math.min(100, Number(values.progress) || 0));
    const dueDate = formatDate(values.dueDate);

    if (editing) {
      setProjects((current) =>
        current.map((project) =>
          project.id === editing.id
            ? { ...project, name: values.name, manager: values.manager, status: values.status as ProjectCardStatus, progress, dueDate }
            : project,
        ),
      );
      setSuccess(`Đã cập nhật dự án “${values.name}”.`);
    } else {
      const id = Date.now();
      setProjects((current) => [
        {
          id,
          name: values.name,
          manager: values.manager,
          status: values.status as ProjectCardStatus,
          progress,
          dueDate,
          icon: ICONS[id % ICONS.length],
          iconAccent: ICON_ACCENTS[id % ICON_ACCENTS.length],
          members: [values.manager.slice(0, 2).toUpperCase()],
          extraMembers: 0,
        },
        ...current,
      ]);
      setSuccess(`Đã tạo dự án “${values.name}”.`);
    }
    setFormOpen(false);
  };

  const handleDelete = () => {
    if (!deleting) return;
    setProjects((current) => current.filter((project) => project.id !== deleting.id));
    setSuccess(`Đã xóa dự án “${deleting.name}”.`);
  };

  return (
    <div className="projects-page">
      <div className="projects-toolbar">
        <div className="projects-toolbar__tabs" role="tablist">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              className={`projects-toolbar__tab${filter === key ? ' is-active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {label} · {counts[key]}
            </button>
          ))}
        </div>

        <div className="projects-toolbar__right">
          <select
            className="dash-select"
            value={sortDesc ? 'desc' : 'asc'}
            onChange={(event) => setSortDesc(event.target.value === 'desc')}
            aria-label="Sắp xếp"
          >
            <option value="asc">Sort by: Progress ↑</option>
            <option value="desc">Sort by: Progress ↓</option>
          </select>

          <div className="projects-toolbar__view" role="group" aria-label="Kiểu hiển thị">
            <button
              type="button"
              className={view === 'grid' ? 'is-active' : ''}
              onClick={() => setView('grid')}
              aria-label="Xem dạng lưới"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </button>
            <button
              type="button"
              className={view === 'list' ? 'is-active' : ''}
              onClick={() => setView('list')}
              aria-label="Xem dạng danh sách"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <button type="button" className="tasks-toolbar__add" onClick={openCreate}>
            + New project
          </button>
        </div>
      </div>

      <div className={`projects-grid${view === 'list' ? ' projects-grid--list' : ''}`}>
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} onEdit={openEdit} onDelete={setDeleting} />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="projects-empty">Không có dự án nào trong nhóm này.</p>
      ) : null}

      <FormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        mode={editing ? 'update' : 'create'}
        title={editing ? 'Cập nhật dự án' : 'Tạo dự án mới'}
        fields={PROJECT_FORM_FIELDS}
        initialValues={
          editing
            ? {
                name: editing.name,
                manager: editing.manager,
                status: editing.status,
                progress: String(editing.progress),
                dueDate: toIsoDate(editing.dueDate),
              }
            : undefined
        }
        onSubmit={handleSubmit}
      />

      <ConfirmDeleteModal
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        itemName={deleting?.name}
        description="Bạn có chắc muốn xóa dự án"
      />

      <SuccessDialog
        open={Boolean(success)}
        onClose={() => setSuccess(null)}
        description={success ?? undefined}
      />
    </div>
  );
}

export default ProjectsPage;
