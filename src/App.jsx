import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [bgColor, setBgcolor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [taskName, setTaskname] = useState("");
  const [divs, setDivs] = useState([]);

  const handlenewdiv = () => {
    if (taskName === "") {
      alert("Please fill all the fields");
    } else {
      const id = Date.now(); // Unique ID for each div
      const newDiv = {
        id,
        bgColor,
        textColor,
        taskName,
        timeLeft: 30,
      };

      setDivs([...divs, newDiv]);
    };
  };

  useEffect(() => {
    const intervalIds = divs.map((div) => {
      const intervalId = setInterval(() => {
        setDivs((prevDivs) =>
          prevDivs.map((d) =>
            d.id === div.id && d.timeLeft > 0
              ? { ...d, timeLeft: d.timeLeft - 1 }
              : d
          )
        );
      }, 1000);

      setTimeout(() => {
        clearInterval(intervalId);
        setDivs((prevDivs) => prevDivs.filter((d) => d.id !== div.id));
      }, 30000);

      return intervalId;
    });

    return () => intervalIds.forEach(clearInterval);
  }, [divs]);

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4 w-full justify-center">
        <input
          type="text"
          placeholder="Enter Your Task"
          onChange={(e) => setTaskname(e.target.value)}
          className="border p-2 rounded-md"
        />
        <label className="flex items-center border p-2 rounded-md">
          Background Color:
          <input
            type="color"
            onChange={(e) => setBgcolor(e.target.value)}
            className="ml-2"
          />
        </label>
        <label className="flex items-center border p-2 rounded-md">
          Text Color:
          <input
            type="color"
            onChange={(e) => setTextColor(e.target.value)}
            className="ml-2"
          />
        </label>
        <button
          onClick={handlenewdiv}
          className="border border-black py-2 px-4 rounded-md bg-white text-black hover:bg-gray-100 transition"
        >
          Add New
        </button>
      </div>
      <div className="flex flex-wrap mt-4 p-4 border rounded-md bg-gray-100">
        {divs.map((div) => (
          <div
            key={div.id}
            className="w-32 h-32 flex justify-center items-center border rounded-md shadow-lg m-2"
            style={{ backgroundColor: div.bgColor }}>
            <div className='overflow-hidden'>
              <p style={{ color: div.textColor }} className='font-bold'>{div.taskName}</p>
              <p style={{ color: div.textColor }}>{div.timeLeft}s</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
