import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <div className="p-6">
      <header className="flex items-center gap-3 mb-5">
        <Header />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
