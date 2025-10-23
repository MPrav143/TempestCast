import { useState } from "react";
import "./App.css";
import search from "./assets/icons/search.png";
import { BackgroundLayout } from "./components";
import { useStateContext } from "./context/index";
import WeatherCard from "./components/WeatherCard";
import MiniCard from "./components/MiniCard";
import OutfitSuggestion from "./components/OutfitSuggestion";

function App() {
  const [input, setInput] = useState("");
  const { weather, location, values, setPlace, outfitSuggestion, loading } = useStateContext();

  const handleSearch = () => {
    if (input.trim()) {
      setPlace(input.trim());
      setInput("");
    }
  };

  return (
    <div className="w-full min-h-screen text-white px-4 md:px-8 bg-cover bg-center">
      <nav className="w-full p-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="font-bold tracking-wide text-2xl md:text-3xl text-center md:text-left">TempestCast</h1>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="bg-white w-full md:w-[15rem] shadow-xl rounded flex items-center p-2 gap-2">
            <img src={search} alt="search" className="w-5 h-5 md:w-6 md:h-6" />
            <input
              type="text"
              placeholder="Search location..."
              className="bg-transparent outline-none w-full text-[#212121] text-base md:text-lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter" && input.trim()) {
                  handleSearch();
                }
              }}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </nav>

      <BackgroundLayout />

      <main className="w-full flex flex-col lg:flex-row gap-8 py-4 justify-center items-start">
        <div className="flex flex-col lg:flex-row gap-8 w-full justify-center">
          <WeatherCard
            place={location}
            windspeed={weather.wspd}
            humidity={weather.humidity}
            temperature={weather.temp}
            heatIndex={weather.heatindex}
            iconString={weather.conditions}
            conditions={weather.conditions}
          />

          {outfitSuggestion && (
            <OutfitSuggestion suggestion={outfitSuggestion} />
          )}
        </div>

        <div className="flex justify-center flex-wrap gap-4 md:gap-6 w-full lg:w-[60%]">
          {values?.slice(0, 6).map((curr) => (
            <MiniCard
              key={curr.datetime}
              time={curr.datetime}
              temp={curr.temp}
              iconString={curr.conditions}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;