import React from 'react';
import { 
  MapPin, 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Zap,
  CloudDrizzle
} from 'lucide-react';

const MainWeatherCard = ({ data }) => {
  // Add a subtle animation class to the weather icon
  const getWeatherIcon = (condition) => {
    const iconClass = "w-24 h-24 text-white drop-shadow-lg transition-transform duration-700 ease-in-out animate-weather-bounce";
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <Sun className={iconClass} />;
      case 'cloudy':
      case 'partly cloudy':
        return <Cloud className={iconClass} />;
      case 'rainy':
        return <CloudRain className={iconClass} />;
      case 'drizzle':
        return <CloudDrizzle className={iconClass} />;
      case 'snow':
        return <CloudSnow className={iconClass} />;
      case 'thunderstorm':
        return <Zap className={iconClass} />;
      default:
        return <Sun className={iconClass} />;
    }
  };

  // Dynamic background gradient based on weather
  const getBgGradient = () => {
    const cond = data.current.condition.toLowerCase();
    if (cond.includes('sun')) return 'from-yellow-400/60 via-orange-400/40 to-pink-500/30';
    if (cond.includes('cloud')) return 'from-blue-400/60 via-purple-400/40 to-slate-700/30';
    if (cond.includes('rain')) return 'from-blue-700/60 via-cyan-500/40 to-blue-300/30';
    if (cond.includes('snow')) return 'from-blue-200/60 via-white/40 to-blue-400/30';
    if (cond.includes('thunder')) return 'from-indigo-700/60 via-purple-700/40 to-yellow-400/30';
    return 'from-blue-600/40 to-purple-600/30';
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${getBgGradient()} backdrop-blur-2xl border border-white/30 shadow-2xl mb-8 hover:shadow-3xl transition-all duration-500 hover:scale-[1.03] group`} style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'}}>
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-3xl pointer-events-none"></div>
      {/* Animated background elements */}
      <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-radial from-cyan-400/20 to-transparent rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-radial from-purple-400/20 to-transparent rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="relative p-8 md:p-12 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start mb-2">
              <MapPin className="w-5 h-5 text-cyan-300 mr-2 drop-shadow-lg" />
              <span className="text-blue-100 text-lg font-semibold tracking-wide">
                {data.location.city}, {data.location.country}
              </span>
            </div>
            <p className="text-blue-200 text-sm opacity-90 font-light">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex items-center space-x-8">
            <div className="text-center">
              {getWeatherIcon(data.current.condition)}
              <p className="text-white text-xl font-semibold mt-2 capitalize tracking-wide drop-shadow-lg">
                {data.current.condition}
              </p>
            </div>
            <div className="text-right">
              <div className="text-7xl md:text-8xl font-light text-white leading-none drop-shadow-2xl">
                {Math.round(data.current.temperature)}&nbsp;°C
              </div>
              <p className="text-blue-200 text-lg mt-2 font-medium">
                Feels like {Math.round(data.current.feelsLike)}&nbsp;°C
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-white/20">
          <div className="text-center">
            <p className="text-cyan-300 text-sm font-semibold uppercase tracking-wider">High</p>
            <p className="text-white text-2xl font-bold drop-shadow-lg">{data.current.high}&nbsp;°C</p>
          </div>
          <div className="text-center">
            <p className="text-cyan-300 text-sm font-semibold uppercase tracking-wider">Low</p>
            <p className="text-white text-2xl font-bold drop-shadow-lg">{data.current.low}&nbsp;°C</p>
          </div>
          <div className="text-center">
            <p className="text-cyan-300 text-sm font-semibold uppercase tracking-wider">Sunrise</p>
            <p className="text-white text-lg font-semibold drop-shadow-lg">{data.current.sunrise}</p>
          </div>
          <div className="text-center">
            <p className="text-cyan-300 text-sm font-semibold uppercase tracking-wider">Sunset</p>
            <p className="text-white text-lg font-semibold drop-shadow-lg">{data.current.sunset}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainWeatherCard; 