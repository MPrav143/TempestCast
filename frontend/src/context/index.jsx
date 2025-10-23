import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const stateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [values, setValues] = useState([]);
  const [place, setPlace] = useState("Kovilpatti, India");
  const [location, setLocation] = useState("");
  const [outfitSuggestion, setOutfitSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('http://localhost:5000/api/weather', {
        params: { place }
      });
      
      const data = response.data;
      setWeather({
        temp: data.temperature,
        conditions: data.conditions,
        humidity: data.humidity,
        wspd: data.windspeed,
        heatindex: data.heatindex
      });
      
      setValues(data.forecast || []);
      setLocation(data.location);
      setOutfitSuggestion(data.outfit_suggestion);
      
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError(err.response?.data?.error || 'Failed to fetch weather data');
      alert("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [place]);

  return (
    <stateContext.Provider value={{ 
      weather, 
      values, 
      setPlace, 
      location,
      outfitSuggestion,
      loading,
      error
    }}>
      {children}
    </stateContext.Provider>
  );
};

export const useStateContext = () => useContext(stateContext);