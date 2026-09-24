import { WEEK_TARGET, TIME_ENTRIES, WEEKLY_HOURS, formatHours } from '../timeLogData';
import './TimeSummary.css';

function TimeSummary() {
  const weekHours = WEEKLY_HOURS.reduce((sum, day) => sum + day.hours, 0);
  const billable = TIME_ENTRIES.filter((entry) => entry.billable).reduce((sum, entry) => sum + entry.hours, 0);
  const remaining = Math.max(0, WEEK_TARGET - weekHours);
  const loggedDays = new Set(TIME_ENTRIES.map((entry) => entry.date)).size;

  const stats = [
    { label: 'Tuần này', value: formatHours(weekHours), sub: `Mục tiêu ${WEEK_TARGET}h`, accent: false },
    { label: 'Billable', value: formatHours(billable), sub: `${Math.round((billable / Math.max(weekHours, 1)) * 100)}% tổng giờ`, accent: true },
    { label: 'Còn lại', value: formatHours(remaining), sub: 'để đạt mục tiêu', accent: false },
    { label: 'Ngày đã log', value: String(loggedDays), sub: 'trong tuần này', accent: false },
  ];

  return (
    <div className="time-summary">
      {stats.map((stat) => (
        <article key={stat.label} className={`time-summary__card${stat.accent ? ' is-accent' : ''}`}>
          <p className="time-summary__label">{stat.label}</p>
          <p className="time-summary__value">{stat.value}</p>
          <p className="time-summary__sub">{stat.sub}</p>
        </article>
      ))}
    </div>
  );
}

export default TimeSummary;
