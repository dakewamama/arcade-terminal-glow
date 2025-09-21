import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Volume2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TokenCardProps {
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  image: string;
  mint: string;
  createdAt: string;
  userBalance?: number;
  userValue?: number;
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
  mint,
  createdAt,
  userBalance = 0,
  userValue = 0,
  isNew = false,
  isTrending = false,
}: TokenCardProps) {
  const navigate = useNavigate();
  const isPositive = change24h >= 0;
  const volumeIntensity = Math.min(volume24h / 1000000, 1);
  const hasBalance = userBalance > 0;
  const tokenAge = new Date(createdAt).toLocaleDateString();

  const handleClick = () => {
    navigate(`/token/${mint}`);
  };
  
  return (
    <Card 
      onClick={handleClick}
      className={`
        bg-terminal-surface border-terminal hover-glow cursor-pointer transition-all duration-300
        hover:scale-105 hover:border-neon-lime group relative overflow-hidden
        ${isTrending ? 'border-neon-gold shadow-lg' : ''}
        ${hasBalance ? 'border-neon-magenta/50 bg-neon-magenta/5' : ''}
      `}
    >
      {/* Volume-based glow effect */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 to-neon-magenta/10 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ opacity: volumeIntensity * 0.3 }}
      />
      
      <CardContent className="p-4 relative z-10">
        {/* Token Image */}
        {image && (
          <div className="w-full h-24 mb-3 rounded-lg overflow-hidden bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = `<div class="text-2xl font-bold">${symbol.substring(0, 2)}</div>`;
              }}
            />
          </div>
        )}

        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-orbitron font-bold text-foreground mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground mono-data">${symbol}</p>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <Clock className="h-3 w-3 mr-1" />
              Created {tokenAge}
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-1">
            {hasBalance && (
              <Badge className="bg-neon-lime text-terminal-bg text-xs">OWNED</Badge>
            )}
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

        {hasBalance && (
          <div className="mt-3 pt-3 border-t border-neon-magenta/30 bg-neon-magenta/5 -mx-4 px-4 -mb-4 pb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Your Balance</p>
                <p className="font-mono text-sm text-neon-lime">
                  {userBalance.toLocaleString()} {symbol}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Value</p>
                <p className="font-mono text-sm text-neon-lime">
                  ${userValue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}