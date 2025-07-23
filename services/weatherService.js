import axios from 'axios';

const API_KEY = 'b179b451582b806c6d89b4c25bb7068f'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// LocationSuggestion is now just a plain object
// Convert OpenWeatherMap condition to our app's condition format
const mapWeatherCondition = (weatherMain, weatherDescription) => {
  const main = weatherMain.toLowerCase();
  const description = weatherDescription.toLowerCase();
  if (main === 'clear') return 'Sunny';
  if (main === 'clouds') {
    if (description.includes('few') || description.includes('scattered')) return 'Partly Cloudy';
    return 'Cloudy';
  }
  if (main === 'rain') {
    if (description.includes('drizzle')) return 'Drizzle';
    return 'Rainy';
  }
  if (main === 'snow') return 'Snow';
  if (main === 'thunderstorm') return 'Thunderstorm';
  if (main === 'drizzle') return 'Drizzle';
  return weatherDescription;
};

const getWindDirection = (degrees) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

const formatTime = (timestamp, timezone) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  });
};

export const searchLocations = async (query) => {
  try {
    if (query.length < 2) return [];
    if (API_KEY === 'DEMO_KEY') {
      return getMockLocations(query);
    }
    const response = await axios.get(`${GEO_URL}/direct`, {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY
      }
    });
    return response.data.map((location) => ({
      city: location.name,
      country: location.country,
      state: location.state,
      lat: location.lat,
      lon: location.lon
    }));
  } catch (error) {
    console.error('Error searching locations:', error);
    return getMockLocations(query);
  }
};

export const getWeatherByCoordinates = async (lat, lon) => {
  try {
    if (API_KEY === 'DEMO_KEY') {
      return getMockWeatherData(lat, lon);
    }
    const currentResponse = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric'
      }
    });
    const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric'
      }
    });
    const oneCallResponse = await axios.get(`${BASE_URL}/onecall`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
        exclude: 'minutely,alerts'
      }
    }).catch(() => null);
    const current = currentResponse.data;
    const forecast = forecastResponse.data;
    const oneCall = oneCallResponse?.data;
    const todayForecasts = forecast.list.slice(0, 8);
    const temperatures = todayForecasts.map((item) => item.main.temp);
    const high = Math.max(...temperatures);
    const low = Math.min(...temperatures);

    // Format hourly forecast (next 12 hours)
    let hourly = [];
    if (oneCall?.hourly) {
      hourly = oneCall.hourly.slice(0, 12).map((h) => ({
        dt: h.dt,
        time: new Date(h.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
        temp: Math.round(h.temp),
        icon: h.weather?.[0]?.main || '',
        description: h.weather?.[0]?.description || '',
      }));
    } else if (forecast?.list) {
      hourly = forecast.list.slice(0, 12).map((h) => ({
        dt: h.dt,
        time: new Date(h.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
        temp: Math.round(h.main.temp),
        icon: h.weather?.[0]?.main || '',
        description: h.weather?.[0]?.description || '',
      }));
    }

    // Format daily forecast (next 7 days)
    let daily = [];
    if (oneCall?.daily) {
      daily = oneCall.daily.slice(0, 7).map((d) => ({
        dt: d.dt,
        day: new Date(d.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
        temp: {
          min: Math.round(d.temp.min),
          max: Math.round(d.temp.max)
        },
        icon: d.weather?.[0]?.main || '',
        description: d.weather?.[0]?.description || '',
      }));
    }

    return {
      location: {
        city: current.name,
        country: current.sys.country,
        coordinates: {
          lat: current.coord.lat,
          lon: current.coord.lon
        }
      },
      current: {
        temperature: Math.round(current.main.temp),
        feelsLike: Math.round(current.main.feels_like),
        condition: mapWeatherCondition(current.weather[0].main, current.weather[0].description),
        high: Math.round(high),
        low: Math.round(low),
        sunrise: formatTime(current.sys.sunrise, current.timezone),
        sunset: formatTime(current.sys.sunset, current.timezone)
      },
      metrics: {
        humidity: current.main.humidity,
        windSpeed: Math.round(current.wind.speed * 3.6),
        windDirection: getWindDirection(current.wind.deg || 0),
        windGust: current.wind.gust ? Math.round(current.wind.gust * 3.6) : Math.round(current.wind.speed * 3.6 * 1.5),
        pressure: current.main.pressure,
        visibility: Math.round((current.visibility || 10000) / 1000),
        uvIndex: oneCall?.current?.uvi ? Math.round(oneCall.current.uvi) : 5,
        dewPoint: Math.round(current.main.temp - ((100 - current.main.humidity) / 5)),
        chanceOfRain: forecast.list[0]?.pop ? Math.round(forecast.list[0].pop * 100) : 0
      },
      hourly,
      daily
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    console.log('Falling back to mock data. To use real weather data, get an API key from https://openweathermap.org/api');
    return getMockWeatherData(lat, lon);
  }
};

export const getWeatherByLocation = async (location) => {
  return getWeatherByCoordinates(location.lat, location.lon);
};

const getMockLocations = (query) => {
  const mockLocations = [
    { city: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
    { city: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
    { city: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 },
    { city: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
    { city: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093 },
    { city: 'Dubai', country: 'AE', lat: 25.2048, lon: 55.2708 },
    { city: 'Mumbai', country: 'IN', lat: 19.0760, lon: 72.8777 },
    { city: 'Singapore', country: 'SG', lat: 1.3521, lon: 103.8198 },
    { city: 'Los Angeles', country: 'US', lat: 34.0522, lon: -118.2437 },
    { city: 'Berlin', country: 'DE', lat: 52.5200, lon: 13.4050 }
  ];
  return mockLocations.filter(location =>
    location.city.toLowerCase().includes(query.toLowerCase()) ||
    location.country.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);
};

const getMockWeatherData = (lat, lon) => {
  const cities = [
    { name: 'New York', lat: 40.7128, lon: -74.0060, temp: 18, condition: 'Partly Cloudy' },
    { name: 'London', lat: 51.5074, lon: -0.1278, temp: 12, condition: 'Cloudy' },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503, temp: 24, condition: 'Sunny' },
    { name: 'Paris', lat: 48.8566, lon: 2.3522, temp: 16, condition: 'Rainy' },
    { name: 'Sydney', lat: -33.8688, lon: 151.2093, temp: 22, condition: 'Sunny' }
  ];
  const closest = cities.reduce((prev, curr) => {
    const prevDist = Math.abs(prev.lat - lat) + Math.abs(prev.lon - lon);
    const currDist = Math.abs(curr.lat - lat) + Math.abs(curr.lon - lon);
    return currDist < prevDist ? curr : prev;
  });
  return {
    location: {
      city: closest.name,
      country: 'Demo',
      coordinates: { lat, lon }
    },
    current: {
      temperature: closest.temp,
      feelsLike: closest.temp + 2,
      condition: closest.condition,
      high: closest.temp + 4,
      low: closest.temp - 6,
      sunrise: '6:42 AM',
      sunset: '7:28 PM'
    },
    metrics: {
      humidity: 65,
      windSpeed: 12,
      windDirection: 'NW',
      windGust: 18,
      pressure: 1015,
      visibility: 16,
      uvIndex: 6,
      dewPoint: 16,
      chanceOfRain: 25
    }
  };
}; 