import { useEffect, useState } from "react";

function MainPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      className={`absolute w-3/4 h-3/4 bg-gray-100 rounded-xl shadow-xl flex flex-col items-center justify-around ease-in-out duration-3000 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="indie-flower-regular text-8xl text-pink-700">
        Jeżowych
      </div>

      <div className="indie-flower-regular text-8xl text-pink-700">
        Pizzawalentynek!
      </div>
    </div>
  );
}

export default MainPage;
