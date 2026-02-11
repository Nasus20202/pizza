import pizzaImage from "../assets/pizza.webp";
import { useMemo } from "react";

type PizzaSliceProps = {
  index: number;
  size: number;
  sliceCount: number;
  isAnimating: boolean;
  animationDuration: number;
  onClick: () => void;
};

function PizzaSlice({
  index,
  size,
  sliceCount,
  isAnimating,
  animationDuration,
  onClick,
}: PizzaSliceProps) {
  const transform = useMemo(() => {
    if (!isAnimating) return "";

    const anglePerSlice = (2 * Math.PI) / sliceCount;
    const angle = index * anglePerSlice + anglePerSlice / 2;

    const distance = 150;
    const dx = Math.sin(angle) * distance;
    const dy = -Math.cos(angle) * distance;

    return `translate(${dx}px, ${dy}px)`;
  }, [isAnimating, index, sliceCount]);

  const transitionDuration = `${animationDuration}ms`;

  return (
    <g
      style={{
        transform,
        transformOrigin: "center",
        opacity: isAnimating ? 0 : 1,
        transition: `transform ${transitionDuration} ease-out, opacity ${transitionDuration} ease-out`,
      }}
    >
      <image
        href={pizzaImage}
        width={size}
        height={size}
        clipPath={`url(#slice-${index})`}
        onClick={onClick}
      />
    </g>
  );
}

export default PizzaSlice;
