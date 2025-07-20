import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, TrendingUp, LogOut } from 'lucide-react';
import { AddCompanyDialog } from './AddCompanyDialog';

interface Company {
  id: string;
  company: string;
  role: string;
  package: string;
  description: string;
  status: string;
}

interface User {
  name: string;
  email: string;
  college: string;
}

interface PlacementHeaderProps {
  totalApplications: number;
  placedCount: number;
  pendingCount: number;
  user?: User;
  onLogout?: () => void;
  onAddCompany?: (company: Omit<Company, 'id'>) => void;
}

export function PlacementHeader({ totalApplications, placedCount, pendingCount, user, onLogout, onAddCompany }: PlacementHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-placement-applied to-placement-placed p-8 text-primary-foreground">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Placement Tracker</h1>
              <p className="text-primary-foreground/80 text-lg">
                Track your placement journey with style
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="h-8 w-8" />
                <div>
                  <p className="font-semibold">{user?.name || 'Demo User'}</p>
                  <p className="text-sm text-primary-foreground/70">{user?.college || 'Demo College'}</p>
                </div>
              </div>
              {onLogout && (
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={onLogout}
                  className="bg-white/10 hover:bg-white/20 text-white border-white/20"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-placement-applied/10">
                <TrendingUp className="h-5 w-5 text-placement-applied" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalApplications}</p>
                <p className="text-sm text-muted-foreground">Total Applied</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-placement-placed/10">
                <Badge className="bg-placement-placed text-white">🎉</Badge>
              </div>
              <div>
                <p className="text-2xl font-bold text-placement-placed">{placedCount}</p>
                <p className="text-sm text-muted-foreground">Placed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-placement-round2/10">
                <div className="h-5 w-5 rounded-full bg-placement-round2" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingCount}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              {onAddCompany ? (
                <AddCompanyDialog onAddCompany={onAddCompany} />
              ) : (
                <Button className="flex-1" size="sm" disabled>
                  Add Company
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}