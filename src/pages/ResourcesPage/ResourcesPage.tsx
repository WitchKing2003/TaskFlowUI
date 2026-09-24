import Card from '../../components/Card/Card';
import ResourceSummary from './ResourceSummary/ResourceSummary';
import TeamUtilization from './TeamUtilization/TeamUtilization';
import AllocationMatrix from './AllocationMatrix/AllocationMatrix';
import './ResourcesPage.css';

/**
 * Màn Resource management — tổng quan công suất team,
 * utilization từng thành viên và ma trận phân bổ dự án.
 */
function ResourcesPage() {
  return (
    <div className="resources-page">
      <ResourceSummary />

      <div className="resources-page__grid">
        <Card
          title="Team utilization"
          className="resources-page__util"
          action={
            <select className="dash-select" defaultValue="week" aria-label="Khoảng thời gian">
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
            </select>
          }
        >
          <TeamUtilization />
        </Card>

        <Card
          title="Phân bổ theo dự án (giờ/tuần)"
          className="resources-page__alloc"
          action={
            <select className="dash-select" defaultValue="all" aria-label="Lọc dự án">
              <option value="all">Tất cả dự án</option>
              <option value="nelsa">Nelsa web dev</option>
              <option value="tasks">Tasks app</option>
              <option value="aurora">Aurora mobile app</option>
            </select>
          }
        >
          <AllocationMatrix />
        </Card>
      </div>
    </div>
  );
}

export default ResourcesPage;
