import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

const MetricCard = ({ icon: Icon, label, value, description, gradient }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-white/30 hover:rotate-1" style={{boxShadow: '0 4px 24px 0 rgba(31, 38, 135, 0.18)'}}>
      {/* Glassmorphism overlay */}
      <div className={`absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-2xl pointer-events-none`}></div>
      {/* Animated icon with gentle float */}
      <div className="relative p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <Icon className="w-8 h-8 text-white/80 group-hover:text-white transition-all duration-500 drop-shadow-lg group-hover:scale-110 group-hover:rotate-12 animate-metric-float" />
          <div className="text-right">
            <p className="text-2xl font-bold text-white leading-none drop-shadow-lg group-hover:scale-110 transition-transform duration-500">
              {value}
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-white/90 font-semibold text-sm uppercase tracking-wider mb-1 group-hover:text-white transition-colors duration-500">
            {label}
          </h3>
          <p className="text-white/70 text-xs group-hover:text-white/80 transition-colors duration-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetricCard; 