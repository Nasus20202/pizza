import plateImage from "../assets/plate.webp";

type PlateProps = {
  size?: number;
};

function Plate({ size = 1800 }: PlateProps) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <svg
        className="max-w-full max-h-full w-auto h-auto"
        viewBox={`0 0 ${size} ${size}`}
      >
        <image href={plateImage} width={size} height={size} />
      </svg>
    </div>
  );
}

export default Plate;
