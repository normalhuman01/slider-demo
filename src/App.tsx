import { useState, useRef, useEffect, Fragment } from "react";

type TSliderProps = { min: number; max: number };

const Slider = ({ min, max }: TSliderProps) => {
  const [slider1, setSlider1] = useState(10);
  const [slider2, setSlider2] = useState(50);
  const [dragging1, setDragging1] = useState(false);
  const [dragging2, setDragging2] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const getPercentage = (value: number) => ((value - min) / (max - min)) * 100;

  useEffect(() => {
    document.addEventListener("mousemove", handleMove);
    return () => document.removeEventListener("mousemove", handleMove);
  }, [dragging1, dragging2]);

  const handleMove = (event: MouseEvent) => {
    const { clientX } = event;
    const { left, width } = containerRef.current!.getBoundingClientRect();
    const percentage = (clientX - left - 8) / width;
    const newValue = Math.round(min + percentage * (max - min));

    if (dragging1) setSlider1(newValue);
    if (dragging2) setSlider2(newValue);
  };

  console.log(slider1, slider2);

  return (
    <Fragment>
      <div className="flex items-center w-[300px]">
        <div
          className="w-full h-2 bg-gray-800 rounded-full relative"
          ref={containerRef}
        >
          {/* A */}
          <div
            className={`absolute -top-2 w-6 h-6 rounded-full bg-blue-200 ${
              dragging1 ? "cursor-grabbing" : "cursor-pointer"
            }`}
            style={{ left: `${getPercentage(slider1)}%` }}
            onMouseDown={() => {
              setDragging1(true);
            }}
            onMouseUp={() => {
              setDragging1(false);
            }}
          ></div>
          {/* B */}
          <div
            className={`absolute -top-2 w-6 h-6 rounded-full bg-red-200 ${
              dragging1 ? "cursor-grabbing" : "cursor-pointer"
            }`}
            style={{ left: `${getPercentage(slider2)}%` }}
            onMouseDown={() => {
              setDragging2(true);
            }}
            onMouseUp={() => {
              setDragging2(false);
            }}
          ></div>
        </div>
      </div>
    </Fragment>
  );
};

const App = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-400">
      <Slider min={10} max={100} />
    </div>
  );
};

export default App;
