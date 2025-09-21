import { Search, Wallet, TrendingUp, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletBalance] = useState("124.53");

  const connectWallet = () => {
    setIsWalletConnected(true);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-terminal bg-terminal-bg/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-2xl font-orbitron font-black neon-text">
            TRIGGER
          </div>
          <div className="text-xs text-neon-cyan">v2.0</div>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tokens... (⌘K)"
              className="w-full bg-terminal-surface border-terminal hover-glow pl-10 font-mono"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-4">
          <Link to="/trending">
            <Button variant="ghost" size="sm" className="text-neon-cyan hover:text-neon-lime">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </Button>
          </Link>
          
          <Link to="/create">
            <Button variant="ghost" size="sm" className="text-neon-magenta hover:text-neon-lime">
              <Plus className="h-4 w-4 mr-2" />
              Create
            </Button>
          </Link>

          {/* Wallet Connection */}
          {isWalletConnected ? (
            <div className="flex items-center space-x-2">
              <div className="text-sm font-mono text-neon-gold">
                {walletBalance} SOL
              </div>
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="text-neon-lime">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
            </div>
          ) : (
            <Button 
              onClick={connectWallet}
              variant="outline" 
              size="sm" 
              className="border-neon-lime text-neon-lime hover-glow"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}