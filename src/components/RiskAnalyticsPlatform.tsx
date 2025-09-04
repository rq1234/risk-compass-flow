import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Shield, 
  TrendingUp, 
  Settings,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity
} from 'lucide-react';
import ReportingAnalystDashboard from './personas/ReportingAnalystDashboard';
import ComplianceAnalystDashboard from './personas/ComplianceAnalystDashboard';
import PortfolioManagerDashboard from './personas/PortfolioManagerDashboard';
import EngineeringLeadDashboard from './personas/EngineeringLeadDashboard';

export type Persona = 'wei-jie' | 'sheryl' | 'cheng-yi' | 'gio';

interface PersonaInfo {
  id: Persona;
  name: string;
  role: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const personas: PersonaInfo[] = [
  {
    id: 'wei-jie',
    name: 'Wei Jie',
    role: 'Reporting Analyst',
    icon: <BarChart3 className="h-5 w-5" />,
    color: 'bg-chart-1',
    description: 'Recurring reports for committees and regulators'
  },
  {
    id: 'sheryl',
    name: 'Sheryl',
    role: 'Compliance Analyst',
    icon: <Shield className="h-5 w-5" />,
    color: 'bg-chart-2',
    description: 'Ensure compliance with MAS regulations and GIC guidelines'
  },
  {
    id: 'cheng-yi',
    name: 'Cheng Yi',
    role: 'Portfolio Manager',
    icon: <TrendingUp className="h-5 w-5" />,
    color: 'bg-chart-3',
    description: 'Balance risk vs return, test scenarios'
  },
  {
    id: 'gio',
    name: 'Gio',
    role: 'Engineering Lead',
    icon: <Settings className="h-5 w-5" />,
    color: 'bg-chart-4',
    description: 'System reliability and scalability'
  }
];

const RiskAnalyticsPlatform: React.FC = () => {
  const [currentPersona, setCurrentPersona] = useState<Persona>('wei-jie');

  const currentPersonaInfo = personas.find(p => p.id === currentPersona);

  const renderDashboard = () => {
    switch (currentPersona) {
      case 'wei-jie':
        return <ReportingAnalystDashboard />;
      case 'sheryl':
        return <ComplianceAnalystDashboard />;
      case 'cheng-yi':
        return <PortfolioManagerDashboard />;
      case 'gio':
        return <EngineeringLeadDashboard />;
      default:
        return <ReportingAnalystDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">GIC Risk Analytics</h1>
                <p className="text-sm text-muted-foreground">Investment Risk Management Platform</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={currentPersona} onValueChange={(value) => setCurrentPersona(value as Persona)}>
              <SelectTrigger className="w-64">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {personas.map((persona) => (
                  <SelectItem key={persona.id} value={persona.id}>
                    <div className="flex items-center gap-3">
                      <div className={`p-1 rounded ${persona.color} text-white`}>
                        {persona.icon}
                      </div>
                      <div>
                        <div className="font-medium">{persona.name}</div>
                        <div className="text-xs text-muted-foreground">{persona.role}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Current Persona Info */}
      <div className="border-b border-border bg-surface">
        <div className="px-6 py-3">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${currentPersonaInfo?.color} text-white`}>
              {currentPersonaInfo?.icon}
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{currentPersonaInfo?.name} - {currentPersonaInfo?.role}</h2>
              <p className="text-sm text-muted-foreground">{currentPersonaInfo?.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <main className="p-6">
        {renderDashboard()}
      </main>
    </div>
  );
};

export default RiskAnalyticsPlatform;