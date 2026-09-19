import type { ReactNode } from 'react';
import './Card.css';

interface CardProps {
  title?: string;
  /** Nội dung hiển thị ở cạnh phải của header (dropdown, link...) */
  action?: ReactNode;
  /** Tắt padding để table/list ô sát mép card */
  flush?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Component khung dùng chung cho mọi khối trên dashboard:
 * header (title + action) + body.
 */
function Card({ title, action, flush = false, className, children }: CardProps) {
  const classes = ['dash-card', className].filter(Boolean).join(' ');

  return (
    <section className={classes}>
      {title || action ? (
        <header className="dash-card__header">
          {title ? <h3 className="dash-card__title">{title}</h3> : null}
          {action ? <div className="dash-card__action">{action}</div> : null}
        </header>
      ) : null}
      <div className={flush ? 'dash-card__body dash-card__body--flush' : 'dash-card__body'}>
        {children}
      </div>
    </section>
  );
}

export default Card;
