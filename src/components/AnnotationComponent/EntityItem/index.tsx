import { CloseOutlined } from '@ant-design/icons';
import '@umijs/max';
import React from 'react';

interface Props {
  id: number;
  text: string | null;
  label: string | null;
  color: string | null;
  removeEntity?: (annotationId: number) => void;
}

const EntityItem: React.FC<Props> = (props) => {
  const { id, text, label, color, removeEntity} = props;

  const idealColor = (hexString: string) => {
    // W3c offers a formula for calculating ideal color:
    // https://www.w3.org/TR/AERT/#color-contrast
    const r = parseInt(hexString.substr(1, 2), 16);
    const g = parseInt(hexString.substr(3, 2), 16);
    const b = parseInt(hexString.substr(5, 2), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 < 128 ? '#ffffff' : '#000000';
  };

  return (
    <>
      {label && color && id ? (
        <span style={{ borderColor: color }} className="highlight bottom">
          <span className="highlight__content">
            {text}
            <CloseOutlined onClick={() => removeEntity?.(id)} className="delete" />
          </span>
          <span
            data-label={label}
            style={{ backgroundColor: color, color: idealColor(color) }}
            className="highlight__label"
          />
        </span>
      ) : (
        <span className="normal-text">{text}</span>
      )}
    </>
  );
};
export default EntityItem;
