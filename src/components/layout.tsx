import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from '../styles/layout.module.css';

const Layout: React.FC = () => {
  return (
    <>
      <header className={styles.header}>
        <Link to="/">Home</Link>
        <nav>
          <Link to="/game-of-life">Game of Life</Link>
        </nav>
      </header>
      <main className={styles.content}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
