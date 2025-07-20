import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CompanyCard } from './CompanyCard';

interface Company {
  id: string;
  company: string;
  role: string;
  package: string;
  description: string;
  status: string;
}

interface KanbanColumnProps {
  id: string;
  title: string;
  companies: Company[];
  color: string;
  onEditCompany?: (company: Company) => void;
}

const columnIcons = {
  applied: '📝',
  round1: '1️⃣',
  round2: '2️⃣',
  round3: '3️⃣',
  'hr-round': '👥',
  placed: '🎉',
};

export function KanbanColumn({ id, title, companies, color, onEditCompany }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="flex flex-col h-full">
      <Card className={`flex-1 ${isOver ? 'ring-2 ring-primary' : ''}`}>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{columnIcons[id as keyof typeof columnIcons]}</span>
              <h2 className="font-semibold text-sm">{title}</h2>
            </div>
            <Badge variant="secondary" className="text-xs">
              {companies.length}
            </Badge>
          </div>
          <div className={`h-1 rounded-full bg-gradient-to-r ${color}`} />
        </CardHeader>
        
        <CardContent className="pt-0 pb-4">
          <SortableContext items={companies.map(c => c.id)} strategy={verticalListSortingStrategy}>
            <div
              ref={setNodeRef}
              className="space-y-3 min-h-[200px] transition-colors duration-200"
            >
              {companies.map((company) => (
                <CompanyCard 
                  key={company.id} 
                  {...company} 
                  onEdit={() => onEditCompany?.(company)}
                />
              ))}
              {companies.length === 0 && (
                <div className="flex items-center justify-center h-32 text-muted-foreground text-sm border-2 border-dashed border-border rounded-lg">
                  Drop companies here
                </div>
              )}
            </div>
          </SortableContext>
        </CardContent>
      </Card>
    </div>
  );
}