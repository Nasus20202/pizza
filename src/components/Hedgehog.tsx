import hedgehogImage from '../assets/hedgehog.webp';
import hedgehogAltImage from '../assets/hedgehog-alt.webp';
import { useEffect, useState } from 'react';

type HedgehogProps = {
  size?: number;
};

function Hedgehog({ size = 100 }: HedgehogProps) {
  const [position, setPosition] = useState({ x: -size, y: -size });
  const [isAlt, setIsAlt] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setPosition({ x: touch.clientX, y: touch.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        setIsAlt(true);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        setIsAlt(false);
      }
    };

    const handleTouchStart = () => {
      setIsAlt(true);
    };

    const handleTouchEnd = () => {
      setIsAlt(false);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <img
      src={isAlt ? hedgehogAltImage : hedgehogImage}
      alt="Hedgehog"
      className="fixed z-100 pointer-events-none"
      style={{
        left: position.x - size / 2,
        top: position.y - size / 2,
        width: size,
        height: size,
      }}
    />
  );
}

export default Hedgehog;
