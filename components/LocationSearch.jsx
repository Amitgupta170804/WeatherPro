import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Loader2, Navigation } from 'lucide-react';
import { searchLocations } from '../services/weatherService';

const LocationSearch = ({ onLocationSelect, onCurrentLocation, isLoadingLocation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const searchTimeoutRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setIsSearching(true);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await searchLocations(query);
        setSuggestions(results);
        setShowSuggestions(true);
      } catch (error) {
        console.error('Search error:', error);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);
  };

  const handleLocationSelect = (location) => {
    const displayName = location.state 
      ? `${location.city}, ${location.state}, ${location.country}`
      : `${location.city}, ${location.country}`;
    setSearchQuery(displayName);
    setShowSuggestions(false);
    onLocationSelect(location);
  };

  const handleCurrentLocation = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    onCurrentLocation();
  };

  return (
    <div className="relative mb-8" ref={searchRef}>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-300 drop-shadow-lg" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
              placeholder="Search for a city..."
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl text-white placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/60 focus:bg-white/15 transition-all duration-300 hover:bg-white/15 hover:border-white/40 shadow-xl hover:shadow-2xl"
            />
            {isSearching && (
              <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-300 animate-spin drop-shadow-lg" />
            )}
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
              {suggestions.map((location, index) => (
                <button
                  key={index}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-200 flex items-center space-x-3 text-white border-b border-white/10 last:border-b-0 hover:scale-[1.02] transform"
                >
                  <MapPin className="w-4 h-4 text-cyan-300 flex-shrink-0 drop-shadow-lg" />
                  <div>
                    <div className="font-medium">{location.city}</div>
                    <div className="text-sm text-blue-300">
                      {location.state ? `${location.state}, ${location.country}` : location.country}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={handleCurrentLocation}
          disabled={isLoadingLocation}
          className="px-6 py-4 bg-gradient-to-r from-emerald-500/40 to-teal-500/40 hover:from-emerald-400/60 hover:to-teal-400/60 backdrop-blur-xl border border-emerald-400/40 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg hover:border-emerald-300/60"
        >
          {isLoadingLocation ? (
            <Loader2 className="w-5 h-5 animate-spin drop-shadow-lg" />
          ) : (
            <Navigation className="w-5 h-5 drop-shadow-lg" />
          )}
          <span className="hidden sm:inline">
            {isLoadingLocation ? 'Locating...' : 'Current Location'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default LocationSearch; 