import React from 'react';
import './App.css';

interface WidgetItem {
  type: string;
  label: string;
  color?: string;
}

const palette: WidgetItem[] = [
  { type: 'label', label: 'Label', color: 'rgba(255,183,197,0.4)' },
  { type: 'button', label: 'Button', color: 'rgba(129,216,208,0.4)' },
  { type: 'gauge', label: 'Gauge', color: 'rgba(255,223,186,0.4)' },
];

const WidgetPalette: React.FC = () => {
  return (
    <div className="widget-palette">
      <h3>Palette</h3>
      {palette.map((w, i) => (
        <div key={i} className={`palette-item ${w.type}`} draggable data-type={w.type} data-label={w.label}>
          {w.label}
        </div>
      ))}
    </div>
  );
};

export default WidgetPalette;

