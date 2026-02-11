import { useEffect, useState } from "react";

import hedgehogPizzaImage from "../assets/hedgehog-pizza.webp";

function MainPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    document.title = "Jeżowych Pizzawalentynek!";
  }, []);

  return (
    <div
      className={
        "absolute w-3/4 h-3/4 bg-gray-100 rounded-xl shadow-xl flex flex-col items-center justify-center p-4 gap-4" +
        ` ease-in-out duration-3000 ${visible ? "opacity-100" : "opacity-0"}` +
        " indie-flower-regular text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-pink-700 p-10 select-none"
      }
    >
      <div className="text-center">Jeżowych</div>
      <img
        src={hedgehogPizzaImage}
        alt="Hedgehog Pizza"
        className="max-w-full max-h-full object-contain flex-1 min-h-0"
      />
      <div className="text-center">Pizzawalentynek!</div>
    </div>
  );
}

export default MainPage;
