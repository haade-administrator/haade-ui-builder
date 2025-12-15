import React, { useState } from 'react';

interface Props {
  widget: any;
  onSave: (w: any) => void;
  onClose: () => void;
}

const WidgetConfigModal: React.FC<Props> = ({ widget, onSave, onClose }) => {
  const [label, setLabel] = useState(widget?.label || '');
  const [type, setType] = useState(widget?.type || 'label');
  const [link, setLink] = useState(widget?.link || '');

  const handleSave = () => {
    onSave({ ...widget, label, type, link });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Configurer Widget</h3>
        <label>Type:</label>
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="label">Label</option>
          <option value="button">Button</option>
          <option value="gauge">Gauge</option>
        </select>
        <label>Label:</label>
        <input value={label} onChange={e => setLabel(e.target.value)} />
        <label>Lien (optionnel):</label>
        <input value={link} onChange={e => setLink(e.target.value)} />
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default WidgetConfigModal;
