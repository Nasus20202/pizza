import Background from "./components/Background";
import Hedgehog from "./components/Hedgehog";
import Pizza from "./components/Pizza";
import Plate from "./components/Plate";

function App() {
  const size = 1800;
  const sliceCount = 8;

  return (
    <div className="relative min-h-screen flex items-center justify-center cursor-none">
      <Background />
      <Hedgehog />
      <div className="absolute inset-0">
        <Plate size={size} />
      </div>
      <div className="relative z-10">
        <Pizza sliceCount={sliceCount} size={size} />
      </div>
    </div>
  );
}

export default App;
