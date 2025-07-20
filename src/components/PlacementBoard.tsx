import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { KanbanColumn } from './KanbanColumn';
import { CompanyCard } from './CompanyCard';
import { EditCompanyDialog } from './EditCompanyDialog';

interface Company {
  id: string;
  company: string;
  role: string;
  package: string;
  description: string;
  status: string;
}

const columns = [
  { id: 'applied', title: 'Applied', color: 'from-placement-applied to-placement-applied/50' },
  { id: 'round1', title: 'Round 1', color: 'from-placement-round1 to-placement-round1/50' },
  { id: 'round2', title: 'Round 2', color: 'from-placement-round2 to-placement-round2/50' },
  { id: 'round3', title: 'Round 3', color: 'from-placement-round3 to-placement-round3/50' },
  { id: 'hr-round', title: 'HR Round', color: 'from-placement-hr-round to-placement-hr-round/50' },
  { id: 'placed', title: 'Placed', color: 'from-placement-placed to-placement-placed/50' },
];

// Mock data
const mockCompanies: Company[] = [
  {
    id: '1',
    company: 'Google',
    role: 'Software Engineer',
    package: '₹45 LPA',
    description: 'Full-stack development role with focus on scalable systems and cloud infrastructure.',
    status: 'applied',
  },
  {
    id: '2',
    company: 'Microsoft',
    role: 'SDE-1',
    package: '₹38 LPA',
    description: 'Working on Azure cloud services and enterprise solutions.',
    status: 'round1',
  },
  {
    id: '3',
    company: 'Amazon',
    role: 'Software Development Engineer',
    package: '₹42 LPA',
    description: 'E-commerce platform development with microservices architecture.',
    status: 'round2',
  },
  {
    id: '4',
    company: 'Meta',
    role: 'Frontend Engineer',
    package: '₹50 LPA',
    description: 'React ecosystem development for social media platforms.',
    status: 'round3',
  },
  {
    id: '5',
    company: 'Netflix',
    role: 'Full Stack Developer',
    package: '₹48 LPA',
    description: 'Streaming platform optimization and content delivery systems.',
    status: 'hr-round',
  },
  {
    id: '6',
    company: 'Flipkart',
    role: 'Senior Software Engineer',
    package: '₹32 LPA',
    description: 'E-commerce solutions and payment gateway integration.',
    status: 'placed',
  },
  {
    id: '7',
    company: 'Zomato',
    role: 'Backend Engineer',
    package: '₹28 LPA',
    description: 'Food delivery platform backend services and API development.',
    status: 'applied',
  },
  {
    id: '8',
    company: 'Swiggy',
    role: 'DevOps Engineer',
    package: '₹30 LPA',
    description: 'Infrastructure automation and deployment pipeline optimization.',
    status: 'round1',
  },
];

interface PlacementBoardProps {
  companies: Company[];
  onUpdateCompanies: (companies: Company[]) => void;
}

export function PlacementBoard({ companies, onUpdateCompanies }: PlacementBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Configure sensors for better drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    console.log('Drag end:', { activeId, overId });

    // Find the active company
    const activeCompany = companies.find(c => c.id === activeId);
    if (!activeCompany) {
      setActiveId(null);
      return;
    }

    // Check if we're dropping on a column OR another card
    let targetColumnId = null;
    
    // First check if dropping directly on a column
    const targetColumn = columns.find(col => col.id === overId);
    if (targetColumn) {
      targetColumnId = targetColumn.id;
    } else {
      // Check if dropping on another card - find which column that card belongs to
      const targetCompany = companies.find(c => c.id === overId);
      if (targetCompany) {
        targetColumnId = targetCompany.status;
      }
    }

    if (targetColumnId && targetColumnId !== activeCompany.status) {
      console.log('Moving company to column:', targetColumnId);
      const updatedCompanies = companies.map(company => 
        company.id === activeId 
          ? { ...company, status: targetColumnId }
          : company
      );
      onUpdateCompanies(updatedCompanies);
    }

    setActiveId(null);
  };

  const handleEditCompany = (company: Company) => {
    setEditingCompany(company);
    setEditDialogOpen(true);
  };

  const handleUpdateCompany = (updatedCompany: Company) => {
    const updatedCompanies = companies.map(company =>
      company.id === updatedCompany.id ? updatedCompany : company
    );
    onUpdateCompanies(updatedCompanies);
  };

  const handleDeleteCompany = (id: string) => {
    const updatedCompanies = companies.filter(company => company.id !== id);
    onUpdateCompanies(updatedCompanies);
  };

  const getCompaniesByStatus = (status: string) => {
    return companies.filter(company => company.status === status);
  };

  const activeCompany = companies.find(c => c.id === activeId);

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-6 h-full">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            companies={getCompaniesByStatus(column.id)}
            color={column.color}
            onEditCompany={handleEditCompany}
          />
        ))}
      </div>
      
      <EditCompanyDialog
        company={editingCompany}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onUpdateCompany={handleUpdateCompany}
        onDeleteCompany={handleDeleteCompany}
      />
      
      <DragOverlay>
        {activeCompany ? (
          <CompanyCard
            id={activeCompany.id}
            company={activeCompany.company}
            role={activeCompany.role}
            package={activeCompany.package}
            description={activeCompany.description}
            status={activeCompany.status}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}