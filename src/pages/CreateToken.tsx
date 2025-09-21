import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Rocket, Upload, DollarSign, Zap, AlertTriangle } from "lucide-react";

export default function CreateToken() {
  const [tokenData, setTokenData] = useState({
    name: "",
    symbol: "",
    description: "",
    supply: "",
    website: "",
    twitter: "",
    telegram: "",
  });

  const [step, setStep] = useState(1);

  const handleInputChange = (field: string, value: string) => {
    setTokenData(prev => ({ ...prev, [field]: value }));
  };

  const estimatedCosts = {
    creation: 0.1,
    liquidity: 5.0,
    total: 5.1,
  };

  return (
    <div className="min-h-screen bg-terminal-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-orbitron text-4xl font-black mb-4">
            <span className="neon-text">CREATE</span>
            <span className="text-neon-magenta ml-4">TOKEN</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Launch your own memecoin on Solana. Deploy, trade, and moon. 🚀
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Creation Form */}
          <div className="lg:col-span-2">
            <Card className="bg-terminal-surface border-terminal">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center">
                  <Rocket className="h-6 w-6 mr-2 text-neon-lime" />
                  Token Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Token Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., DogeCoin Jr"
                      value={tokenData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-terminal-bg border-terminal hover-glow"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="symbol">Symbol</Label>
                    <Input
                      id="symbol"
                      placeholder="e.g., DOGEJR"
                      value={tokenData.symbol}
                      onChange={(e) => handleInputChange("symbol", e.target.value.toUpperCase())}
                      className="bg-terminal-bg border-terminal hover-glow font-mono"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell the world about your token... Make it meme-worthy! 🚀"
                    value={tokenData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="bg-terminal-bg border-terminal hover-glow min-h-[100px]"
                  />
                </div>

                {/* Supply */}
                <div className="space-y-2">
                  <Label htmlFor="supply">Total Supply</Label>
                  <Input
                    id="supply"
                    type="number"
                    placeholder="1000000000"
                    value={tokenData.supply}
                    onChange={(e) => handleInputChange("supply", e.target.value)}
                    className="bg-terminal-bg border-terminal hover-glow font-mono"
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>Token Image</Label>
                  <div className="border-2 border-dashed border-terminal rounded-lg p-8 text-center hover-glow cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload image or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG up to 2MB
                    </p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <h3 className="font-orbitron font-bold text-neon-cyan">Social Links (Optional)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        placeholder="https://..."
                        value={tokenData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        className="bg-terminal-bg border-terminal hover-glow"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        placeholder="@username"
                        value={tokenData.twitter}
                        onChange={(e) => handleInputChange("twitter", e.target.value)}
                        className="bg-terminal-bg border-terminal hover-glow"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="telegram">Telegram</Label>
                      <Input
                        id="telegram"
                        placeholder="@username"
                        value={tokenData.telegram}
                        onChange={(e) => handleInputChange("telegram", e.target.value)}
                        className="bg-terminal-bg border-terminal hover-glow"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cost Breakdown & Deploy */}
          <div className="space-y-6">
            {/* Cost Breakdown */}
            <Card className="bg-terminal-surface border-terminal">
              <CardHeader>
                <CardTitle className="font-orbitron flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-neon-gold" />
                  Deployment Costs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Token Creation</span>
                  <span className="font-mono text-neon-gold">{estimatedCosts.creation} SOL</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Initial Liquidity</span>
                  <span className="font-mono text-neon-gold">{estimatedCosts.liquidity} SOL</span>
                </div>
                
                <div className="border-t border-terminal pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-orbitron font-bold">Total Cost</span>
                    <span className="font-mono font-bold text-neon-lime text-lg">
                      {estimatedCosts.total} SOL
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Warning */}
            <Card className="bg-terminal-surface border-warning">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-warning mb-1">Risk Warning</p>
                    <p className="text-muted-foreground">
                      Token creation involves risk. Ensure you understand the implications before deploying.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deploy Button */}
            <Card className="bg-terminal-surface border-terminal">
              <CardContent className="p-6">
                <Button 
                  size="lg" 
                  className="w-full bg-neon-lime text-terminal-bg hover:bg-neon-gold font-orbitron font-bold text-lg"
                  disabled={!tokenData.name || !tokenData.symbol || !tokenData.supply}
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Deploy Token
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-3">
                  By deploying, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="bg-terminal-surface border-terminal">
              <CardHeader>
                <CardTitle className="font-orbitron text-sm">Features Included</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-neon-lime text-terminal-bg">✓</Badge>
                  <span className="text-sm">Instant deployment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-neon-lime text-terminal-bg">✓</Badge>
                  <span className="text-sm">Auto liquidity pool</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-neon-lime text-terminal-bg">✓</Badge>
                  <span className="text-sm">Trading enabled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-neon-lime text-terminal-bg">✓</Badge>
                  <span className="text-sm">Metadata on-chain</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}