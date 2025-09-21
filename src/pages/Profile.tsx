import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, TrendingUp, DollarSign, Clock, ExternalLink } from "lucide-react";

export default function Profile() {
  // Mock wallet data
  const walletData = {
    address: "7xKD...9mL3",
    solBalance: 124.53,
    totalValue: 1847.23,
    pnl24h: 156.78,
    pnlPercent: 9.3,
  };

  const holdings = [
    {
      symbol: "DOGEJR",
      name: "DogeCoin Jr",
      amount: 50000,
      value: 615.50,
      pnl: 89.23,
      pnlPercent: 16.9,
    },
    {
      symbol: "PEPERKT",
      name: "Pepe Rocket", 
      amount: 25000,
      value: 342.11,
      pnl: -23.45,
      pnlPercent: -6.4,
    },
    {
      symbol: "MLAMBO",
      name: "Moon Lambo",
      amount: 75000,
      value: 889.62,
      pnl: 90.67,
      pnlPercent: 11.3,
    },
  ];

  const recentTrades = [
    { type: "BUY", symbol: "DOGEJR", amount: "10,000", price: "$0.000123", time: "2m ago" },
    { type: "SELL", symbol: "PEPERKT", amount: "5,000", price: "$0.000456", time: "15m ago" },
    { type: "BUY", symbol: "MLAMBO", amount: "25,000", price: "$0.001234", time: "1h ago" },
  ];

  return (
    <div className="min-h-screen bg-terminal-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-orbitron text-3xl font-black neon-text">Portfolio</h1>
            <p className="text-muted-foreground">Wallet: {walletData.address}</p>
          </div>
          <Button variant="outline" className="border-neon-cyan text-neon-cyan hover-glow">
            <ExternalLink className="h-4 w-4 mr-2" />
            View on Explorer
          </Button>
        </div>

        {/* Wallet Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-terminal-surface border-terminal">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm text-muted-foreground">
                <Wallet className="h-4 w-4 mr-2" />
                SOL Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-mono font-bold text-neon-gold">
                {walletData.solBalance.toFixed(2)} SOL
              </div>
            </CardContent>
          </Card>

          <Card className="bg-terminal-surface border-terminal">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4 mr-2" />
                Total Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-mono font-bold text-foreground">
                ${walletData.totalValue.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-terminal-surface border-terminal">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 mr-2" />
                24h P&L
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-mono font-bold ${
                walletData.pnl24h >= 0 ? 'text-profit pulse-green' : 'text-loss pulse-red'
              }`}>
                ${walletData.pnl24h >= 0 ? '+' : ''}{walletData.pnl24h.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-terminal-surface border-terminal">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-sm text-muted-foreground">
                Percentage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-mono font-bold ${
                walletData.pnlPercent >= 0 ? 'text-profit pulse-green' : 'text-loss pulse-red'
              }`}>
                {walletData.pnlPercent >= 0 ? '+' : ''}{walletData.pnlPercent.toFixed(1)}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Holdings & Trades Tabs */}
        <Tabs defaultValue="holdings" className="w-full">
          <TabsList className="bg-terminal-surface border border-terminal mb-6">
            <TabsTrigger value="holdings" className="font-orbitron data-[state=active]:bg-neon-lime data-[state=active]:text-terminal-bg">
              Holdings
            </TabsTrigger>
            <TabsTrigger value="trades" className="font-orbitron data-[state=active]:bg-neon-cyan data-[state=active]:text-terminal-bg">
              Recent Trades
            </TabsTrigger>
          </TabsList>

          <TabsContent value="holdings">
            <Card className="bg-terminal-surface border-terminal">
              <CardHeader>
                <CardTitle className="font-orbitron">Token Holdings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {holdings.map((holding, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-terminal-bg border border-terminal hover-glow">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta flex items-center justify-center text-sm font-bold">
                          {holding.symbol.substring(0, 2)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{holding.name}</h3>
                          <p className="text-sm text-muted-foreground font-mono">${holding.symbol}</p>
                        </div>
                      </div>
                      
                      <div className="text-right space-y-1">
                        <div className="font-mono text-sm text-muted-foreground">
                          {holding.amount.toLocaleString()} tokens
                        </div>
                        <div className="font-mono font-bold text-foreground">
                          ${holding.value.toFixed(2)}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`font-mono font-bold ${
                          holding.pnl >= 0 ? 'text-profit' : 'text-loss'
                        }`}>
                          ${holding.pnl >= 0 ? '+' : ''}{holding.pnl.toFixed(2)}
                        </div>
                        <div className={`text-sm font-mono ${
                          holding.pnlPercent >= 0 ? 'text-profit' : 'text-loss'
                        }`}>
                          {holding.pnlPercent >= 0 ? '+' : ''}{holding.pnlPercent.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trades">
            <Card className="bg-terminal-surface border-terminal">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Recent Trades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTrades.map((trade, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-terminal-bg border border-terminal">
                      <div className="flex items-center space-x-4">
                        <Badge className={
                          trade.type === "BUY" 
                            ? "bg-profit text-terminal-bg" 
                            : "bg-loss text-terminal-bg"
                        }>
                          {trade.type}
                        </Badge>
                        <span className="font-mono font-semibold">{trade.symbol}</span>
                      </div>
                      
                      <div className="text-center">
                        <div className="font-mono text-sm">{trade.amount}</div>
                        <div className="text-xs text-muted-foreground">@ {trade.price}</div>
                      </div>
                      
                      <div className="text-right text-sm text-muted-foreground">
                        {trade.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}