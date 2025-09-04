import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  Server, 
  Database, 
  Cpu, 
  HardDrive,
  Network,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink,
  Settings,
  RefreshCw,
  Zap
} from 'lucide-react';
import { systemMetrics } from '@/data/mockData';

const EngineeringLeadDashboard: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-danger';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-danger" />;
      default:
        return <CheckCircle className="h-4 w-4 text-success" />;
    }
  };

  const apiLatencyData = [
    { time: '00:00', latency: 120, errors: 0 },
    { time: '04:00', latency: 135, errors: 1 },
    { time: '08:00', latency: 180, errors: 3 },
    { time: '12:00', latency: 220, errors: 2 },
    { time: '16:00', latency: 165, errors: 1 },
    { time: '20:00', latency: 145, errors: 0 },
  ];

  const endpointPerformance = [
    { endpoint: '/api/volatility', avgLatency: 145, calls: 450000, errors: 12 },
    { endpoint: '/api/sharpe-ratio', avgLatency: 98, calls: 320000, errors: 3 },
    { endpoint: '/api/var', avgLatency: 267, calls: 180000, errors: 8 },
    { endpoint: '/api/max-drawdown', avgLatency: 156, calls: 290000, errors: 5 },
    { endpoint: '/api/correlation', avgLatency: 201, calls: 75000, errors: 15 },
    { endpoint: '/api/beta', avgLatency: 134, calls: 110000, errors: 2 },
  ];

  const systemResources = [
    { name: 'CPU Usage', value: 68, max: 100, unit: '%', status: 'warning' },
    { name: 'Memory Usage', value: 76.8, max: 100, unit: '%', status: 'warning' },
    { name: 'Disk I/O', value: 45, max: 100, unit: '%', status: 'healthy' },
    { name: 'Network Bandwidth', value: 32, max: 100, unit: '%', status: 'healthy' },
  ];

  const databaseStats = [
    { metric: 'Active Connections', value: '8/20', status: 'healthy' },
    { metric: 'Query Response Time', value: '45ms', status: 'healthy' },
    { metric: 'Cache Hit Rate', value: '94.2%', status: 'healthy' },
    { metric: 'Database Size', value: '2.4TB', status: 'healthy' },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button className="bg-chart-4 hover:bg-chart-4/90">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Metrics
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            System Config
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Swagger Docs
          </Button>
          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-2" />
            Health Check
          </Button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {systemMetrics.slice(0, 4).map((metric, index) => (
          <Card key={index} className={metric.status === 'error' ? 'border-danger' : metric.status === 'warning' ? 'border-warning' : 'border-success'}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.name}</p>
                  <p className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value}
                    {metric.unit && <span className="text-sm font-normal">{metric.unit}</span>}
                  </p>
                </div>
                {getStatusIcon(metric.status)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* API Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            API Performance Monitoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium mb-3">Response Time & Errors (24h)</h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={apiLatencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="latency" 
                      stroke="hsl(var(--chart-1))" 
                      name="Latency (ms)"
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="errors" 
                      stroke="hsl(var(--chart-3))" 
                      name="Errors"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">Endpoint Performance</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Avg Latency</TableHead>
                    <TableHead>Calls</TableHead>
                    <TableHead>Errors</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {endpointPerformance.map((endpoint, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-xs">
                        {endpoint.endpoint}
                      </TableCell>
                      <TableCell>
                        <span className={endpoint.avgLatency > 200 ? 'text-danger' : endpoint.avgLatency > 150 ? 'text-warning' : 'text-success'}>
                          {endpoint.avgLatency}ms
                        </span>
                      </TableCell>
                      <TableCell>
                        {(endpoint.calls / 1000).toFixed(0)}K
                      </TableCell>
                      <TableCell>
                        <span className={endpoint.errors > 10 ? 'text-danger' : endpoint.errors > 5 ? 'text-warning' : 'text-success'}>
                          {endpoint.errors}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cpu className="h-5 w-5" />
              System Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemResources.map((resource, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{resource.name}</span>
                    <span className={`text-sm ${getStatusColor(resource.status)}`}>
                      {resource.value}{resource.unit}
                    </span>
                  </div>
                  <Progress 
                    value={resource.value} 
                    className={`h-2 ${resource.status === 'warning' ? '[&>div]:bg-warning' : '[&>div]:bg-success'}`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Database Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {databaseStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <span className="font-medium">{stat.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">{stat.value}</span>
                    {getStatusIcon(stat.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">API Settings</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Rate Limit:</span>
                  <span className="font-mono">1000/min</span>
                </div>
                <div className="flex justify-between">
                  <span>Timeout:</span>
                  <span className="font-mono">30s</span>
                </div>
                <div className="flex justify-between">
                  <span>Workers:</span>
                  <span className="font-mono">8</span>
                </div>
                <div className="flex justify-between">
                  <span>Cache TTL:</span>
                  <span className="font-mono">300s</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Database Pool</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Pool Size:</span>
                  <span className="font-mono">20</span>
                </div>
                <div className="flex justify-between">
                  <span>Min Connections:</span>
                  <span className="font-mono">5</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Connections:</span>
                  <span className="font-mono">50</span>
                </div>
                <div className="flex justify-between">
                  <span>Connection Timeout:</span>
                  <span className="font-mono">10s</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Monitoring</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Log Level:</span>
                  <Badge variant="outline">INFO</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Metrics Interval:</span>
                  <span className="font-mono">60s</span>
                </div>
                <div className="flex justify-between">
                  <span>Health Check:</span>
                  <Badge className="status-pass">Enabled</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Alerts:</span>
                  <Badge className="status-pass">Active</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent System Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent System Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 border border-success/20 bg-success/5 rounded-lg">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-success">Cache Performance Optimized</p>
                <p className="text-sm text-muted-foreground">
                  Cache hit rate improved to 94.2% after optimization
                </p>
                <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 border border-warning/20 bg-warning/5 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-warning">High Memory Usage Warning</p>
                <p className="text-sm text-muted-foreground">
                  Memory usage reached 76.8% - consider scaling
                </p>
                <p className="text-xs text-muted-foreground mt-1">15 minutes ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 border border-border rounded-lg">
              <Activity className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">Daily Backup Completed</p>
                <p className="text-sm text-muted-foreground">
                  PostgreSQL backup completed successfully (2.4TB)
                </p>
                <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EngineeringLeadDashboard;