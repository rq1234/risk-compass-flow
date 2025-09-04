// Mock financial data for GIC Risk Analytics Platform

export interface Portfolio {
  id: string;
  name: string;
  value: number;
  currency: string;
}

export interface RiskMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'danger';
  benchmark?: number;
}

export interface ComplianceRule {
  id: string;
  rule: string;
  current: number;
  limit: number;
  status: 'pass' | 'fail' | 'warning';
  severity: 'low' | 'medium' | 'high';
}

export interface SystemMetric {
  name: string;
  value: string | number;
  status: 'healthy' | 'warning' | 'error';
  unit?: string;
}

export const portfolios: Portfolio[] = [
  { id: 'port-1', name: 'Global Equity Fund', value: 2450000000, currency: 'USD' },
  { id: 'port-2', name: 'Asian Bond Portfolio', value: 1850000000, currency: 'USD' },
  { id: 'port-3', name: 'Real Estate Investment', value: 980000000, currency: 'USD' },
  { id: 'port-4', name: 'Alternative Investments', value: 1200000000, currency: 'USD' },
];

export const riskMetrics: RiskMetric[] = [
  { name: 'Annualized Volatility', value: 12.5, unit: '%', status: 'good', benchmark: 15.0 },
  { name: 'Sharpe Ratio', value: 1.8, unit: '', status: 'good', benchmark: 1.5 },
  { name: 'Value-at-Risk (95%)', value: -2.1, unit: '%', status: 'warning', benchmark: -2.5 },
  { name: 'Maximum Drawdown', value: -8.7, unit: '%', status: 'good', benchmark: -10.0 },
  { name: 'Beta vs Benchmark', value: 0.92, unit: '', status: 'good', benchmark: 1.0 },
  { name: 'Correlation to Market', value: 0.78, unit: '', status: 'good', benchmark: 0.85 },
];

export const complianceRules: ComplianceRule[] = [
  {
    id: 'rule-1',
    rule: 'Single Asset Concentration Limit',
    current: 4.2,
    limit: 5.0,
    status: 'pass',
    severity: 'high'
  },
  {
    id: 'rule-2',
    rule: 'Sector Exposure - Technology',
    current: 22.1,
    limit: 25.0,
    status: 'warning',
    severity: 'medium'
  },
  {
    id: 'rule-3',
    rule: 'Liquidity Buffer Minimum',
    current: 8.5,
    limit: 10.0,
    status: 'fail',
    severity: 'high'
  },
  {
    id: 'rule-4',
    rule: 'Currency Exposure - USD',
    current: 68.2,
    limit: 70.0,
    status: 'pass',
    severity: 'medium'
  },
  {
    id: 'rule-5',
    rule: 'Credit Rating AA- Minimum',
    current: 92.3,
    limit: 90.0,
    status: 'pass',
    severity: 'low'
  },
];

export const systemMetrics: SystemMetric[] = [
  { name: 'API Response Time', value: '145ms', status: 'healthy', unit: 'ms' },
  { name: 'Cache Hit Rate', value: 94.2, status: 'healthy', unit: '%' },
  { name: 'Daily API Calls', value: '1.2M', status: 'healthy' },
  { name: 'Error Rate', value: 0.03, status: 'healthy', unit: '%' },
  { name: 'Database Connections', value: 8, status: 'warning' },
  { name: 'Memory Usage', value: 76.8, status: 'warning', unit: '%' },
];

export const performanceData = [
  { date: '2024-01', portfolio: 100, benchmark: 100 },
  { date: '2024-02', portfolio: 102.3, benchmark: 101.8 },
  { date: '2024-03', portfolio: 98.7, benchmark: 99.2 },
  { date: '2024-04', portfolio: 105.1, benchmark: 103.4 },
  { date: '2024-05', portfolio: 108.9, benchmark: 106.2 },
  { date: '2024-06', portfolio: 103.2, benchmark: 104.8 },
  { date: '2024-07', portfolio: 112.4, benchmark: 108.9 },
  { date: '2024-08', portfolio: 109.8, benchmark: 107.3 },
  { date: '2024-09', portfolio: 115.6, benchmark: 111.2 },
];

export const volatilityData = [
  { date: '2024-01', volatility: 11.2 },
  { date: '2024-02', volatility: 13.8 },
  { date: '2024-03', volatility: 16.4 },
  { date: '2024-04', volatility: 12.9 },
  { date: '2024-05', volatility: 10.7 },
  { date: '2024-06', volatility: 14.2 },
  { date: '2024-07', volatility: 9.8 },
  { date: '2024-08', volatility: 12.5 },
  { date: '2024-09', volatility: 11.9 },
];

export const correlationMatrix = [
  { asset: 'Equity', equity: 1.00, bonds: -0.12, reits: 0.68, commodities: 0.34 },
  { asset: 'Bonds', equity: -0.12, bonds: 1.00, reits: 0.23, commodities: -0.08 },
  { asset: 'REITs', equity: 0.68, bonds: 0.23, reits: 1.00, commodities: 0.45 },
  { asset: 'Commodities', equity: 0.34, bonds: -0.08, reits: 0.45, commodities: 1.00 },
];