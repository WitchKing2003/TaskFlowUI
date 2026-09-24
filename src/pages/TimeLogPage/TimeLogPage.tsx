import { useState } from 'react';
import Card from '../../components/Card/Card';
import FormModal from '../../components/Modal/FormModal';
import ConfirmDeleteModal from '../../components/Modal/ConfirmDeleteModal';
import SuccessDialog from '../../components/Modal/SuccessDialog';
import TimerCard from './TimerCard/TimerCard';
import TimeSummary from './TimeSummary/TimeSummary';
import WeeklyChart from './WeeklyChart/WeeklyChart';
import TimeEntryTable from './TimeEntryTable/TimeEntryTable';
import { TIME_ENTRIES, formatHours } from './timeLogData';
import type { TimeEntry } from './timeLogData';
import './TimeLogPage.css';

function TimeLogPage() {
  const [entries, setEntries] = useState<TimeEntry[]>(TIME_ENTRIES);
  const [addOpen, setAddOpen] = useState(false);
  const [deleting, setDeleting] = useState<TimeEntry | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddEntry = (values: Record<string, string>) => {
    const entry: TimeEntry = {
      id: Date.now(),
      date: values.date || new Date().toISOString().slice(0, 10),
      project: values.project,
      task: values.task,
      hours: Number(values.hours) || 0,
      billable: values.billable === 'yes',
    };
    setEntries((current) => [entry, ...current]);
    setAddOpen(false);
    setSuccess(`Đã thêm ${formatHours(entry.hours)} cho “${entry.task}”.`);
  };

  const handleDelete = () => {
    if (!deleting) return;
    setEntries((current) => current.filter((entry) => entry.id !== deleting.id));
    setSuccess(`Đã xóa bản ghi “${deleting.task}”.`);
    setDeleting(null);
  };

  const handleToggleBillable = (id: number) => {
    setEntries((current) =>
      current.map((entry) => (entry.id === id ? { ...entry, billable: !entry.billable } : entry)),
    );
  };

  return (
    <div className="time-log-page">
      <TimerCard />

      <TimeSummary />

      <div className="time-log-page__grid">
        <Card
          title="Giờ làm theo ngày"
          className="time-log-page__chart"
          action={
            <select className="dash-select" defaultValue="week" aria-label="Khoảng thời gian">
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
            </select>
          }
        >
          <WeeklyChart />
        </Card>

        <Card
          title="Bản ghi thời gian"
          className="time-log-page__entries"
          action={
            <button type="button" className="time-log-page__add" onClick={() => setAddOpen(true)}>
              ＋ Thêm bản ghi
            </button>
          }
        >
          <TimeEntryTable
            entries={entries}
            onDelete={(id) => setDeleting(entries.find((entry) => entry.id === id) ?? null)}
            onToggleBillable={handleToggleBillable}
          />
        </Card>
      </div>

      <FormModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        mode="create"
        title="Thêm bản ghi thời gian"
        submitLabel="Thêm bản ghi"
        fields={[
          { name: 'task', label: 'Công việc', required: true, placeholder: 'VD: Thiết kế màn dashboard' },
          { name: 'project', label: 'Dự án', required: true, placeholder: 'VD: Nelsa web dev' },
          { name: 'date', label: 'Ngày', type: 'date', required: true },
          { name: 'hours', label: 'Số giờ', type: 'number', required: true, placeholder: 'VD: 2.5' },
          {
            name: 'billable',
            label: 'Billable',
            type: 'select',
            options: [
              { value: 'yes', label: 'Có — tính phí khách hàng' },
              { value: 'no', label: 'Không' },
            ],
          },
        ]}
        initialValues={{ date: new Date().toISOString().slice(0, 10), billable: 'yes' }}
        onSubmit={handleAddEntry}
      />

      <ConfirmDeleteModal
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        itemName={deleting?.task}
        description="Bạn có chắc muốn xóa bản ghi thời gian"
      />

      <SuccessDialog
        open={Boolean(success)}
        onClose={() => setSuccess(null)}
        description={success ?? undefined}
      />
    </div>
  );
}

export default TimeLogPage;
