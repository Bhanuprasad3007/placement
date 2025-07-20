import { LoginPage } from '@/components/LoginPage';
import { PlacementBoard } from '@/components/PlacementBoard';
import { PlacementHeader } from '@/components/PlacementHeader';
import { useEffect, useState } from 'react';

interface User {
  name: string;
  email: string;
  college: string;
}

interface Company {
  id: string;
  company: string;
  role: string;
  package: string;
  description: string;
  status: string;
}

// Initial mock data
const initialCompanies: Company[] = [
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
];

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('placement-tracker-user');
    
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);

      // Retrieve user-specific companies
      const allUserCompanies = JSON.parse(localStorage.getItem('placement-tracker-user-companies') || '{}');
      const userCompanies = allUserCompanies[parsedUser.email] || [];
      
      setCompanies(userCompanies);
    } else {
      // Use empty array if no user is logged in
      setCompanies([]);
    }
  }, []);

  // Save companies to localStorage whenever companies change
  useEffect(() => {
    if (user && companies.length > 0) {
      // Retrieve existing user companies
      const allUserCompanies = JSON.parse(localStorage.getItem('placement-tracker-user-companies') || '{}');
      
      // Update companies for the current user
      allUserCompanies[user.email] = companies;
      
      // Save back to localStorage
      localStorage.setItem('placement-tracker-user-companies', JSON.stringify(allUserCompanies));
    }
  }, [companies, user]);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('placement-tracker-user', JSON.stringify(user));
    }
  }, [user]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    
    // Save the exact user details to localStorage
    localStorage.setItem('placement-tracker-user', JSON.stringify(userData));
    
    // Retrieve user-specific companies or start with empty array
    const allUserCompanies = JSON.parse(localStorage.getItem('placement-tracker-user-companies') || '{}');
    const userCompanies = allUserCompanies[userData.email] || [];
    
    setCompanies(userCompanies);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('placement-tracker-user');
    setCompanies([]); // Start with empty array when logging out
  };

  const handleAddCompany = (newCompanyData: Omit<Company, 'id'>) => {
    const newCompany: Company = {
      ...newCompanyData,
      id: Date.now().toString(), // Simple ID generation
    };
    setCompanies(prev => [...prev, newCompany]);
  };

  const handleUpdateCompanies = (updatedCompanies: Company[]) => {
    setCompanies(updatedCompanies);
  };

  // Calculate statistics
  const stats = {
    totalApplications: companies.length,
    placedCount: companies.filter(c => c.status === 'placed').length,
    pendingCount: companies.filter(c => c.status !== 'placed').length,
  };

  // Show login page if user is not authenticated
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        <PlacementHeader 
          {...stats} 
          user={user}
          onLogout={handleLogout}
          onAddCompany={handleAddCompany}
        />
        <PlacementBoard 
          companies={companies}
          onUpdateCompanies={handleUpdateCompanies}
        />
      </div>
    </div>
  );
};

export default Index;
