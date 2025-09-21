import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Volume2, 
  Clock,
  Settings,
  ExternalLink,
  Copy,
  BarChart3
} from "lucide-react";
import { toast } from "sonner";

interface TokenData {
  name: string;
  symbol: string;
  mint: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  image: string;
  description: string;
  createdAt: string;
  website?: string;
  telegram?: string;
  twitter?: string;
  userBalance?: number;
  userValue?: number;
  totalSupply: number;
  holders: number;
  bondingCurveProgress: number;
}

export default function TokenDetails() {
  const { mint } = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState<TokenData | null>(null);
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [slippage, setSlippage] = useState("1");
  const [showSlippageSettings, setShowSlippageSettings] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockToken: TokenData = {
      name: "DogeCoin Jr",
      symbol: "DOGEJR",
      mint: mint || "",
      price: 0.000123,
      change24h: 156.7,
      volume24h: 2400000,
      marketCap: 12000000,
      image: "https://via.placeholder.com/200x200/00ff88/000000?text=DJ",
      description: "The next generation of meme coins on Solana. Built for the community, by the community. 🚀",
      createdAt: "2024-01-15",
      website: "https://dogejr.com",
      telegram: "https://t.me/dogejr",
      twitter: "https://twitter.com/dogejr",
      userBalance: 15000,
      userValue: 1.845,
      totalSupply: 1000000000,
      holders: 2847,
      bondingCurveProgress: 67.5
    };
    setToken(mockToken);
  }, [mint]);

  const handleBuy = async () => {
    if (!buyAmount) return;
    setLoading(true);
    
    // Mock buy transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success(`Successfully bought ${buyAmount} SOL worth of ${token?.symbol}!`);
    setBuyAmount("");
    setLoading(false);
  };

  const handleSell = async () => {
    if (!sellAmount) return;
    setLoading(true);
    
    // Mock sell transaction
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success(`Successfully sold ${sellAmount} ${token?.symbol}!`);
    setSellAmount("");
    setLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-terminal-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading token details...</p>
        </div>
      </div>
    );
  }

  const isPositive = token.change24h >= 0;
  const hasBalance = token.userBalance && token.userBalance > 0;

  return (
    <div className="min-h-screen bg-terminal-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Token Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Token Card */}
            <Card className="bg-terminal-surface border-terminal">
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={token.image} 
                      alt={token.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="font-orbitron text-2xl font-bold text-foreground">{token.name}</h1>
                      <Badge className="bg-neon-cyan text-terminal-bg">${token.symbol}</Badge>
                      {hasBalance && (
                        <Badge className="bg-neon-lime text-terminal-bg">OWNED</Badge>
                      )}
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{token.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Created {new Date(token.createdAt).toLocaleDateString()}
                      </div>
                      <button
                        onClick={() => copyToClipboard(token.mint)}
                        className="flex items-center hover:text-foreground transition-colors"
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        {token.mint.slice(0, 8)}...
                      </button>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center space-x-3 mt-4">
                      {token.website && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={token.website} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Website
                          </a>
                        </Button>
                      )}
                      {token.telegram && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={token.telegram} target="_blank" rel="noopener noreferrer">
                            Telegram
                          </a>
                        </Button>
                      )}
                      {token.twitter && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={token.twitter} target="_blank" rel="noopener noreferrer">
                            Twitter
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Stats */}
            <Card className="bg-terminal-surface border-terminal">
              <CardHeader>
                <CardTitle className="font-orbitron text-lg flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Market Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-mono text-xl font-bold text-foreground">
                      ${token.price.toFixed(6)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">24h Change</p>
                    <p className={`font-mono text-xl font-bold flex items-center ${
                      isPositive ? 'text-profit' : 'text-loss'
                    }`}>
                      {isPositive ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {isPositive ? '+' : ''}{token.change24h.toFixed(2)}%
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Volume 24h</p>
                    <p className="font-mono text-lg text-neon-cyan">
                      ${(token.volume24h / 1000000).toFixed(2)}M
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Market Cap</p>
                    <p className="font-mono text-lg text-neon-cyan">
                      ${(token.marketCap / 1000000).toFixed(2)}M
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Total Supply</p>
                    <p className="font-mono text-lg text-foreground">
                      {(token.totalSupply / 1000000).toFixed(0)}M
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Holders</p>
                    <p className="font-mono text-lg text-foreground">
                      {token.holders.toLocaleString()}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Bonding Curve</p>
                    <p className="font-mono text-lg text-neon-gold">
                      {token.bondingCurveProgress.toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                {/* Bonding Curve Progress */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Bonding Curve Progress</span>
                    <span>{token.bondingCurveProgress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-terminal h-2 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-neon-cyan to-neon-gold transition-all duration-300"
                      style={{ width: `${token.bondingCurveProgress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Holdings */}
            {hasBalance && (
              <Card className="bg-terminal-surface border-neon-magenta/50">
                <CardHeader>
                  <CardTitle className="font-orbitron text-lg text-neon-lime">Your Holdings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Balance</p>
                      <p className="font-mono text-xl font-bold text-neon-lime">
                        {token.userBalance.toLocaleString()} {token.symbol}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Value</p>
                      <p className="font-mono text-xl font-bold text-neon-lime">
                        ${token.userValue?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Trading Panel */}
          <div className="space-y-6">
            <Card className="bg-terminal-surface border-terminal sticky top-8">
              <CardHeader>
                <CardTitle className="font-orbitron text-lg">Trade {token.symbol}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Tabs defaultValue="buy" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="buy" className="font-orbitron data-[state=active]:bg-neon-lime data-[state=active]:text-terminal-bg">
                      Buy
                    </TabsTrigger>
                    <TabsTrigger 
                      value="sell" 
                      className="font-orbitron data-[state=active]:bg-neon-magenta data-[state=active]:text-terminal-bg"
                      disabled={!hasBalance}
                    >
                      Sell
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="buy" className="space-y-4">
                    <div>
                      <Label htmlFor="buy-amount" className="text-sm font-medium">
                        Amount (SOL)
                      </Label>
                      <Input
                        id="buy-amount"
                        type="number"
                        placeholder="0.0"
                        value={buyAmount}
                        onChange={(e) => setBuyAmount(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setBuyAmount("0.1")}
                        className="flex-1"
                      >
                        0.1 SOL
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setBuyAmount("0.5")}
                        className="flex-1"
                      >
                        0.5 SOL
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setBuyAmount("1")}
                        className="flex-1"
                      >
                        1 SOL
                      </Button>
                    </div>
                    
                    {buyAmount && (
                      <div className="p-3 bg-terminal rounded border text-sm">
                        <div className="flex justify-between">
                          <span>You get (est.)</span>
                          <span className="font-mono">
                            {(parseFloat(buyAmount) / token.price).toLocaleString()} {token.symbol}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      onClick={handleBuy}
                      disabled={!buyAmount || loading}
                      className="w-full bg-neon-lime text-terminal-bg hover:bg-neon-gold font-orbitron"
                    >
                      {loading ? "Buying..." : `Buy ${token.symbol}`}
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="sell" className="space-y-4">
                    <div>
                      <Label htmlFor="sell-amount" className="text-sm font-medium">
                        Amount ({token.symbol})
                      </Label>
                      <Input
                        id="sell-amount"
                        type="number"
                        placeholder="0"
                        value={sellAmount}
                        onChange={(e) => setSellAmount(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    {hasBalance && (
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSellAmount((token.userBalance! * 0.25).toString())}
                          className="flex-1"
                        >
                          25%
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSellAmount((token.userBalance! * 0.5).toString())}
                          className="flex-1"
                        >
                          50%
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setSellAmount(token.userBalance!.toString())}
                          className="flex-1"
                        >
                          Max
                        </Button>
                      </div>
                    )}
                    
                    {sellAmount && (
                      <div className="p-3 bg-terminal rounded border text-sm">
                        <div className="flex justify-between">
                          <span>You get (est.)</span>
                          <span className="font-mono">
                            {(parseFloat(sellAmount) * token.price).toFixed(4)} SOL
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      onClick={handleSell}
                      disabled={!sellAmount || loading}
                      className="w-full bg-neon-magenta text-terminal-bg hover:bg-neon-magenta/80 font-orbitron"
                    >
                      {loading ? "Selling..." : `Sell ${token.symbol}`}
                    </Button>
                  </TabsContent>
                </Tabs>
                
                <Separator />
                
                {/* Slippage Settings */}
                <div>
                  <button
                    onClick={() => setShowSlippageSettings(!showSlippageSettings)}
                    className="flex items-center justify-between w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Slippage Tolerance: {slippage}%
                    </span>
                  </button>
                  
                  {showSlippageSettings && (
                    <div className="mt-3 space-y-3">
                      <div className="flex space-x-2">
                        {['0.5', '1', '2', '5'].map((value) => (
                          <Button
                            key={value}
                            variant={slippage === value ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSlippage(value)}
                            className="flex-1"
                          >
                            {value}%
                          </Button>
                        ))}
                      </div>
                      <Input
                        type="number"
                        placeholder="Custom %"
                        value={slippage}
                        onChange={(e) => setSlippage(e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}