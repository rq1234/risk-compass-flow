import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Upload, 
  Download, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  FileText,
  Shield,
  Bell,
  Eye,
  AlertCircle
} from 'lucide-react';
import { complianceRules } from '@/data/mockData';

const ComplianceAnalystDashboard: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'fail':
        return <XCircle className="h-4 w-4 text-danger" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      default:
        return <CheckCircle className="h-4 w-4 text-success" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pass':
        return 'status-pass';
      case 'fail':
        return 'status-fail';
      case 'warning':
        return 'status-warning';
      default:
        return 'status-pass';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-danger';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const calculateUtilization = (current: number, limit: number) => {
    return (current / limit) * 100;
  };

  const failedRules = complianceRules.filter(rule => rule.status === 'fail');
  const warningRules = complianceRules.filter(rule => rule.status === 'warning');
  const passedRules = complianceRules.filter(rule => rule.status === 'pass');

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-danger">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-danger/10 rounded-lg">
                <XCircle className="h-5 w-5 text-danger" />
              </div>
              <div>
                <p className="text-2xl font-bold text-danger">{failedRules.length}</p>
                <p className="text-sm text-muted-foreground">Policy Violations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">{warningRules.length}</p>
                <p className="text-sm text-muted-foreground">Warnings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-success">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{passedRules.length}</p>
                <p className="text-sm text-muted-foreground">Compliant Rules</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Critical Alerts */}
      {failedRules.length > 0 && (
        <Alert className="border-danger">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Critical Compliance Breach:</strong> {failedRules.length} policy violation(s) require immediate attention.
          </AlertDescription>
        </Alert>
      )}

      {/* Guidelines Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Policy Guidelines Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Upload Guidelines
              </Button>
            </div>
            
            {uploadedFile && (
              <div className="flex items-center gap-2 p-3 bg-surface rounded-lg">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm">{uploadedFile}</span>
                <Badge variant="outline" className="ml-auto">Processed</Badge>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium">Current Guidelines:</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>MAS Risk Management Guidelines 2024</span>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>GIC Investment Policy Framework</span>
                    <Badge variant="outline">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>ESG Investment Guidelines</span>
                    <Badge variant="outline">Active</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Quick Actions:</p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Eye className="h-4 w-4 mr-2" />
                    Review Guidelines
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export Audit Log
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Configure Alerts
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Status Table */}
      <Card>
        <CardHeader>
          <CardTitle>Compliance Rule Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule</TableHead>
                <TableHead>Current</TableHead>
                <TableHead>Limit</TableHead>
                <TableHead>Utilization</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complianceRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">
                    {rule.rule}
                  </TableCell>
                  <TableCell>
                    {rule.current}%
                  </TableCell>
                  <TableCell>
                    {rule.limit}%
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress 
                        value={calculateUtilization(rule.current, rule.limit)} 
                        className="h-2"
                      />
                      <p className="text-xs text-muted-foreground">
                        {Math.round(calculateUtilization(rule.current, rule.limit))}%
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`text-sm font-medium ${getSeverityColor(rule.severity)}`}>
                      {rule.severity.toUpperCase()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(rule.status)}
                      <Badge className={getStatusBadge(rule.status)}>
                        {rule.status.toUpperCase()}
                      </Badge>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Violations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Recent Compliance Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 border border-danger/20 bg-danger/5 rounded-lg">
              <XCircle className="h-5 w-5 text-danger flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-danger">Liquidity Buffer Violation</p>
                <p className="text-sm text-muted-foreground">
                  Buffer fell below 10% minimum threshold at 8:30 AM SGT
                </p>
                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 border border-warning/20 bg-warning/5 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-warning">Technology Sector Exposure Warning</p>
                <p className="text-sm text-muted-foreground">
                  Approaching 25% limit - currently at 22.1%
                </p>
                <p className="text-xs text-muted-foreground mt-1">6 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 border border-success/20 bg-success/5 rounded-lg">
              <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium text-success">Credit Rating Compliance Restored</p>
                <p className="text-sm text-muted-foreground">
                  Portfolio AA- rating restored to 92.3%
                </p>
                <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceAnalystDashboard;