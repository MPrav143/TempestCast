import React, { useEffect, useState } from "react";
import useDate from "../utils/useDate";
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import storm from "../assets/icons/storm.png";
import wind from "../assets/icons/windy.png";

const WeatherCard = ({ temperature, conditions, windspeed, humidity, iconString, place, heatIndex }) => {
  const [icon, setIcon] = useState(sun);
  const { fullDate, time, shortDate } = useDate();

  useEffect(() => {
    const str = iconString?.toLowerCase() || "";
    if (str.includes("clear")) setIcon(sun);
    else if (str.includes("cloud")) setIcon(cloud);
    else if (str.includes("fog")) setIcon(fog);
    else if (str.includes("rain")) setIcon(rain);
    else if (str.includes("snow")) setIcon(snow);
    else if (str.includes("thunder") || str.includes("storm")) setIcon(storm);
    else if (str.includes("wind")) setIcon(wind);
  }, [iconString]);

  return (
    <div className="w-full max-w-[22rem] min-w-[18rem] h-auto glassCard p-4 flex flex-col justify-between mx-auto">
      <div className="flex justify-center items-center gap-4 mt-4">
        <img src={icon} alt="weather_icon" className="w-12 h-12 md:w-16 md:h-16" />
        <p className="font-bold text-4xl md:text-5xl">{temperature}°C</p>
      </div>

      <div className="text-center font-bold text-lg md:text-xl mt-2">{place}</div>

      <div className="flex flex-col md:flex-row justify-around text-xs md:text-sm mt-3 gap-2">
        <p className="text-center">{fullDate}</p>
        <p className="text-center">{time} 📅 {shortDate}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between mt-4 gap-3">
        <div className="flex-1 bg-blue-600 rounded-lg text-center p-2 font-bold">
          Wind Speed
          <p className="font-normal text-sm">{windspeed ?? "N/A"} km/h</p>
        </div>
        <div className="flex-1 bg-green-600 rounded-lg text-center p-2 font-bold">
          Humidity
          <p className="font-normal text-sm">{humidity}%</p>
        </div>
      </div>

      <div className="mt-4 px-2">
        <p className="text-base md:text-lg font-semibold">Heat Index</p>
        <p className="text-base md:text-lg">{heatIndex ?? "N/A"}°C</p>
      </div>

      <hr className="my-3 border-slate-400" />

      <div className="text-xl md:text-2xl text-center font-semibold mb-2">{conditions}</div>
    </div>
  );
};

export default WeatherCard;