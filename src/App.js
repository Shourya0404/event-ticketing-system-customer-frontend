import './App.css';

import { Routes, Route } from 'react-router-dom';

import BuyTicketsPage from './pages/BuyTicketsPage/BuyTicketsPage';
import LandingPage from './pages/LandingPage/LandingPage';
import MyTicketsPage from './pages/MyTicketsPage/MyTicketsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mytickets" element={<MyTicketsPage />} />
        <Route path="/buytickets" element={<BuyTicketsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
