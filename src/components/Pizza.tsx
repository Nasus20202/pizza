import { useState } from "react";
import pizzaImage from "../assets/pizza.webp";
import { slicePath } from "../lib/util";

type PizzaProps = {
  sliceCount?: number;
  size?: number;
  radius?: number;
  center?: number;
};

function Pizza({
  sliceCount = 8,
  size = 1800,
  radius = size / 2,
  center = size / 2,
}: PizzaProps) {
  const [hiddenSlices, setHiddenSlices] = useState(
    Array(sliceCount).fill(false),
  );
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <svg
        className="cursor-pointer max-w-full max-h-full w-auto h-auto"
        viewBox={`0 0 ${size} ${size}`}
      >
        <defs>
          {[...Array(sliceCount)].map((_, i) => (
            <clipPath id={`slice-${i}`} key={i}>
              <path d={slicePath(i, sliceCount, radius, center)} />
            </clipPath>
          ))}
        </defs>
        {[...Array(sliceCount)].map(
          (_, i) =>
            !hiddenSlices[i] && (
              <image
                key={i}
                href={pizzaImage}
                width={size}
                height={size}
                clipPath={`url(#slice-${i})`}
                onClick={() => {
                  const newHidden = [...hiddenSlices];
                  newHidden[i] = true;
                  setHiddenSlices(newHidden);
                }}
              />
            ),
        )}
      </svg>
    </div>
  );
}

export default Pizza;
