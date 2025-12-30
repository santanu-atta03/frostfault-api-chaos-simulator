import { Link, useLocation } from "react-router-dom";
import { Activity, Layers, Plus, FileText, Zap } from "lucide-react";
import logo from "../assets/frostfaultlogo.png"

// Logo component - without background
const Logo = ({ src }) => (
  <div className="flex items-center gap-2 sm:gap-3">
    <img 
      src={src} 
      alt="FrostFault Logo" 
      className="w-8 h-8 sm:w-10 sm:h-10"
    />
    <div className="flex items-center space-x-4">
        <div className="relative w-14 h-14 group">
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-300 animate-pulse"></div>
          
          {/* Hexagonal frost crystal shape */}
          <svg viewBox="0 0 100 100" className="w-14 h-14 relative z-10 drop-shadow-2xl">
            <defs>
              <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
                <stop offset="50%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Hexagon background */}
            <polygon 
              points="50,10 85,30 85,70 50,90 15,70 15,30" 
              fill="url(#logoGrad)"
              opacity="0.9"
            />
            
            {/* Frost crystal pattern */}
            <g stroke="white" strokeWidth="3" fill="none" filter="url(#glow)">
              <line x1="50" y1="25" x2="50" y2="75" />
              <line x1="30" y1="37.5" x2="70" y2="62.5" />
              <line x1="30" y1="62.5" x2="70" y2="37.5" />
            </g>
            
            {/* Lightning bolt for chaos */}
            <path 
              d="M 55 30 L 45 50 L 52 50 L 48 70 L 60 48 L 53 48 Z" 
              fill="#fbbf24"
              stroke="#f59e0b"
              strokeWidth="1"
              filter="url(#glow)"
            />
            
            {/* Corner ice shards */}
            <circle cx="50" cy="20" r="3" fill="#60a5fa" opacity="0.8"/>
            <circle cx="75" cy="35" r="2" fill="#60a5fa" opacity="0.6"/>
            <circle cx="75" cy="65" r="2" fill="#60a5fa" opacity="0.6"/>
            <circle cx="50" cy="80" r="3" fill="#60a5fa" opacity="0.8"/>
            <circle cx="25" cy="65" r="2" fill="#60a5fa" opacity="0.6"/>
            <circle cx="25" cy="35" r="2" fill="#60a5fa" opacity="0.6"/>
          </svg>
        </div>
        
        <div className="relative">
          {/* Main title with advanced styling */}
          <h1 className="text-3xl font-black tracking-tight relative group cursor-default">
            {/* Text shadow/glow layer */}
            <span className="absolute inset-0 bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent blur-sm opacity-70">
              FrostFault
            </span>
            {/* Main text with gradient */}
            <span className="relative bg-linear-to-r from-cyan-300 via-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
              Frost<span className="bg-linear-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">Fault</span>
            </span>
            {/* Animated underline */}
            <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
          </h1>
          
          {/* Subtitle with enhanced styling */}
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-yellow-400 animate-pulse" />
              <p className="text-xs font-bold text-gray-300 tracking-widest uppercase">
                Api Chaos
              </p>
            </div>
            <span className="w-1 h-1 rounded-full bg-purple-500"></span>
            <p className="text-xs font-semibold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider">
              SIMULATOR
            </p>
          </div>
          
          {/* Status badge */}
          <div className="absolute -top-2 -right-20 px-2 py-0.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold text-green-300 tracking-wide">LIVE</span>
          </div>
        </div>
      </div>
  </div>
);


export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const navItems = [
    { path: "/", label: "Dashboard", icon: Activity },
    { path: "/mock-apis", label: "Mock APIs", icon: Layers },
    { path: "/create", label: "Create REST", icon: Plus },
    { path: "/mock/create-graphql", label: "Create GraphQL", icon: Zap },
    { path: "/logs", label: "Logs", icon: FileText }
  ];
  
  return (
    <nav className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          {/* Logo/Brand & Status - Horizontal on mobile */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <Logo src={logo} />
          </div>
          
          {/* Navigation Links - Scrollable on mobile */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full sm:w-auto scrollbar-hide pb-1 sm:pb-0">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`
                  flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium text-xs sm:text-sm
                  transition-all duration-200 ease-in-out relative whitespace-nowrap shrink-0
                  ${isActive(path)
                    ? "bg-purple-500/20 text-purple-300 shadow-lg shadow-purple-500/20 border border-purple-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  }
                `}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2} />
                <span className="hidden xs:inline sm:inline">{label}</span>
              </Link>
            ))}
          </div>
          
        </div>
      </div>
    </nav>
  );
}