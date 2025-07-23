import React from 'react';
import WeatherDashboard from './components/WeatherDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Radial gradient background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-cyan-400/25 via-blue-500/15 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-radial from-purple-400/25 via-pink-500/15 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-radial from-indigo-400/20 via-violet-500/10 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-radial from-emerald-400/20 via-teal-500/10 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-radial from-orange-400/20 via-red-500/10 to-transparent rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-blue-300/30 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-purple-300/25 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute top-3/4 left-2/3 w-1 h-1 bg-cyan-300/30 rounded-full animate-bounce" style={{animationDelay: '3s', animationDuration: '3.5s'}}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <WeatherDashboard />
      </div>
    </div>
  );
}

export default App; 