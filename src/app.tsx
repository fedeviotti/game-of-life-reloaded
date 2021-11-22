import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GameOfLife from './pages/game-of-life';
import Layout from './components/layout';
import Home from './pages/home';
import NotFound from './components/not-found';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="game-of-life" element={<GameOfLife />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
