import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TokenCard from "@/components/tokens/TokenCard";
import { Search as SearchIcon, Filter, TrendingUp, Clock, Zap } from "lucide-react";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search results - replace with real API
  const mockResults = [
    {
      name: "DogeCoin Jr",
      symbol: "DOGEJR", 
      price: 0.000123,
      change24h: 156.7,
      volume24h: 2400000,
      marketCap: 12000000,
      image: "",
      isNew: true,
      isTrending: true,
      confidence: 95,
    },
    {
      name: "Doge Supreme",
      symbol: "DOGES",
      price: 0.000089,
      change24h: 45.2,
      volume24h: 890000,
      marketCap: 5600000,
      image: "",
      isNew: false,
      isTrending: false,
      confidence: 78,
    },
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 500);
  };

  const quickFilters = [
    { label: "Trending", icon: TrendingUp, color: "text-neon-lime" },
    { label: "New", icon: Zap, color: "text-neon-magenta" },
    { label: "Recent", icon: Clock, color: "text-neon-cyan" },
  ];

  return (
    <div className="min-h-screen bg-terminal-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="font-orbitron text-3xl font-black mb-4">
            <span className="neon-text">SEARCH</span>
            <span className="text-neon-cyan ml-4">TOKENS</span>
          </h1>
          <p className="text-muted-foreground">
            Find the next moonshot. Search by name, symbol, or contract address.
          </p>
        </div>

        {/* Command Palette Style Search */}
        <Card className="bg-terminal-surface border-terminal mb-8 max-w-2xl mx-auto">
          <CardContent className="p-6">
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search tokens, symbols, addresses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="bg-terminal-bg border-terminal hover-glow pl-12 font-mono text-lg h-12"
                />
              </div>
              <Button 
                onClick={handleSearch}
                size="lg"
                className="bg-neon-lime text-terminal-bg hover:bg-neon-gold font-orbitron"
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </div>
            
            {/* Quick Filters */}
            <div className="flex items-center justify-center space-x-4 mt-6">
              <span className="text-sm text-muted-foreground">Quick filters:</span>
              {quickFilters.map((filter, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className={`${filter.color} hover:bg-terminal-bg`}
                >
                  <filter.icon className="h-4 w-4 mr-1" />
                  {filter.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-orbitron text-xl font-bold text-foreground">
                Search Results ({searchResults.length})
              </h2>
              <Button variant="ghost" size="sm" className="text-neon-cyan">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((token, index) => (
                <div key={index} className="relative">
                  <TokenCard {...token} />
                  {/* Confidence Score for Fuzzy Matches */}
                  {token.confidence < 90 && (
                    <Badge className="absolute -top-2 -right-2 bg-warning text-terminal-bg text-xs">
                      {token.confidence}% match
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results State */}
        {searchQuery && searchResults.length === 0 && !isSearching && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-orbitron text-xl font-bold mb-2">No tokens found</h3>
            <p className="text-muted-foreground mb-6">
              Try searching with different keywords or check the spelling.
            </p>
            <Button variant="outline" className="border-neon-cyan text-neon-cyan hover-glow">
              Browse Trending Tokens
            </Button>
          </div>
        )}

        {/* Empty State - No Search Yet */}
        {!searchQuery && searchResults.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">⚡</div>
            <h3 className="font-orbitron text-xl font-bold mb-2">Discover Tokens</h3>
            <p className="text-muted-foreground mb-6">
              Search for any token by name, symbol, or contract address.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {["DOGEJR", "PEPE", "BONK", "WIF"].map((symbol) => (
                <Badge
                  key={symbol}
                  className="bg-terminal-surface text-neon-cyan cursor-pointer hover-glow"
                  onClick={() => setSearchQuery(symbol)}
                >
                  Try: {symbol}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}