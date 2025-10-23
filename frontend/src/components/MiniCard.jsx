import React, { useEffect, useState } from "react";
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import storm from "../assets/icons/storm.png";
import wind from "../assets/icons/windy.png";

const MiniCard = ({ time, temp, iconString }) => {
  const [icon, setIcon] = useState();

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
    <div className="glassCard w-full max-w-[8rem] min-w-[6rem] h-[10rem] md:w-[10rem] md:h-[12rem] p-3 md:p-4 flex flex-col items-center justify-between">
      <div className="text-center">
        <p className="text-xs md:text-sm">{new Date(time).toLocaleDateString("en-US", { weekday: "short" })}</p>
        <p className="text-xs md:text-sm">{new Date(time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</p>
      </div>
      <img src={icon} alt="weather" className="w-10 h-10 md:w-16 md:h-16" />
      <p className="text-center font-bold text-sm md:text-base">{temp}°C</p>
    </div>
  );
};

export default MiniCard;