import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TokenCard from "@/components/tokens/TokenCard";
import { TrendingUp, Zap, Star, Activity } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("trending");

  // Mock data - replace with real API calls
  const mockTokens = [
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
    },
    {
      name: "Pepe Rocket",
      symbol: "PEPERKT",
      price: 0.000456,
      change24h: -23.4,
      volume24h: 890000,
      marketCap: 8500000,
      image: "",
      isNew: false,
      isTrending: true,
    },
    {
      name: "Moon Lambo",
      symbol: "MLAMBO",
      price: 0.001234,
      change24h: 89.2,
      volume24h: 1200000,
      marketCap: 15000000,
      image: "",
      isNew: true,
      isTrending: false,
    },
  ];

  return (
    <div className="min-h-screen bg-terminal-bg">
      {/* Market Stats Bar */}
      <div className="bg-terminal-surface border-b border-terminal">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="text-sm">
                <span className="text-muted-foreground">Total Market Cap: </span>
                <span className="font-mono text-neon-gold">$2.4B</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">24h Volume: </span>
                <span className="font-mono text-neon-cyan">$156M</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Active Tokens: </span>
                <span className="font-mono text-neon-lime">1,247</span>
              </div>
            </div>
            <Badge className="bg-neon-magenta text-terminal-bg">
              🚀 Bull Market Mode
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-orbitron text-4xl md:text-6xl font-black mb-4">
            <span className="neon-text">TRIGGER</span>
            <span className="text-neon-cyan ml-4">TERMINAL</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            The arcade-style trading terminal for Solana memecoins. 
            Discover trending tokens, trade with precision, and ride the waves.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-neon-lime text-terminal-bg hover:bg-neon-gold font-orbitron font-bold">
              <Zap className="h-5 w-5 mr-2" />
              Start Trading
            </Button>
            <Button variant="outline" size="lg" className="border-neon-cyan text-neon-cyan hover-glow">
              <Activity className="h-5 w-5 mr-2" />
              Live Charts
            </Button>
          </div>
        </div>

        {/* Token Discovery Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-terminal-surface border border-terminal">
              <TabsTrigger value="trending" className="font-orbitron data-[state=active]:bg-neon-lime data-[state=active]:text-terminal-bg">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="new" className="font-orbitron data-[state=active]:bg-neon-magenta data-[state=active]:text-terminal-bg">
                <Zap className="h-4 w-4 mr-2" />
                New Launches
              </TabsTrigger>
              <TabsTrigger value="featured" className="font-orbitron data-[state=active]:bg-neon-gold data-[state=active]:text-terminal-bg">
                <Star className="h-4 w-4 mr-2" />
                Featured
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="trending">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockTokens.map((token, index) => (
                <TokenCard key={index} {...token} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockTokens.filter(token => token.isNew).map((token, index) => (
                <TokenCard key={index} {...token} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockTokens.filter(token => token.isTrending).map((token, index) => (
                <TokenCard key={index} {...token} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-neon-cyan text-neon-cyan hover-glow">
            Load More Tokens
          </Button>
        </div>
      </div>
    </div>
  );
}