import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/layout.css';

const Layout: React.FC = () => {
  return (
    <>
      <header className="header">
        <Link to="/">Home</Link>
        <nav>
          <Link to="/game-of-life">Game of Life</Link>
        </nav>
      </header>
      <main className="content">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
