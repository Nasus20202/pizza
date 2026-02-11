import hedgehogImage from "../assets/hedgehog.webp";
import hedgehogAltImage from "../assets/hedgehog-alt.webp";
import { useEffect, useState } from "react";

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

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
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

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
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
