import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GridStack } from 'gridstack';
import type { GridStackNode } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';
import WidgetPalette from './WidgetPalette';
import WidgetConfigModal from './WidgetConfigModal';
import * as yaml from 'js-yaml';
import './App.css';

interface WidgetData {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  type: string;
  label: string;
  link?: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [grid, setGrid] = useState<GridStack | null>(null);
  const [modalWidget, setModalWidget] = useState<WidgetData | null>(null);

  // Fonction pour ajouter un widget à GridStack
  const addWidget = (w: WidgetData, gInstance?: GridStack) => {
    const g = gInstance || grid;
    if (!g) return;

    const el = document.createElement('div');
    el.classList.add('grid-stack-item');
    el.setAttribute('gs-w', w.w?.toString() || '4');
    el.setAttribute('gs-h', w.h?.toString() || '1');
    if (w.x !== undefined) el.setAttribute('gs-x', w.x.toString());
    if (w.y !== undefined) el.setAttribute('gs-y', w.y.toString());

    const content = document.createElement('div');
    content.classList.add('grid-stack-item-content', w.type);
    content.innerText = w.label;

    if (w.link) {
      content.style.cursor = 'pointer';
      content.onclick = () => navigate(w.link!);
    }

    // Clic droit ouvre modal configuration
    content.oncontextmenu = (e) => {
      e.preventDefault();
      setModalWidget({ ...w });
    };

    el.appendChild(content);
    g.addWidget(el);
  };

  // useEffect pour initialiser GridStack et charger layout
  useEffect(() => {
    const g = GridStack.init({
      column: 12,
      cellHeight: 100,
      float: true,
      animate: true,
      margin: 10,
    });
    setGrid(g);

    // Charger layout depuis localStorage
    const saved = localStorage.getItem('dashboardLayout');
    if (saved) {
      g.load(JSON.parse(saved));
    } else {
      // Widgets par défaut
      const defaultWidgets: WidgetData[] = [
        { x: 0, y: 0, w: 4, h: 1, type: 'label', label: 'Salon Temp: 22°C' },
        { x: 4, y: 0, w: 4, h: 1, type: 'label', label: 'Chambre Temp: 20°C' },
        { x: 0, y: 1, w: 4, h: 2, type: 'button', label: 'Aller LVGL', link: '/lvgl' },
      ];
      defaultWidgets.forEach(w => addWidget(w, g));
    }

    // Sauvegarde automatique dans localStorage à chaque changement
    g.on('change', () => {
      const layout = g.save(false);
      localStorage.setItem('dashboardLayout', JSON.stringify(layout));
      console.log('Layout sauvegardé dans localStorage');
    });

    // Cleanup GridStack
    return () => g.destroy();
  }, [navigate]);

  // Export YAML ESPHome
  const exportYAML = () => {
    if (!grid) return;
    const layout = grid.save(false) as GridStackNode[];
    const esphomeYaml = layout.map((w) => {
      const type = w.el?.querySelector('.grid-stack-item-content')?.classList[1] || 'unknown';
      const label = w.el?.textContent || '';
      return { platform: 'custom', type, name: label, position: { x: w.x, y: w.y, w: w.w, h: w.h } };
    });
    const yamlStr = yaml.dump({ esphome: esphomeYaml });
    console.log(yamlStr);
    alert('YAML généré dans console !');
  };

  return (
    <div className="App dashboard">
      <aside>
        <WidgetPalette />
        <button onClick={exportYAML} className="btn-export">Export YAML</button>
      </aside>

      <div className="grid-stack-wrapper">
        <div className="grid-stack"></div>
      </div>

      {modalWidget && (
        <WidgetConfigModal
          widget={modalWidget}
          onSave={(w) => { addWidget(w); setModalWidget(null); }}
          onClose={() => setModalWidget(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;






