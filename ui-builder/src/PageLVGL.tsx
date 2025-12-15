import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const PageLVGL: React.FC = () => (
  <div className="App">
    <header className="header">
      <h1>Page LVGL</h1>
    </header>
    <div className="grid-stack-wrapper lvgl-page">
      <p>Widgets fixes ou template LVGL ici.</p>
      <Link to="/">⬅ Retour au Dashboard</Link>
    </div>
  </div>
);

export default PageLVGL;

