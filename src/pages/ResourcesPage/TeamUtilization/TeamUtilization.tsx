import { TEAM, utilizationStatus, UTILIZATION_NOTES } from '../resourcesData';
import './TeamUtilization.css';

function TeamUtilization() {
  return (
    <ul className="team-util">
      {TEAM.map((member) => {
        const ratio = Math.round((member.booked / member.capacity) * 100);
        const status = utilizationStatus(member.booked, member.capacity);
        return (
          <li key={member.id} className="team-util__row">
            <span className="team-util__avatar" style={{ backgroundColor: member.avatarColor }} aria-hidden="true">
              {member.name[0]}
            </span>

            <div className="team-util__who">
              <p className="team-util__name">{member.name}</p>
              <p className="team-util__role">{member.role}</p>
            </div>

            <div className="team-util__projects">
              {member.projects.map((project) => (
                <span key={project} className="dash-badge dash-badge--on-going">{project}</span>
              ))}
            </div>

            <div className="team-util__meter">
              <div className="team-util__bar">
                <div
                  className={`team-util__fill is-${status}`}
                  style={{ width: `${Math.min(100, ratio)}%` }}
                />
                <span
                  className="team-util__capacity-mark"
                  style={{ left: '100%' }}
                  aria-hidden="true"
                />
              </div>
              <span className={`team-util__ratio is-${status}`}>
                {ratio}%
                <em>{UTILIZATION_NOTES[status]}</em>
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default TeamUtilization;
