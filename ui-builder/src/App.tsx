import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import PageLVGL from './PageLVGL';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/lvgl" element={<PageLVGL />} />
    </Routes>
  );
};

export default App;




