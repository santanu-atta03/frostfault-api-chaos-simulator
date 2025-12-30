import { Link, useLocation } from "react-router-dom";
import { Activity, Layers, Plus, FileText, Zap } from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
 const navItems = [
  { path: "/", label: "Dashboard", icon: Activity },
  { path: "/mock-apis", label: "Mock APIs", icon: Layers },

  // REST
  { path: "/create", label: "Create REST", icon: Plus },

  // GRAPHQL
  { path: "/mock/create-graphql", label: "Create GraphQL", icon: Zap },

  { path: "/logs", label: "Logs", icon: FileText }
];

  
  return (
    <nav className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          {/* Logo/Brand & Status - Horizontal on mobile */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 blur-lg opacity-50 rounded-full"></div>
                <div className="relative bg-linear-to-br from-purple-500 to-pink-500 p-1.5 sm:p-2 rounded-lg">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  API Chaos
                </h1>
                <p className="text-xs text-slate-400 hidden sm:block">Engineering Simulator</p>
              </div>
            </div>
            
            {/* Status Indicator - Mobile position */}
            <div className="flex sm:hidden items-center gap-2 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 font-medium">Live</span>
            </div>
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
          
          {/* Status Indicator - Desktop position */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-medium">Live</span>
          </div>
        </div>
      </div>
    </nav>
  );
}