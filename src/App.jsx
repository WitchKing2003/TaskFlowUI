import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '24px' }}>
      <header style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <Header />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
