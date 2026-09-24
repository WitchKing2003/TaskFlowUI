import { useState } from 'react';
import type { TimeEntry } from '../timeLogData';
import { dayLabel, formatHours } from '../timeLogData';
import './TimeEntryTable.css';

interface TimeEntryTableProps {
  entries: TimeEntry[];
  onDelete: (id: number) => void;
  onToggleBillable: (id: number) => void;
}

function TimeEntryTable({ entries, onDelete, onToggleBillable }: TimeEntryTableProps) {
  const [filter, setFilter] = useState<'all' | 'billable'>('all');

  const visible = entries.filter((entry) => (filter === 'all' ? true : entry.billable));
  const total = visible.reduce((sum, entry) => sum + entry.hours, 0);

  return (
    <div className="time-entries">
      <div className="time-entries__toolbar">
        <div className="time-entries__filters" role="tablist">
          <button
            type="button"
            className={`time-entries__filter${filter === 'all' ? ' is-active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tất cả
          </button>
          <button
            type="button"
            className={`time-entries__filter${filter === 'billable' ? ' is-active' : ''}`}
            onClick={() => setFilter('billable')}
          >
            Billable
          </button>
        </div>
        <span className="time-entries__total">
          Tổng: <strong>{formatHours(total)}</strong>
        </span>
      </div>

      <div className="time-entries__scroll">
        <table className="time-entries__table">
          <thead>
            <tr>
              <th>Ngày</th>
              <th>Dự án</th>
              <th>Công việc</th>
              <th className="is-num">Giờ</th>
              <th>Billable</th>
              <th aria-label="Thao tác" />
            </tr>
          </thead>
          <tbody>
            {visible.map((entry) => (
              <tr key={entry.id}>
                <td className="time-entries__date">{dayLabel(entry.date)}</td>
                <td>
                  <span className="dash-badge dash-badge--on-going">{entry.project}</span>
                </td>
                <td className="time-entries__task">
                  {entry.task}
                  {entry.note ? <span className="time-entries__note">{entry.note}</span> : null}
                </td>
                <td className="is-num time-entries__hours">{entry.hours}h</td>
                <td>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={entry.billable}
                    className={`time-entries__switch${entry.billable ? ' is-on' : ''}`}
                    onClick={() => onToggleBillable(entry.id)}
                  >
                    <span aria-hidden="true" />
                  </button>
                </td>
                <td className="is-num">
                  <button
                    type="button"
                    className="time-entries__delete"
                    aria-label={`Xóa ${entry.task}`}
                    onClick={() => onDelete(entry.id)}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
            {visible.length === 0 ? (
              <tr>
                <td colSpan={6} className="time-entries__empty">Chưa có bản ghi nào.</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TimeEntryTable;
