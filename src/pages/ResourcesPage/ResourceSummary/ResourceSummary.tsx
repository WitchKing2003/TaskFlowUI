import { TEAM, utilizationStatus } from '../resourcesData';
import './ResourceSummary.css';

function ResourceSummary() {
  const totalBooked = TEAM.reduce((sum, member) => sum + member.booked, 0);
  const totalCapacity = TEAM.reduce((sum, member) => sum + member.capacity, 0);
  const over = TEAM.filter((member) => utilizationStatus(member.booked, member.capacity) === 'over').length;
  const under = TEAM.filter((member) => utilizationStatus(member.booked, member.capacity) === 'under').length;

  const stats = [
    { label: 'Thành viên', value: TEAM.length, sub: `${TEAM.reduce((sum, m) => sum + m.projects.length, 0)} lượt gán dự án` },
    { label: 'Quá tải', value: over, sub: 'trên 100% công suất', accent: 'danger' as const },
    { label: 'Còn dư năng lực', value: under, sub: 'dưới 75% công suất', accent: 'success' as const },
    { label: 'Tổng giờ / tuần', value: `${totalBooked}h`, sub: `trên ${totalCapacity}h công suất`, accent: 'accent' as const },
  ];

  return (
    <div className="res-summary">
      {stats.map((stat) => (
        <article key={stat.label} className={`res-summary__card${stat.accent ? ` is-${stat.accent}` : ''}`}>
          <p className="res-summary__label">{stat.label}</p>
          <p className="res-summary__value">{stat.value}</p>
          <p className="res-summary__sub">{stat.sub}</p>
        </article>
      ))}
    </div>
  );
}

export default ResourceSummary;
