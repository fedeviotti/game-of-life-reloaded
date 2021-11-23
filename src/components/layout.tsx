import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from '../styles/layout.module.css';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className={styles.header}>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/game-of-life">Game of Life</Link>
        </nav>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
