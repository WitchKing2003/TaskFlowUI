import './TodayTask.css';

export type TaskStatus = 'Approved' | 'In review' | 'On going';

export interface TaskItem {
  id: number;
  title: string;
  status: TaskStatus;
  done?: boolean;
}

const TASKS: TaskItem[] = [
  { id: 1, title: 'Create a user flow of social application design', status: 'Approved', done: true },
  { id: 2, title: 'Create a user flow of social application design', status: 'In review' },
  { id: 3, title: 'Landing page design for Fintech project of singapore', status: 'In review' },
  { id: 4, title: 'Interactive prototype for app screens of detamine project', status: 'On going' },
  { id: 5, title: 'Interactive prototype for app screens of detamine project', status: 'Approved' },
];

const FILTERS = ['All', 'Important', 'Notes', 'Links'] as const;

function TodayTask() {
  return (
    <div className="dash-tasks">
      <div className="dash-tasks__filters" role="tablist">
        {FILTERS.map((filter, index) => (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={index === 0}
            className={`dash-tasks__filter${index === 0 ? ' is-active' : ''}`}
          >
            {filter}
            {index >= 2 ? <sup> {index * 5}</sup> : null}
          </button>
        ))}
      </div>

      <ul className="dash-tasks__list">
        {TASKS.map((task) => (
          <li key={task.id} className="dash-tasks__item">
            <span className={`dash-tasks__dot${task.done ? ' is-done' : ''}`} aria-hidden="true" />
            <span className={`dash-tasks__title${task.done ? ' is-done' : ''}`}>
              {task.title}
            </span>
            <span className={`dash-badge dash-badge--${task.status.toLowerCase().replace(' ', '-')}`}>
              {task.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodayTask;
