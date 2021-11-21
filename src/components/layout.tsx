import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <>
      <header>
        <Link to="/">Home</Link>
        <nav>
          <Link to="/game-of-life">Game of Life</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
