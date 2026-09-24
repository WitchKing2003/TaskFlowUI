import { useEffect, useState } from 'react';
import { RUNNING_TIMER, formatClock } from '../timeLogData';
import './TimerCard.css';

function TimerCard() {
  const [running, setRunning] = useState(true);
  const [seconds, setSeconds] = useState(RUNNING_TIMER.elapsedSeconds);

  useEffect(() => {
    if (!running) return undefined;
    const timer = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  return (
    <section className="timer-card">
      <div className="timer-card__info">
        <span className={`timer-card__pulse${running ? ' is-running' : ''}`} aria-hidden="true" />
        <div>
          <p className="timer-card__task">{RUNNING_TIMER.task}</p>
          <p className="timer-card__project">{RUNNING_TIMER.project}</p>
        </div>
      </div>

      <p className={`timer-card__clock${running ? ' is-running' : ''}`}>{formatClock(seconds)}</p>

      <button
        type="button"
        className={`timer-card__button${running ? ' is-running' : ''}`}
        onClick={() => setRunning((value) => !value)}
      >
        {running ? '⏸ Dừng' : '▶ Bắt đầu'}
      </button>
    </section>
  );
}

export default TimerCard;
