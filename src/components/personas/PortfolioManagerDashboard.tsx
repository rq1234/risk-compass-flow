import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Cell } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Zap,
  Target,
  RefreshCw,
  ArrowUpDown,
  Settings2
} from 'lucide-react';
import { portfolios, performanceData, correlationMatrix } from '@/data/mockData';

const PortfolioManagerDashboard: React.FC = () => {
  const [selectedPortfolioA, setSelectedPortfolioA] = useState(portfolios[0].id);
  const [selectedPortfolioB, setSelectedPortfolioB] = useState(portfolios[1].id);
  const [marketDropPercent, setMarketDropPercent] = useState([15]);
  const [rateHikePercent, setRateHikePercent] = useState([200]);

  const riskReturnData = [
    { risk: 8.2, return: 12.5, name: 'Global Equity Fund' },
    { risk: 5.1, return: 7.8, name: 'Asian Bond Portfolio' },
    { risk: 11.4, return: 15.2, name: 'Real Estate Investment' },
    { risk: 14.8, return: 18.9, name: 'Alternative Investments' },
    { risk: 9.6, return: 13.1, name: 'Benchmark' },
  ];

  const stressTestResults = [
    { scenario: 'Base Case', return: 12.5, volatility: 8.2, sharpe: 1.52, drawdown: -4.2 },
    { scenario: `Market Drop ${marketDropPercent[0]}%`, return: 8.3, volatility: 12.8, sharpe: 0.65, drawdown: -15.7 },
    { scenario: `Rate Hike ${rateHikePercent[0]}bps`, return: 10.1, volatility: 9.4, sharpe: 1.07, drawdown: -6.8 },
    { scenario: 'Combined Stress', return: 5.9, volatility: 16.2, sharpe: 0.36, drawdown: -22.4 },
  ];

  const similarPortfolios = [
    { name: 'Sovereign Wealth Fund A', similarity: 94.2, returns: 11.8, risk: 8.5 },
    { name: 'University Endowment B', similarity: 91.7, returns: 13.1, risk: 9.1 },
    { name: 'Pension Fund C', similarity: 88.3, returns: 10.9, risk: 7.8 },
    { name: 'Insurance Portfolio D', similarity: 85.6, returns: 12.3, risk: 8.9 },
  ];

  const getScenarioColor = (scenario: string) => {
    if (scenario.includes('Base')) return 'text-success';
    if (scenario.includes('Combined')) return 'text-danger';
    return 'text-warning';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button className="bg-chart-1 hover:bg-chart-1/90">
            <RefreshCw className="h-4 w-4 mr-2" />
            Run Analysis
          </Button>
          <Button variant="outline">
            <Settings2 className="h-4 w-4 mr-2" />
            Configure Scenarios
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ArrowUpDown className="h-4 w-4 mr-2" />
            Rebalance
          </Button>
          <Button variant="outline" size="sm">
            <Target className="h-4 w-4 mr-2" />
            Optimize
          </Button>
        </div>
      </div>

      {/* Portfolio Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Portfolio A</label>
                  <Select value={selectedPortfolioA} onValueChange={setSelectedPortfolioA}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {portfolios.map((portfolio) => (
                        <SelectItem key={portfolio.id} value={portfolio.id}>
                          {portfolio.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Portfolio B</label>
                  <Select value={selectedPortfolioB} onValueChange={setSelectedPortfolioB}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {portfolios.map((portfolio) => (
                        <SelectItem key={portfolio.id} value={portfolio.id}>
                          {portfolio.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-chart-1">
                    {portfolios.find(p => p.id === selectedPortfolioA)?.name}
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Value:</span>
                      <span className="font-medium">
                        {formatCurrency(portfolios.find(p => p.id === selectedPortfolioA)?.value || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Return:</span>
                      <span className="font-medium text-success">+12.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Volatility:</span>
                      <span className="font-medium">8.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sharpe:</span>
                      <span className="font-medium">1.52</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-chart-2">
                    {portfolios.find(p => p.id === selectedPortfolioB)?.name}
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Value:</span>
                      <span className="font-medium">
                        {formatCurrency(portfolios.find(p => p.id === selectedPortfolioB)?.value || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Return:</span>
                      <span className="font-medium text-success">+7.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Volatility:</span>
                      <span className="font-medium">5.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sharpe:</span>
                      <span className="font-medium">1.53</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk-Return Scatter Plot */}
        <Card>
          <CardHeader>
            <CardTitle>Risk-Return Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="risk" 
                    name="Risk (Volatility %)" 
                    type="number"
                    domain={[0, 20]}
                  />
                  <YAxis 
                    dataKey="return" 
                    name="Return %" 
                    type="number"
                    domain={[0, 25]}
                  />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${Number(value).toFixed(1)}%`,
                      name === 'risk' ? 'Risk' : 'Return'
                    ]}
                    labelFormatter={(label, payload) => payload?.[0]?.payload?.name}
                  />
                  <Scatter 
                    data={riskReturnData} 
                    fill="hsl(var(--chart-1))"
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stress Testing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Stress Testing Scenarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Stress Test Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-medium">Market Drop Scenario</label>
                <div className="space-y-2">
                  <Slider
                    value={marketDropPercent}
                    onValueChange={setMarketDropPercent}
                    max={50}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5%</span>
                    <span className="font-medium">{marketDropPercent[0]}% Drop</span>
                    <span>50%</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-medium">Interest Rate Hike</label>
                <div className="space-y-2">
                  <Slider
                    value={rateHikePercent}
                    onValueChange={setRateHikePercent}
                    max={500}
                    min={50}
                    step={25}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>50bps</span>
                    <span className="font-medium">{rateHikePercent[0]}bps Hike</span>
                    <span>500bps</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stress Test Results */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scenario</TableHead>
                  <TableHead>Expected Return</TableHead>
                  <TableHead>Volatility</TableHead>
                  <TableHead>Sharpe Ratio</TableHead>
                  <TableHead>Max Drawdown</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stressTestResults.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <span className={getScenarioColor(result.scenario)}>
                        {result.scenario}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {result.return > 10 ? (
                          <TrendingUp className="h-3 w-3 text-success" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-danger" />
                        )}
                        {result.return.toFixed(1)}%
                      </div>
                    </TableCell>
                    <TableCell>{result.volatility.toFixed(1)}%</TableCell>
                    <TableCell>{result.sharpe.toFixed(2)}</TableCell>
                    <TableCell className="text-danger">{result.drawdown.toFixed(1)}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Correlation Matrix */}
        <Card>
          <CardHeader>
            <CardTitle>Asset Correlation Matrix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {correlationMatrix.map((row, index) => (
                <div key={index} className="grid grid-cols-5 gap-2 text-sm">
                  <div className="font-medium text-right pr-2">{row.asset}</div>
                  <div className="text-center p-2 rounded bg-chart-1/10 text-chart-1 font-mono">
                    {row.equity.toFixed(2)}
                  </div>
                  <div className="text-center p-2 rounded bg-chart-2/10 text-chart-2 font-mono">
                    {row.bonds.toFixed(2)}
                  </div>
                  <div className="text-center p-2 rounded bg-chart-3/10 text-chart-3 font-mono">
                    {row.reits.toFixed(2)}
                  </div>
                  <div className="text-center p-2 rounded bg-chart-4/10 text-chart-4 font-mono">
                    {row.commodities.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Similar Portfolios */}
        <Card>
          <CardHeader>
            <CardTitle>Similar Portfolio Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {similarPortfolios.map((portfolio, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{portfolio.name}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Return: {portfolio.returns}%</span>
                      <span>Risk: {portfolio.risk}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-success">
                      {portfolio.similarity}% Match
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortfolioManagerDashboard;