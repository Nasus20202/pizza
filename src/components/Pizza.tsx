import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { slicePath } from '../lib/util';
import PizzaSlice from './PizzaSlice';

const ANIMATION_DURATION = 600;

type SliceStatus = 'visible' | 'animating' | 'hidden';

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
  const [sliceStatuses, setSliceStatuses] = useState<SliceStatus[]>(
    Array(sliceCount).fill('visible')
  );
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Cleanup timeouts on unmount
    const timeouts = timeoutsRef.current;
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  const handleClick = useCallback((i: number) => {
    setSliceStatuses((prev) => {
      const next = [...prev];
      next[i] = 'animating';
      return next;
    });

    const timeout = setTimeout(() => {
      setSliceStatuses((prev) => {
        const next = [...prev];
        next[i] = 'hidden';
        return next;
      });
    }, ANIMATION_DURATION);

    timeoutsRef.current.push(timeout);
  }, []);

  const clipPaths = useMemo(
    () => (
      <defs>
        {[...Array(sliceCount)].map((_, i) => (
          <clipPath id={`slice-${i}`} key={i}>
            <path d={slicePath(i, sliceCount, radius, center)} />
          </clipPath>
        ))}
      </defs>
    ),
    [sliceCount, radius, center]
  );

  if (sliceStatuses.every((status) => status === 'hidden')) {
    return null;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <svg
        className="max-w-full max-h-full w-auto h-auto"
        viewBox={`0 0 ${size} ${size}`}
      >
        {clipPaths}
        {sliceStatuses.map(
          (status, i) =>
            status !== 'hidden' && (
              <PizzaSlice
                key={i}
                index={i}
                size={size}
                sliceCount={sliceCount}
                isAnimating={status === 'animating'}
                animationDuration={ANIMATION_DURATION}
                onClick={() => handleClick(i)}
              />
            )
        )}
      </svg>
    </div>
  );
}

export default Pizza;
