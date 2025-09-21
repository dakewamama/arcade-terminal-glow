import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Volume2 } from "lucide-react";

interface TokenCardProps {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  image: string;
  isNew?: boolean;
  isTrending?: boolean;
}

export default function TokenCard({
  name,
  symbol,
  price,
  change24h,
  volume24h,
  marketCap,
  image,
  isNew = false,
  isTrending = false,
}: TokenCardProps) {
  const isPositive = change24h >= 0;
  const volumeIntensity = Math.min(volume24h / 1000000, 1); // Normalize to 0-1
  
  return (
    <Card className={`
      bg-terminal-surface border-terminal hover-glow cursor-pointer transition-all duration-300
      hover:scale-105 hover:border-neon-lime group relative overflow-hidden
      ${isTrending ? 'border-neon-gold shadow-lg' : ''}
    `}>
      {/* Volume-based glow effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-neon-magenta/10 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ opacity: volumeIntensity * 0.3 }}
      />
      
      <CardContent className="p-4 relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta flex items-center justify-center text-sm font-bold">
              {symbol.substring(0, 2)}
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-foreground">{name}</h3>
              <p className="text-sm text-muted-foreground mono-data">${symbol}</p>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-1">
            {isNew && (
              <Badge className="bg-neon-magenta text-terminal-bg text-xs">NEW</Badge>
            )}
            {isTrending && (
              <Badge className="bg-neon-gold text-terminal-bg text-xs">🔥 HOT</Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Price</p>
            <p className="font-mono font-bold text-lg text-foreground">
              ${price.toFixed(6)}
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-muted-foreground">24h Change</p>
            <p className={`font-mono font-bold text-lg flex items-center justify-end ${
              isPositive ? 'text-profit pulse-green' : 'text-loss pulse-red'
            }`}>
              {isPositive ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {isPositive ? '+' : ''}{change24h.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-terminal">
          <div>
            <p className="text-xs text-muted-foreground flex items-center">
              <Volume2 className="h-3 w-3 mr-1" />
              Volume 24h
            </p>
            <p className="font-mono text-sm text-neon-cyan">
              ${(volume24h / 1000).toFixed(0)}K
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Market Cap</p>
            <p className="font-mono text-sm text-neon-cyan">
              ${(marketCap / 1000000).toFixed(1)}M
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}