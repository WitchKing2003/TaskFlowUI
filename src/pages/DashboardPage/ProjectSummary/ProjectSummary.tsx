import './ProjectSummary.css';

export type ProjectStatus = 'Completed' | 'In progress' | 'Delayed' | 'On going';

export interface ProjectRow {
  id: number;
  name: string;
  manager: string;
  dueDate: string;
  status: ProjectStatus;
  progress: number;
}

const PROJECTS: ProjectRow[] = [
  { id: 1, name: 'Nexa web development', manager: 'Om prakash sao', dueDate: 'May 20, 2023', status: 'Completed', progress: 100 },
  { id: 2, name: 'Datascale AI app', manager: 'Neelam mardo', dueDate: 'Jun 20, 2023', status: 'In progress', progress: 45 },
  { id: 3, name: 'Media Channel branding', manager: 'Tiwulty priya', dueDate: 'July 13, 2023', status: 'In progress', progress: 62 },
  { id: 4, name: 'Cortex OS app development', manager: 'Matic hanory', dueDate: 'Dec 20, 2023', status: 'Completed', progress: 89 },
  { id: 5, name: 'Website builder development', manager: 'Sukumar rao', dueDate: 'Mar 15, 2024', status: 'On going', progress: 12 },
];

function ProgressRing({ value }: { value: number }) {
  const circumference = 2 * Math.PI * 9;
  const color = value >= 89 ? 'var(--dash-success)' : value >= 40 ? 'var(--dash-accent)' : 'var(--dash-blue)';

  return (
    <svg viewBox="0 0 24 24" className="dash-summary__ring" aria-label={`Tiến độ ${value}%`}>
      <circle className="dash-summary__ring-track" cx="12" cy="12" r="9" />
      <circle
        className="dash-summary__ring-value"
        cx="12"
        cy="12"
        r="9"
        style={{ stroke: color, strokeDasharray: circumference, strokeDashoffset: circumference * (1 - value / 100) }}
      />
      <text x="12" y="13.5" textAnchor="middle" className="dash-summary__ring-text">
        {value}
      </text>
    </svg>
  );
}

function ProjectSummary() {
  return (
    <table className="dash-summary__table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Project manager</th>
          <th>Due date</th>
          <th>Status</th>
          <th>Progress</th>
        </tr>
      </thead>
      <tbody>
        {PROJECTS.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{project.manager}</td>
            <td>{project.dueDate}</td>
            <td>
              <span className={`dash-badge dash-badge--${project.status.toLowerCase().replace(' ', '-')}`}>
                {project.status}
              </span>
            </td>
            <td>
              <ProgressRing value={project.progress} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProjectSummary;
