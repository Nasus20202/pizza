import { useState } from 'react';
import Background from './components/Background';
import Hedgehog from './components/Hedgehog';
import MainPage from './pages/MainPage';
import PizzaPage from './pages/PizzaPage';

function App() {
  const [mainPageVisible, setMainPageVisible] = useState(false);
  return (
    <div className="relative min-h-screen flex items-center justify-center cursor-none">
      <Background />
      <Hedgehog />
      <PizzaPage handleClose={() => setMainPageVisible(true)} />
      {mainPageVisible && <MainPage />}
    </div>
  );
}

export default App;
