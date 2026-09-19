import './ProjectsWorkload.css';

export interface MemberWorkload {
  name: string;
  total: number;
}

const WORKLOAD: MemberWorkload[] = [
  { name: 'Tom', total: 45 },
  { name: 'Marty', total: 30 },
  { name: 'Ruth', total: 70 },
  { name: 'Christy', total: 40 },
  { name: 'Angry', total: 20 },
  { name: 'Kadln', total: 35 },
  { name: 'Mikle', total: 24 },
];

function ProjectsWorkload() {
  const maxDots = 7;

  return (
    <div className="dash-workload">
      <div className="dash-workload__chart">
        {WORKLOAD.map((member) => {
          const dots = Math.max(1, Math.round((member.total / 100) * maxDots));
          return (
            <div key={member.name} className="dash-workload__col">
              <div className="dash-workload__dots">
                {Array.from({ length: dots }, (_, index) => (
                  <span
                    key={index}
                    className={`dash-workload__dot${index === dots - 1 ? ' is-top' : ''}`}
                  >
                    {index === dots - 1 ? member.total : ''}
                  </span>
                ))}
              </div>
              <span className="dash-workload__name">{member.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectsWorkload;
