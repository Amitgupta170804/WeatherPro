import React, { useState, useEffect } from 'react';
import MainWeatherCard from './MainWeatherCard';
import WeatherMetrics from './WeatherMetrics';
import LocationSearch from './LocationSearch';
import HourlyForecast from './HourlyForecast';
import WeeklyForecast from './WeeklyForecast';
import { weatherData as defaultWeatherData } from '../data/weatherData';
import { getWeatherByCoordinates, getWeatherByLocation } from '../services/weatherService';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(defaultWeatherData);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);

  useEffect(() => {
    const loadDefaultWeather = async () => {
      setIsLoadingWeather(true);
      try {
        const data = await getWeatherByCoordinates(37.7749, -122.4194);
        setWeatherData(data);
      } catch (error) {
        console.error('Error loading default weather:', error);
      } finally {
        setIsLoadingWeather(false);
      }
    };
    loadDefaultWeather();
  }, []);

  const handleLocationSelect = async (location) => {
    setIsLoadingWeather(true);
    try {
      const newWeatherData = await getWeatherByLocation(location);
      setWeatherData(newWeatherData);
    } catch (error) {
      console.error('Error fetching weather for location:', error);
      alert('Unable to fetch weather data for this location. Please try again.');
    } finally {
      setIsLoadingWeather(false);
    }
  };

  const handleCurrentLocation = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            setIsLoadingWeather(true);
            const currentLocationData = await getWeatherByCoordinates(latitude, longitude);
            setWeatherData(currentLocationData);
          } catch (error) {
            console.error('Error fetching weather for current location:', error);
            alert('Unable to fetch weather data for your location. Please try again.');
          } finally {
            setIsLoadingWeather(false);
            setIsLoadingLocation(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          let errorMessage = 'Unable to get your current location. ';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage += 'Please allow location access in your browser settings.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage += 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage += 'Location request timed out.';
              break;
            default:
              errorMessage += 'An unknown error occurred.';
              break;
          }
          alert(errorMessage);
          setIsLoadingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setIsLoadingLocation(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 animate-pulse">
            WeatherPro
          </h1>
          <p className="text-blue-200 text-xl font-light tracking-wide">
            Your complete weather companion ✨
          </p>
          <div className="mt-4 w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"></div>
        </div>
        <LocationSearch 
          onLocationSelect={handleLocationSelect}
          onCurrentLocation={handleCurrentLocation}
          isLoadingLocation={isLoadingLocation}
        />
        {isLoadingWeather && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 text-blue-200">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
              <span>Loading weather data...</span>
            </div>
          </div>
        )}
        <MainWeatherCard data={weatherData} />
        <WeatherMetrics data={weatherData} />
        <HourlyForecast hourly={weatherData.hourly} />
        <WeeklyForecast daily={weatherData.daily} />
        <div className="text-center mt-12">
          <p className="text-blue-300 text-sm">
            Last updated: {new Date().toLocaleString()}
          </p>
          <p className="text-blue-400 text-xs mt-1">
            Weather data provided by OpenWeatherMap
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard; 