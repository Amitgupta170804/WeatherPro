import React from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, Zap, CloudDrizzle } from 'lucide-react';

const iconMap = {
  'Sunny': Sun,
  'Clear': Sun,
  'Cloudy': Cloud,
  'Partly Cloudy': Cloud,
  'Rainy': CloudRain,
  'Drizzle': CloudDrizzle,
  'Snow': CloudSnow,
  'Thunderstorm': Zap,
};

function getWeatherIcon(condition) {
  const Icon = iconMap[condition] || Sun;
  return <Icon className="w-8 h-8 text-white drop-shadow-lg" />;
}

const HourlyForecast = ({ hourly }) => {
  if (!hourly || hourly.length === 0) return null;
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-white mb-4 ml-2">Hourly Forecast</h2>
      <div className="flex overflow-x-auto gap-4 pb-2 px-1 scrollbar-thin scrollbar-thumb-blue-400/30 scrollbar-track-transparent">
        {hourly.map((h, idx) => (
          <div
            key={h.dt || idx}
            className="flex flex-col items-center min-w-[80px] bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/20 hover:scale-105 transition-transform duration-300 hover:border-white/40"
            style={{boxShadow: '0 2px 12px 0 rgba(31,38,135,0.12)'}}
          >
            <span className="text-blue-200 text-xs mb-2">{h.time}</span>
            {getWeatherIcon(h.icon)}
            <span className="text-white text-lg font-bold mt-2">{h.temp}&deg;C</span>
            <span className="text-blue-300 text-xs mt-1 capitalize">{h.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast; 