// src/pages/HeroPage.jsx
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Example flag URLs (swap/add as you like)
const flagSets = [
  [
    "https://flagcdn.com/w320/us.png",
    "https://flagcdn.com/w320/gb.png",
    "https://flagcdn.com/w320/fr.png"
  ],
  [
    "https://flagcdn.com/w320/jp.png",
    "https://flagcdn.com/w320/br.png",
    "https://flagcdn.com/w320/za.png"
  ],
  [
    "https://flagcdn.com/w320/ca.png",
    "https://flagcdn.com/w320/in.png",
    "https://flagcdn.com/w320/au.png"
  ]
];

const HeroPage = () => {
  const navigate = useNavigate();
  const [setIndex, setSetIndex] = useState(0);

  // Cycle flag sets every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSetIndex((prev) => (prev + 1) % flagSets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleExplore = () => {
    navigate('/home');
  };

  // Current flags to display
  const flags = flagSets[setIndex];

  // Background image for hero section
  const bgImage =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-purple-900/80 z-0" />

      <div className="relative z-10 max-w-4xl mx-auto animate-fadeIn">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg text-white">
          Discover Our World
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">
          Explore every country's culture, geography, and statistics
        </p>
        <div className="flex justify-center space-x-4 mb-8">
          {flags.map((flag, idx) => (
            <div
              key={idx}
              className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center shadow-xl overflow-hidden border-4 border-white"
            >
              <img
                src={flag}
                alt="Country flag"
                className="w-20 h-20 object-cover rounded-full"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleExplore}
          className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full shadow-lg transition-colors duration-200"
        >
          🌍 Explore Countries
        </button>
      </div>
    </div>
  );
};

export default HeroPage;
