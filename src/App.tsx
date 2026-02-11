import Background from "./components/Background";
import Pizza from "./components/Pizza";
import Plate from "./components/Plate";

function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Background />
      <div className="absolute inset-0">
        <Plate size={1800} />
      </div>
      <div className="relative z-10">
        <Pizza sliceCount={8} />
      </div>
    </div>
  );
}

export default App;
