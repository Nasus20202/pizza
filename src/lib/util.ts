function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function slicePath(
  index: number,
  sliceCount: number,
  radius: number,
  center: number,
) {
  const angle = 360 / sliceCount;
  const startAngle = index * angle;
  const endAngle = startAngle + angle;

  const start = polarToCartesian(center, center, radius, startAngle);
  const end = polarToCartesian(center, center, radius, endAngle);

  return `
    M ${center} ${center}
    L ${start.x} ${start.y}
    A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}
    Z
  `;
}

export { polarToCartesian, slicePath };
