import './OverviewStats.css';

export interface StatItem {
  id: string;
  icon: string;
  label: string;
  value: string;
  sub: string;
  trend: string;
  trendUp: boolean;
  accent: 'purple' | 'orange' | 'blue' | 'yellow';
}

const STATS: StatItem[] = [
  {
    id: 'revenue',
    icon: '$',
    label: 'Total revenue',
    value: '$53,00989',
    sub: 'Số dư từ 112 đơn hàng',
    trend: '+12% so với tháng trước',
    trendUp: true,
    accent: 'purple',
  },
  {
    id: 'projects',
    icon: 'P',
    label: 'Projects',
    value: '95',
    sub: '/120',
    trend: '+5% so với tháng trước',
    trendUp: true,
    accent: 'orange',
  },
  {
    id: 'time',
    icon: 'T',
    label: 'Time spent',
    value: '1022',
    sub: '/1600 Hrs',
    trend: '+8.2% so với tháng trước',
    trendUp: true,
    accent: 'blue',
  },
  {
    id: 'resources',
    icon: 'R',
    label: 'Resources',
    value: '101',
    sub: '/120',
    trend: '+2% so với tháng trước',
    trendUp: true,
    accent: 'yellow',
  },
];

function OverviewStats() {
  return (
    <div className="dash-stats">
      {STATS.map((stat) => (
        <article key={stat.id} className="dash-stat">
          <span className={`dash-stat__icon dash-stat__icon--${stat.accent}`}>
            {stat.icon}
          </span>
          <p className="dash-stat__label">{stat.label}</p>
          <p className="dash-stat__value">
            {stat.value} <small>{stat.sub}</small>
          </p>
          <p className={`dash-stat__trend ${stat.trendUp ? 'is-up' : 'is-down'}`}>
            {stat.trend}
          </p>
        </article>
      ))}
    </div>
  );
}

export default OverviewStats;
