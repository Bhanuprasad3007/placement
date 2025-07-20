import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, IndianRupee, Briefcase, GripVertical, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CompanyCardProps {
  id: string;
  company: string;
  role: string;
  package: string;
  description: string;
  status: string;
  onEdit?: () => void;
}

const statusColors = {
  applied: 'bg-placement-applied/10 text-placement-applied border-placement-applied/20',
  round1: 'bg-placement-round1/10 text-placement-round1 border-placement-round1/20',
  round2: 'bg-placement-round2/10 text-placement-round2 border-placement-round2/20',
  round3: 'bg-placement-round3/10 text-placement-round3 border-placement-round3/20',
  'hr-round': 'bg-placement-hr-round/10 text-placement-hr-round border-placement-hr-round/20',
  placed: 'bg-placement-placed/10 text-placement-placed border-placement-placed/20',
};

export function CompanyCard({ id, company, role, package: packageAmount, description, status, onEdit }: CompanyCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-lg group ${
        isDragging ? 'shadow-2xl scale-105 rotate-3 opacity-50' : ''
      }`}
      {...attributes}
      {...listeners}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-sm leading-tight">{company}</h3>
          </div>
          <div className="flex items-center gap-1">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                <Edit3 className="h-3 w-3" />
              </Button>
            )}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        <div className="flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{role}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <IndianRupee className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold text-primary">{packageAmount}</span>
        </div>
        
        <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        
        <Badge 
          variant="outline" 
          className={`text-xs ${statusColors[status as keyof typeof statusColors] || statusColors.applied}`}
        >
          {status.replace('-', ' ').toUpperCase()}
        </Badge>
      </CardContent>
    </Card>
  );
}