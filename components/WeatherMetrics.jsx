import React from 'react';
import MetricCard from './MetricCard';
import { 
  Droplets, 
  Wind, 
  Gauge, 
  Eye, 
  Sun, 
  Thermometer,
  Navigation,
  CloudRain
} from 'lucide-react';

const WeatherMetrics = ({ data }) => {
  const metrics = [
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${data.metrics.humidity}%`,
      description: data.metrics.humidity > 70 ? 'High humidity' : data.metrics.humidity > 40 ? 'Comfortable' : 'Low humidity',
      gradient: 'from-blue-500/30 to-cyan-500/20'
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${data.metrics.windSpeed} mph`,
      description: `${data.metrics.windDirection} direction`,
      gradient: 'from-green-500/30 to-teal-500/20'
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${data.metrics.pressure} hPa`,
      description: data.metrics.pressure > 1013 ? 'High pressure' : 'Low pressure',
      gradient: 'from-purple-500/30 to-pink-500/20'
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${data.metrics.visibility} km`,
      description: data.metrics.visibility > 10 ? 'Excellent' : data.metrics.visibility > 5 ? 'Good' : 'Poor',
      gradient: 'from-orange-500/30 to-red-500/20'
    },
    {
      icon: Sun,
      label: 'UV Index',
      value: data.metrics.uvIndex.toString(),
      description: data.metrics.uvIndex > 7 ? 'Very high' : data.metrics.uvIndex > 5 ? 'High' : data.metrics.uvIndex > 2 ? 'Moderate' : 'Low',
      gradient: 'from-yellow-500/30 to-orange-500/20'
    },
    {
      icon: Thermometer,
      label: 'Dew Point',
      value: `${data.metrics.dewPoint}\u00b0`,
      description: data.metrics.dewPoint > 20 ? 'Muggy' : data.metrics.dewPoint > 15 ? 'Comfortable' : 'Dry',
      gradient: 'from-red-500/30 to-pink-500/20'
    },
    {
      icon: Navigation,
      label: 'Wind Gust',
      value: `${data.metrics.windGust} mph`,
      description: 'Peak wind speed',
      gradient: 'from-indigo-500/30 to-blue-500/20'
    },
    {
      icon: CloudRain,
      label: 'Chance of Rain',
      value: `${data.metrics.chanceOfRain}%`,
      description: data.metrics.chanceOfRain > 70 ? 'Likely' : data.metrics.chanceOfRain > 30 ? 'Possible' : 'Unlikely',
      gradient: 'from-slate-500/30 to-gray-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          icon={metric.icon}
          label={metric.label}
          value={metric.value}
          description={metric.description}
          gradient={metric.gradient}
        />
      ))}
    </div>
  );
};

export default WeatherMetrics; 