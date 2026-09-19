import { NavLink, Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '24px' }}>
      <header style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
