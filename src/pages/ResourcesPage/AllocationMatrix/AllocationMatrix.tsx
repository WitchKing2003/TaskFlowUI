import { ALLOCATIONS, PROJECTS } from '../resourcesData';
import './AllocationMatrix.css';

function AllocationMatrix() {
  const columnTotals = PROJECTS.map((project) =>
    ALLOCATIONS.reduce((sum, allocation) => sum + (allocation.hours[project] ?? 0), 0),
  );

  const max = Math.max(...columnTotals, 1);

  return (
    <div className="alloc">
      <div className="alloc__scroll">
        <table className="alloc__table">
          <thead>
            <tr>
              <th>Thành viên</th>
              {PROJECTS.map((project) => (
                <th key={project} className="is-num">{project}</th>
              ))}
              <th className="is-num">Tổng</th>
            </tr>
          </thead>
          <tbody>
            {ALLOCATIONS.map((allocation) => {
              const total = PROJECTS.reduce((sum, project) => sum + (allocation.hours[project] ?? 0), 0);
              return (
                <tr key={allocation.member}>
                  <td className="alloc__member">{allocation.member}</td>
                  {PROJECTS.map((project) => {
                    const hours = allocation.hours[project] ?? 0;
                    const intensity = hours / max;
                    return (
                      <td key={project} className="is-num">
                        {hours > 0 ? (
                          <span
                            className="alloc__cell"
                            style={{ backgroundColor: `rgba(229, 98, 44, ${0.12 + intensity * 0.75})` }}
                          >
                            {hours}h
                          </span>
                        ) : (
                          <span className="alloc__cell alloc__cell--empty">—</span>
                        )}
                      </td>
                    );
                  })}
                  <td className="is-num alloc__total">{total}h</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>Tổng dự án</td>
              {columnTotals.map((total, index) => (
                <td key={PROJECTS[index]} className="is-num alloc__total">{total}h</td>
              ))}
              <td className="is-num alloc__grand">{columnTotals.reduce((sum, value) => sum + value, 0)}h</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="alloc__legend">
        <span className="alloc__chip alloc__chip--low" /> Ít giờ
        <span className="alloc__chip alloc__chip--high" /> Nhiều giờ
        <span className="alloc__dash">—</span> Chưa phân bổ
      </p>
    </div>
  );
}

export default AllocationMatrix;
