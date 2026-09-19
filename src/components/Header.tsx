import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <>
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `text-sm font-semibold rounded-lg px-3 py-1.5 transition-colors ${
            isActive
              ? 'bg-[var(--color-primary)] text-white'
              : 'text-[var(--color-text-secondary)] hover:bg-black/5'
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `text-sm font-semibold rounded-lg px-3 py-1.5 transition-colors ${
            isActive
              ? 'bg-[var(--color-primary)] text-white'
              : 'text-[var(--color-text-secondary)] hover:bg-black/5'
          }`
        }
      >
        About
      </NavLink>
    </>
  );
}

export default Header;
