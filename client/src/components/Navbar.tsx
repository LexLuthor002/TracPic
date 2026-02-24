import { Link } from "wouter";
import { Search, Wallet, MessageSquare } from "lucide-react";
import logo from "@assets/images_-_2026-02-24T174110.730_1771957584430.jpeg";
import { useState } from "react";

interface NavbarProps {
  onOpenChat: () => void;
}

export function Navbar({ onOpenChat }: NavbarProps) {
  const [isConnected, setIsConnected] = useState(false);
  const dummyAddress = "trac...42x9";

  return (
    <nav className="fixed top-0 inset-x-0 z-50 glass-panel border-b-0 border-white/5 h-20 flex items-center px-6 lg:px-12">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors">
            <img src={logo} alt="TRAC Gaming Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-display font-bold text-xl tracking-wide hidden sm:block">
            Trac<span className="text-primary">Pic</span>
          </span>
        </Link>

        {/* Search Bar - hidden on small screens */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative">
          <Search className="absolute left-4 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search NFTs, collections..." 
            className="w-full bg-black/40 border border-white/10 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
          />
        </div>

        {/* Nav Actions */}
        <div className="flex items-center gap-4">
          <Link href="/explore" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors hidden sm:block">
            Explore
          </Link>
          <Link href="/collections" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors hidden sm:block">
            Collections
          </Link>
          <Link href="/stats" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors hidden sm:block">
            Stats
          </Link>
          
          <button 
            onClick={onOpenChat}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all relative group"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-primary rounded-full border-2 border-[#09090b]"></span>
          </button>

          <button 
            onClick={() => setIsConnected(!isConnected)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-semibold text-sm transition-all ${
              isConnected 
                ? "bg-primary text-white shadow-[0_0_20px_rgba(255,51,102,0.3)]" 
                : "bg-[#ff4d6d] text-white hover:bg-[#ff4d6d]/90"
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>{isConnected ? dummyAddress : "Connect"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
