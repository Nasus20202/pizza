import { useState } from 'react';
import plateImage from '../assets/plate.webp';

type PlateProps = {
  size?: number;
  onClick?: () => void;
};

function Plate({ size = 1800, onClick: on }: PlateProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  return (
    isVisible && (
      <div
        className="w-screen h-screen flex items-center justify-center cursor-pointer transition-transform duration-3000 ease-in-out overflow-hidden"
        onClick={() => {
          setIsClicked(true);
          on?.();
        }}
        onTransitionEnd={() => setIsVisible(!isClicked)}
        style={{
          transform: isClicked ? 'translateY(150vh)' : 'translateY(0)',
          pointerEvents: isClicked ? 'none' : 'auto',
        }}
      >
        <svg
          className="max-w-full max-h-full w-auto h-auto z-20"
          viewBox={`0 0 ${size} ${size}`}
        >
          <image href={plateImage} width={size} height={size} />
        </svg>
      </div>
    )
  );
}

export default Plate;
