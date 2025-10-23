# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

# RapidAPI Configuration
RAPIDAPI_KEY = os.getenv('RAPIDAPI_KEY', 'your_rapidapi_key_here')
RAPIDAPI_HOST = 'visual-crossing-weather.p.rapidapi.com'

def get_outfit_suggestion(weather_data):
    """Generate outfit suggestions based on weather conditions matching background image logic"""
    temp = weather_data.get('temp', 20)
    conditions = weather_data.get('conditions', '').lower()
    humidity = weather_data.get('humidity', 50)
    windspeed = weather_data.get('windspeed', 0)
    
    print(f"DEBUG: Conditions received: '{conditions}'")
    
    outfit = {
        'upper_body': [],
        'lower_body': '',
        'accessories': [],
        'footwear': '',
        'outerwear': [],
        'notes': '',
        'comfort_level': 'Moderate',
        'weather_alert': ''
    }
    
    # Base clothing based on temperature (same as before)
    if temp >= 35:
        outfit['upper_body'] = ['Lightweight t-shirt', 'Tank top', 'Breathable shirt']
        outfit['lower_body'] = 'Shorts or light linen trousers'
        outfit['footwear'] = 'Sandals or breathable mesh shoes'
        outfit['comfort_level'] = 'Hot'
        base_note = 'Extremely hot weather'
        
    elif temp >= 28:
        outfit['upper_body'] = ['Cotton t-shirt', 'Polo shirt', 'Light blouse']
        outfit['lower_body'] = 'Shorts or light cotton trousers'
        outfit['footwear'] = 'Breathable sneakers or open shoes'
        outfit['comfort_level'] = 'Warm'
        base_note = 'Warm weather'
        
    elif temp >= 22:
        outfit['upper_body'] = ['T-shirt', 'Light long-sleeve shirt', 'Thin sweater']
        outfit['lower_body'] = 'Chinos, jeans, or casual trousers'
        outfit['footwear'] = 'Sneakers or comfortable shoes'
        outfit['comfort_level'] = 'Comfortable'
        base_note = 'Pleasant temperature'
        
    elif temp >= 16:
        outfit['upper_body'] = ['Long-sleeve shirt', 'Light sweater', 'Hoodie']
        outfit['lower_body'] = 'Jeans or trousers'
        outfit['footwear'] = 'Closed shoes or boots'
        outfit['comfort_level'] = 'Cool'
        base_note = 'Mild weather'
        
    elif temp >= 10:
        outfit['upper_body'] = ['Sweater', 'Fleece', 'Thermal top']
        outfit['lower_body'] = 'Jeans with thermal leggings or thick trousers'
        outfit['footwear'] = 'Boots or warm closed shoes'
        outfit['comfort_level'] = 'Cold'
        base_note = 'Cool weather'
        
    elif temp >= 0:
        outfit['upper_body'] = ['Thermal wear', 'Wool sweater', 'Fleece jacket']
        outfit['lower_body'] = 'Thermal pants under jeans or thick trousers'
        outfit['footwear'] = 'Insulated boots with warm socks'
        outfit['comfort_level'] = 'Very Cold'
        base_note = 'Cold weather'
        
    else:
        outfit['upper_body'] = ['Heavy thermal wear', 'Wool sweater', 'Insulated jacket']
        outfit['lower_body'] = 'Thermal pants under waterproof trousers'
        outfit['footwear'] = 'Winter boots with thermal socks'
        outfit['comfort_level'] = 'Freezing'
        base_note = 'Freezing conditions'

    # WEATHER CONDITION DETECTION - EXACTLY MATCHING BACKGROUND LOGIC
    condition_notes = []
    imgString = conditions.lower()
    
    # Clear weather
    if "clear" in imgString:
        outfit['accessories'].append('Sunglasses')
        if temp > 20:
            outfit['accessories'].append('Sun hat or cap')
        condition_notes.append('Clear skies - sun protection recommended')
        print("DEBUG: Clear condition detected")
    
    # Cloudy/Overcast weather
    elif "cloudy" in imgString or "overcast" in imgString:
        # For cloudy weather, we can keep the base temperature recommendations
        condition_notes.append('Cloudy conditions - versatile layers work well')
        print("DEBUG: Cloudy condition detected")
    
    # Fog/Mist weather
    elif "fog" in imgString or "mist" in imgString:
        outfit['accessories'].append('Reflective clothing or accessories')
        condition_notes.append('Reduced visibility - wear visible colors')
        # Add an extra layer for potential chill in fog
        if temp < 20:
            outfit['outerwear'].append('Light jacket')
        print("DEBUG: Fog condition detected")
    
    # Rainy weather - THIS IS THE KEY FIX
    elif "rain" in imgString or "drizzle" in imgString or "shower" in imgString:
        # OVERRIDE ALL OTHER RECOMMENDATIONS FOR RAIN
        outfit['outerwear'] = ['Waterproof rain jacket']  # Reset and set waterproof
        outfit['accessories'] = ['Umbrella']  # Reset and set umbrella
        outfit['footwear'] = 'Waterproof shoes or boots'  # Override footwear
        
        # Keep temperature-appropriate upper body but ensure it works with rain gear
        if temp > 25:
            outfit['upper_body'] = ['Quick-dry t-shirt', 'Moisture-wicking top']
        elif temp > 15:
            outfit['upper_body'] = ['Long-sleeve quick-dry shirt', 'Light sweater']
        else:
            outfit['upper_body'] = ['Thermal base layer', 'Wool sweater']
            
        # Adjust lower body for rain
        if "heavy" in imgString or "downpour" in imgString:
            outfit['lower_body'] = 'Waterproof trousers or quick-dry pants'
            condition_notes.append('Heavy rain - full waterproof gear essential')
        else:
            outfit['lower_body'] = 'Quick-dry trousers or jeans with waterproof overpants'
            condition_notes.append('Rain expected - waterproof protection needed')
        
        print("DEBUG: Rain condition detected - OVERRIDING OUTFIT")
    
    # Snowy weather
    elif "snow" in imgString or "sleet" in imgString:
        outfit['outerwear'] = ['Winter waterproof jacket']
        outfit['accessories'] = ['Winter gloves', 'Thermal hat', 'Neck warmer']
        outfit['footwear'] = 'Snow boots with good grip'
        outfit['lower_body'] = 'Thermal pants under waterproof trousers'
        condition_notes.append('Snow conditions - warm and waterproof gear essential')
        print("DEBUG: Snow condition detected")
    
    # Stormy weather
    elif "storm" in imgString or "thunder" in imgString or "lightning" in imgString:
        outfit['outerwear'] = ['Storm-proof jacket']
        outfit['accessories'] = ['Waterproof hat', 'Avoid metal accessories']
        outfit['footwear'] = 'Waterproof boots'
        condition_notes.append('Stormy weather - seek shelter if severe')
        print("DEBUG: Storm condition detected")
    
    # Sunny weather
    elif "sunny" in imgString or "sunshine" in imgString or "sun" in imgString:
        outfit['accessories'].append('Sunglasses')
        if temp > 20:
            outfit['accessories'].append('Sun hat or cap')
            outfit['upper_body'] = ['Light-colored t-shirt', 'Breathable shirt']  # Light colors for sun
        condition_notes.append('Sunny conditions - sun protection important')
        print("DEBUG: Sunny condition detected")
    
    else:
        condition_notes.append('General weather conditions')
        print(f"DEBUG: No specific condition matched: {imgString}")

    # Humidity adjustments
    humidity_notes = []
    if humidity > 80:
        # Filter for breathable fabrics only
        breathable_items = []
        for item in outfit['upper_body']:
            if any(fabric in item.lower() for fabric in ['cotton', 'linen', 'breathable', 'moisture', 'quick-dry']):
                breathable_items.append(item)
        if breathable_items:
            outfit['upper_body'] = breathable_items
        else:
            outfit['upper_body'] = ['Cotton t-shirt', 'Moisture-wicking top']
        humidity_notes.append('High humidity - breathable fabrics recommended')
        outfit['comfort_level'] += ', Humid'
    
    # Wind adjustments
    wind_notes = []
    if windspeed > 30:
        outfit['outerwear'].append('Windproof jacket')
        if 'hat' in str(outfit['accessories']):
            outfit['accessories'].append('Secure hat')
        wind_notes.append('Very windy - secure clothing')
        outfit['comfort_level'] += ', Windy'
    elif windspeed > 20:
        outfit['outerwear'].append('Windbreaker')
        wind_notes.append('Windy conditions')
        outfit['comfort_level'] += ', Breezy'

    # Build final notes
    all_notes = [base_note] + condition_notes + humidity_notes + wind_notes
    outfit['notes'] = ' | '.join(all_notes)

    # Remove duplicates
    outfit['upper_body'] = list(dict.fromkeys(outfit['upper_body']))
    outfit['accessories'] = list(dict.fromkeys(outfit['accessories']))
    outfit['outerwear'] = list(dict.fromkeys(outfit['outerwear']))
    
    # Final debug
    print(f"DEBUG: Final outfit - {outfit}")
    
    return outfit

@app.route('/api/weather', methods=['GET'])
def get_weather():
    """Get weather data and outfit suggestions using RapidAPI"""
    place = request.args.get('place', 'Kovilpatti, India')
    
    try:
        # RapidAPI endpoint for Visual Crossing Weather
        url = "https://visual-crossing-weather.p.rapidapi.com/forecast"
        
        querystring = {
            "aggregateHours": "24",
            "location": place,
            "contentType": "json",
            "unitGroup": "metric",
            "shortColumnNames": "0"
        }
        
        headers = {
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": RAPIDAPI_HOST
        }
        
        print(f"Making API request for location: {place}")
        print(f"Using API Key: {RAPIDAPI_KEY[:10]}...")  # Log first 10 chars for security
        
        response = requests.get(url, headers=headers, params=querystring, timeout=30)
        
        print(f"API Response Status: {response.status_code}")
        
        # Check if request was successful
        if response.status_code != 200:
            return jsonify({
                'error': f'Weather API returned status {response.status_code}',
                'details': response.text
            }), response.status_code
        
        weather_data = response.json()
        
        # Debug: Print the structure of the response
        print("Response keys:", list(weather_data.keys()))
        
        if 'locations' not in weather_data or not weather_data['locations']:
            return jsonify({'error': 'No location data found in response'}), 404
        
        # Get the first location from the response
        location_key = list(weather_data['locations'].keys())[0]
        location_data = weather_data['locations'][location_key]
        
        print("Location data keys:", list(location_data.keys()))
        
        # Extract current weather (first item in values array)
        if not location_data.get('values'):
            return jsonify({'error': 'No weather data available for this location'}), 404
            
        current_weather = location_data['values'][0]
        
        print("Current weather keys:", list(current_weather.keys()))
        
        # Map the data to our expected format
        weather_info = {
            'location': location_data.get('address', place),
            'temperature': current_weather.get('temp'),
            'conditions': current_weather.get('conditions', 'Unknown'),
            'humidity': current_weather.get('humidity'),
            'windspeed': current_weather.get('wspd'),
            'heatindex': current_weather.get('heatindex'),
            'forecast': location_data.get('values', [])[1:7]  # Next 6 periods
        }
        
        # Generate outfit suggestions
        outfit_suggestion = get_outfit_suggestion({
            'temp': current_weather.get('temp'),
            'conditions': current_weather.get('conditions', ''),
            'humidity': current_weather.get('humidity'),
            'windspeed': current_weather.get('wspd')
        })
        
        weather_info['outfit_suggestion'] = outfit_suggestion
        
        return jsonify(weather_info)
        
    except requests.exceptions.Timeout:
        return jsonify({'error': 'Weather API request timed out'}), 504
    except requests.exceptions.RequestException as e:
        return jsonify({'error': f'Weather API request failed: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy', 
        'message': 'Weather API is running',
        'api_key_set': bool(RAPIDAPI_KEY and RAPIDAPI_KEY != 'your_rapidapi_key_here')
    })

@app.route('/api/test-scenarios', methods=['GET'])
def test_scenarios():
    """Test endpoint with different weather scenarios"""
    scenarios = {
        'hot_humid': {
            'location': 'Mumbai, India',
            'temperature': 34,
            'conditions': 'Partly cloudy with high humidity',
            'humidity': 85,
            'windspeed': 8,
            'heatindex': 38,
            'scenario': 'Hot and Humid'
        },
        'cold_windy': {
            'location': 'Chicago, USA',
            'temperature': 2,
            'conditions': 'Windy with flurries',
            'humidity': 65,
            'windspeed': 28,
            'heatindex': -5,
            'scenario': 'Cold and Windy'
        },
        'rainy_mild': {
            'location': 'London, UK',
            'temperature': 12,
            'conditions': 'Light rain showers',
            'humidity': 90,
            'windspeed': 15,
            'heatindex': 11,
            'scenario': 'Rainy and Cool'
        },
        'perfect_spring': {
            'location': 'Paris, France',
            'temperature': 18,
            'conditions': 'Clear skies',
            'humidity': 55,
            'windspeed': 10,
            'heatindex': 18,
            'scenario': 'Perfect Spring Day'
        }
    }
    
    scenario_type = request.args.get('type', 'perfect_spring')
    weather_data = scenarios.get(scenario_type, scenarios['perfect_spring'])
    
    # Generate outfit suggestion
    outfit_suggestion = get_outfit_suggestion(weather_data)
    
    response = {**weather_data, 'outfit_suggestion': outfit_suggestion}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')