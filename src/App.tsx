import Background from "./components/Background";
import Pizza from "./components/Pizza";

function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <Background />
      <Pizza sliceCount={8} />
    </div>
  );
}

export default App;
