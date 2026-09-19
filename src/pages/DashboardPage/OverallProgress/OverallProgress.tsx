import './OverallProgress.css';

export interface ProgressStat {
  label: string;
  value: number;
  color: string;
}

const STATS: ProgressStat[] = [
  { label: 'Total projects', value: 95, color: 'var(--dash-text)' },
  { label: 'Completed', value: 26, color: 'var(--dash-success)' },
  { label: 'Delayed', value: 35, color: 'var(--dash-warning)' },
  { label: 'On going', value: 35, color: 'var(--dash-blue)' },
];

function OverallProgress() {
  const percent = 72;
  const circumference = Math.PI * 80;

  return (
    <div className="dash-gauge">
      <div className="dash-gauge__wrap">
        <svg viewBox="0 0 100 56" className="dash-gauge__svg" aria-hidden="true">
          <path
            className="dash-gauge__track"
            d="M 10 50 A 40 40 0 0 1 90 50"
          />
          <path
            className="dash-gauge__value"
            d="M 10 50 A 40 40 0 0 1 90 50"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - percent / 100)}
          />
        </svg>
        <div className="dash-gauge__center">
          <span className="dash-gauge__percent">{percent}%</span>
          <span className="dash-gauge__label">Completed</span>
        </div>
      </div>

      <div className="dash-gauge__stats">
        {STATS.map((stat) => (
          <div key={stat.label} className="dash-gauge__stat">
            <span className="dash-gauge__stat-value" style={{ color: stat.color }}>
              {stat.value}
            </span>
            <span className="dash-gauge__stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OverallProgress;
