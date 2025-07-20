import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Building2, GraduationCap, Lock, Mail, User } from 'lucide-react';
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (user: { name: string; email: string; college: string }) => void;
}

export function LoginPage({ onLogin }: LoginProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    college: '',
    branch: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (isLogin) {
      // Login flow
      if (!formData.email || !formData.password) {
        setError('Please enter email and password');
        return;
      }

      // Check if user exists in localStorage
      const storedUsers = JSON.parse(localStorage.getItem('placement-tracker-users') || '[]');
      const user = storedUsers.find(
        (u: any) => u.email === formData.email && u.password === formData.password
      );

      if (user) {
        // Successful login
        onLogin({
          name: user.name,
          email: user.email,
          college: user.college
        });
      } else {
        setError('Invalid email or password');
      }
    } else {
      // Signup flow
      if (!formData.name || !formData.email || !formData.password || !formData.college) {
        setError('Please fill in all fields');
        return;
      }

      // Check if user already exists
      const storedUsers = JSON.parse(localStorage.getItem('placement-tracker-users') || '[]');
      const existingUser = storedUsers.find((u: any) => u.email === formData.email);

      if (existingUser) {
        setError('User with this email already exists');
        return;
      }

      // Create new user
      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        college: formData.college,
        branch: formData.branch,
        createdAt: new Date().toISOString() // Add creation timestamp
      };

      const updatedUsers = [...storedUsers, newUser];
      localStorage.setItem('placement-tracker-users', JSON.stringify(updatedUsers));

      // Log in the new user
      onLogin({
        name: newUser.name,
        email: newUser.email,
        college: newUser.college
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo/Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-placement-applied rounded-2xl flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-placement-applied bg-clip-text text-transparent">
            Placement Tracker
          </h1>
          <p className="text-muted-foreground">
            Track your placement journey with ease
          </p>
        </div>

        <Card className="border-0 shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-2xl text-center">
              {isLogin ? 'Sign In' : 'Create Account'}
            </CardTitle>
            <p className="text-center text-muted-foreground">
              {isLogin 
                ? 'Welcome back! Enter your credentials to access your dashboard.' 
                : 'Join thousands of students tracking their placements.'
              }
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-center mb-4">
                {error}
              </div>
            )}

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your college email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="college">College</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="college"
                        placeholder="College name"
                        className="pl-10"
                        value={formData.college}
                        onChange={(e) => setFormData(prev => ({ ...prev, college: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch</Label>
                    <Input
                      id="branch"
                      placeholder="CSE, ECE, etc."
                      value={formData.branch}
                      onChange={(e) => setFormData(prev => ({ ...prev, branch: e.target.value }))}
                    />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full h-11">
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="text-center">
              <Button
                variant="link"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(''); // Clear any previous errors
                }}
                className="text-sm"
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"
                }
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Join thousands of students already using Placement Tracker
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary">🎯 Kanban Board</Badge>
            <Badge variant="secondary">📧 Gmail Integration</Badge>
            <Badge variant="secondary">📊 Analytics</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}