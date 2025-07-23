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
  return <Icon className="w-7 h-7 text-white drop-shadow-lg" />;
}

const WeeklyForecast = ({ daily }) => {
  if (!daily || daily.length === 0) return null;
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold text-white mb-4 ml-2">7-Day Forecast</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
        {daily.map((d, idx) => (
          <div
            key={d.dt || idx}
            className="flex flex-col items-center bg-white/10 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/20 hover:scale-105 transition-transform duration-300 hover:border-white/40"
            style={{boxShadow: '0 2px 12px 0 rgba(31,38,135,0.12)'}}
          >
            <span className="text-blue-200 text-sm mb-1 font-semibold">{d.day}</span>
            {getWeatherIcon(d.icon)}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-white text-lg font-bold">{d.temp.max}&deg;C</span>
              <span className="text-blue-300 text-sm">/ {d.temp.min}&deg;C</span>
            </div>
            <span className="text-blue-300 text-xs mt-1 capitalize text-center">{d.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast; 