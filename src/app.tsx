import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GameOfLife from './pages/game-of-life';
import Layout from './components/layout';
import Home from './pages/home';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="game-of-life" element={<GameOfLife />} />
        </Route>
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
