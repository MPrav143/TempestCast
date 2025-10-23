import React, { useState,useEffect } from 'react'
import { useStateContext } from '../context'
import Clear from '../assets/images/Clear.jpg'
import Cloudy from '../assets/images/Cloudy.jpg'
import Fog from '../assets/images/Fog.png'
import Rainy from '../assets/images/Rainy.jpg'
import Snow from '../assets/images/Snow.jpg'
import Stormy from '../assets/images/Stormy.jpg'
import Sunny from '../assets/images/Sunny.jpg'



const BackgroundLayout = () => {
    const {weather}=useStateContext()
    const [image, setImage] = useState(Clear)

    useEffect(()=>{
        if(weather.conditions){
            let imgString = weather.conditions.toLowerCase();
            if(imgString.includes("clear")){
                setImage(Clear);
            }
            else if(imgString.includes("cloudy")
                || imgString.includes("overcast")) {
                setImage(Cloudy);
            }
            else if(imgString.includes("fog")
                || imgString.includes("mist")) {
                setImage(Fog);
            }
            else if(imgString.includes("rain") 
                || imgString.includes("drizzle") 
                || imgString.includes("shower")) {
                setImage(Rainy);
            }
            else if(imgString.includes("snow")
                || imgString.includes("sleet"))  {
                setImage(Snow);
            }
            else if(imgString.includes("storm")
                || imgString.includes("thunder")
                || imgString.includes("lightning")) {
                setImage(Stormy);
            }
            else if(imgString.includes("sunny")
                || imgString.includes("sunshine")
                || imgString.includes("sun")) {
                setImage(Sunny);
            }

        }
    },[weather])

    return (
        <img src={image} alt="weather_image" 
         className="h-screen w-full fixed left-0 top-0 -z-[10]" />

    )


}

export default BackgroundLayout