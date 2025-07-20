import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Briefcase, IndianRupee, FileText, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Company {
  id: string;
  company: string;
  role: string;
  package: string;
  description: string;
  status: string;
}

interface EditCompanyDialogProps {
  company: Company | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateCompany: (company: Company) => void;
  onDeleteCompany: (id: string) => void;
}

const statusOptions = [
  { value: 'applied', label: 'Applied' },
  { value: 'round1', label: 'Round 1' },
  { value: 'round2', label: 'Round 2' },
  { value: 'round3', label: 'Round 3' },
  { value: 'hr-round', label: 'HR Round' },
  { value: 'placed', label: 'Placed' },
];

export function EditCompanyDialog({ company, open, onOpenChange, onUpdateCompany, onDeleteCompany }: EditCompanyDialogProps) {
  const [formData, setFormData] = useState(company || {
    id: '',
    company: '',
    role: '',
    package: '',
    description: '',
    status: 'applied',
  });
  const { toast } = useToast();

  React.useEffect(() => {
    if (company) {
      setFormData(company);
    }
  }, [company]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.company || !formData.role || !formData.package) {
      toast({
        title: "Missing Information",
        description: "Please fill in company name, role, and package.",
        variant: "destructive",
      });
      return;
    }

    onUpdateCompany(formData);
    
    toast({
      title: "Company Updated!",
      description: `${formData.company} information has been updated.`,
    });
    
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (company) {
      onDeleteCompany(company.id);
      toast({
        title: "Company Deleted",
        description: `${company.company} has been removed from your tracker.`,
        variant: "destructive",
      });
      onOpenChange(false);
    }
  };

  if (!company) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Edit Company Details
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-company">Company Name *</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="edit-company"
                  placeholder="e.g., Google"
                  className="pl-10"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-role">Job Role *</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="edit-role"
                  placeholder="e.g., Software Engineer"
                  className="pl-10"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-package">Package *</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="edit-package"
                  placeholder="e.g., ₹45 LPA"
                  className="pl-10"
                  value={formData.package}
                  onChange={(e) => setFormData(prev => ({ ...prev, package: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-status">Current Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="edit-description"
                placeholder="Job description, responsibilities, tech stack, etc."
                className="pl-10 min-h-[80px]"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDelete}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
            <div className="flex-1" />
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Update Company
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}