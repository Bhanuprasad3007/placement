import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Building2, Briefcase, IndianRupee, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Company {
  id: string;
  company: string;
  role: string;
  package: string;
  description: string;
  status: string;
}

interface AddCompanyDialogProps {
  onAddCompany: (company: Omit<Company, 'id'>) => void;
}

const statusOptions = [
  { value: 'applied', label: 'Applied' },
  { value: 'round1', label: 'Round 1' },
  { value: 'round2', label: 'Round 2' },
  { value: 'round3', label: 'Round 3' },
  { value: 'hr-round', label: 'HR Round' },
  { value: 'placed', label: 'Placed' },
];

export function AddCompanyDialog({ onAddCompany }: AddCompanyDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    package: '',
    description: '',
    status: 'applied',
  });
  const { toast } = useToast();

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

    onAddCompany(formData);
    
    toast({
      title: "Company Added!",
      description: `${formData.company} has been added to your placement tracker.`,
    });

    // Reset form
    setFormData({
      company: '',
      role: '',
      package: '',
      description: '',
      status: 'applied',
    });
    
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1">
          <Plus className="h-4 w-4 mr-2" />
          Add Company
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Add New Company
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="company"
                  placeholder="e.g., Google"
                  className="pl-10"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Job Role *</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="role"
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
              <Label htmlFor="package">Package *</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="package"
                  placeholder="e.g., ₹45 LPA"
                  className="pl-10"
                  value={formData.package}
                  onChange={(e) => setFormData(prev => ({ ...prev, package: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Current Status</Label>
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
            <Label htmlFor="description">Description</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="description"
                placeholder="Job description, responsibilities, tech stack, etc."
                className="pl-10 min-h-[80px]"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Company
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}