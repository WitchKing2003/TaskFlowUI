import { WEEKLY_HOURS, WEEK_TARGET, formatHours } from '../timeLogData';
import './WeeklyChart.css';

function WeeklyChart() {
  const max = Math.max(WEEK_TARGET / 5, ...WEEKLY_HOURS.map((day) => day.hours));

  return (
    <div className="weekly-chart">
      <div className="weekly-chart__grid">
        {[0, 1, 2, 3].map((line) => (
          <div key={line} className="weekly-chart__gridline" style={{ top: `${line * 25}%` }}>
            <span>{Math.round(max - (max / 3) * line)}h</span>
          </div>
        ))}

        <div className="weekly-chart__bars">
          {WEEKLY_HOURS.map((day, index) => {
            const height = (day.hours / max) * 100;
            const isToday = index === 4;
            return (
              <div key={day.day} className="weekly-chart__slot">
                <div className="weekly-chart__bar-area">
                  {day.hours > 0 ? (
                    <div
                      className={`weekly-chart__bar${isToday ? ' is-today' : ''}`}
                      style={{ height: `${height}%` }}
                      title={`${day.day}: ${formatHours(day.hours)}`}
                    />
                  ) : null}
                </div>
                <span className={`weekly-chart__day${isToday ? ' is-today' : ''}`}>{day.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="weekly-chart__target">
        <span className="weekly-chart__target-line" style={{ bottom: `${(6 / max) * 100}%` }} />
        <span className="weekly-chart__target-label">Mục tiêu ngày ~6h</span>
      </div>
    </div>
  );
}

export default WeeklyChart;
