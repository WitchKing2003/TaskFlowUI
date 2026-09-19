import Card from '../../components/Card/Card';
import OverviewStats from './OverviewStats/OverviewStats';
import ProjectSummary from './ProjectSummary/ProjectSummary';
import OverallProgress from './OverallProgress/OverallProgress';
import TodayTask from './TodayTask/TodayTask';
import ProjectsWorkload from './ProjectsWorkload/ProjectsWorkload';
import './DashboardPage.css';

/**
 * Màn chính dashboard — chỉ chứa nội dung riêng;
 * Sidebar + Topbar do AppShell dùng chung đảm nhiệm.
 */
function DashboardPage() {
  return (
    <>
      <section className="dash-section">
        <div className="dash-section__head">
          <h2 className="dash-section__title">Overview</h2>
          <select className="dash-select" defaultValue="30" aria-label="Khoảng thời gian">
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>

        <OverviewStats />
      </section>

      <div className="dash-grid">
        <Card
          title="Project summary"
          className="dash-grid__summary"
          action={
            <>
              <select className="dash-select" defaultValue="project" aria-label="Lọc dự án">
                <option value="project">Project</option>
                <option value="client">Client</option>
              </select>
              <select className="dash-select" defaultValue="manager" aria-label="Lọc quản lý">
                <option value="manager">Project manager</option>
                <option value="member">Member</option>
              </select>
              <select className="dash-select" defaultValue="all" aria-label="Lọc trạng thái">
                <option value="all">Status</option>
                <option value="completed">Completed</option>
                <option value="progress">In progress</option>
              </select>
            </>
          }
        >
          <div className="dash-summary">
            <ProjectSummary />
          </div>
        </Card>

        <Card
          title="Overall Progress"
          className="dash-grid__progress"
          action={
            <select className="dash-select" defaultValue="all" aria-label="Lọc tiến độ">
              <option value="all">All</option>
            </select>
          }
        >
          <OverallProgress />
        </Card>

        <Card title="Today task" className="dash-grid__tasks" flush>
          <TodayTask />
        </Card>

        <Card
          title="Projects Workload"
          className="dash-grid__workload"
          action={
            <select className="dash-select" defaultValue="3" aria-label="Khoảng workload">
              <option value="3">Last 3 months</option>
              <option value="6">Last 6 months</option>
            </select>
          }
        >
          <ProjectsWorkload />
        </Card>
      </div>
    </>
  );
}

export default DashboardPage;
