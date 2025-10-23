// components/OutfitSuggestion.jsx
import React from "react";

const OutfitSuggestion = ({ suggestion }) => {
  if (!suggestion) return null;

  return (
    <div className="w-full lg:w-[24rem] min-w-[22rem] h-auto glassCard p-4 flex flex-col">
      <h3 className="text-xl font-bold mb-4 text-center">👕 Smart Outfit Guide</h3>
      
      {/* Comfort Level */}
      <div className="mb-4 p-3 bg-blue-500/20 rounded-lg">
        <p className="text-center font-semibold">Comfort Level: {suggestion.comfort_level}</p>
      </div>
      
      <div className="space-y-4">
        {/* Upper Body */}
        <div>
          <h4 className="font-semibold text-blue-300 mb-2">👕 Upper Body:</h4>
          <ul className="list-disc list-inside ml-2 space-y-1">
            {suggestion.upper_body.map((item, index) => (
              <li key={index} className="text-sm">{item}</li>
            ))}
          </ul>
        </div>
        
        {/* Lower Body */}
        <div>
          <h4 className="font-semibold text-green-300 mb-2">👖 Lower Body:</h4>
          <p className="text-sm">{suggestion.lower_body}</p>
        </div>
        
        {/* Footwear */}
        <div>
          <h4 className="font-semibold text-yellow-300 mb-2">👟 Footwear:</h4>
          <p className="text-sm">{suggestion.footwear}</p>
        </div>
        
        {/* Outerwear */}
        {suggestion.outerwear && suggestion.outerwear.length > 0 && (
          <div>
            <h4 className="font-semibold text-orange-300 mb-2">🧥 Outerwear:</h4>
            <ul className="list-disc list-inside ml-2 space-y-1">
              {suggestion.outerwear.map((item, index) => (
                <li key={index} className="text-sm">{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Accessories */}
        {suggestion.accessories.length > 0 && (
          <div>
            <h4 className="font-semibold text-purple-300 mb-2">🕶️ Accessories:</h4>
            <ul className="list-disc list-inside ml-2 space-y-1">
              {suggestion.accessories.map((item, index) => (
                <li key={index} className="text-sm">{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Notes */}
        {suggestion.notes && (
          <div className="mt-3 p-3 bg-yellow-500/20 rounded-lg">
            <p className="text-sm font-semibold mb-1">💡 Recommendations:</p>
            <p className="text-xs italic">{suggestion.notes}</p>
          </div>
        )}
        
        {/* Weather Alert */}
        {suggestion.weather_alert && (
          <div className="mt-3 p-3 bg-red-500/30 rounded-lg border border-red-400">
            <p className="text-sm font-semibold mb-1">⚠️ Weather Alert:</p>
            <p className="text-xs">{suggestion.weather_alert}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutfitSuggestion;