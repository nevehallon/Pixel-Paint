/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';

export interface ColorPickerProps {
  emitChangeComplete: (color: any) => void;
  currentColor: string;
}

function ColorPicker({
  emitChangeComplete,
  currentColor,
}: ColorPickerProps): any {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(currentColor);

  const styles = reactCSS({
    default: {
      color: {
        width: '36px',
        height: '14px',
        borderRadius: '2px',
        background: color,
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        borderRadius: '1px',
        boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
        display: 'inline-block',
        cursor: 'pointer',
      },
      popover: {
        position: 'absolute',
        zIndex: '2',
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
    },
  });

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleClick = () => {
    setDisplayColorPicker((dcp) => !dcp);
  };

  const handleChange = (newColor: any) => {
    setColor(newColor.hex);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        onKeyDown={(e) => (e.key === 'enter' ? handleClick() : false)}
        role="button"
        style={styles.swatch}
        tabIndex={0}
      >
        <div style={styles.color} />
      </div>
      {displayColorPicker ? (
        <div style={(styles as any).popover}>
          <div
            onClick={handleClose}
            onKeyDown={(e) => (e.key === 'esc' ? handleClose() : false)}
            role="button"
            style={(styles as any).cover}
            tabIndex={0}
          />
          <SketchPicker
            color={color}
            onChange={handleChange}
            onChangeComplete={emitChangeComplete}
          />
        </div>
      ) : null}
    </div>
  );
}

export default ColorPicker;
