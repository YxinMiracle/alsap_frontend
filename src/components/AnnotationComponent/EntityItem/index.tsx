import '@umijs/max';
import React from 'react';
import '@/components/AnnotationComponent/css/EntityStyle.css'

interface Props {
  id?: number;
  text: string | null;
  label: string | null;
  color: string | null;
}

const EntityItem: React.FC<Props> = (props) => {
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
      {props.label && props.color ? (
        <span style={{ borderColor: props.color }} className="highlight bottom">
          <span className="highlight__content">
            {props.text}
            {/*<IconClose onClick={remove} className="delete" />*/}
          </span>
          <span
            data-label={props.label}
            style={{ backgroundColor: props.color, color: idealColor(props.color) }}
            className="highlight__label"
          />
        </span>
      ) : (
        <span>{props.text}</span>
      )}
    </>
  );
};
export default EntityItem;
