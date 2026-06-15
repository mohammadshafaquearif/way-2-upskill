import React, { useState } from 'react';
import type { CountryCode } from 'libphonenumber-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PhoneInput from '@/components/PhoneInput';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/integrations/api/client';
import { useAuth } from '@/contexts/AuthContext';
import { DEFAULT_COUNTRY, toE164, validatePhone } from '@/lib/phone';

interface LoginSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginSignupModal: React.FC<LoginSignupModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  // Login form state
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // Signup form state
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    interestedSubject: ''
  });
  const [phoneCountry, setPhoneCountry] = useState<CountryCode>(DEFAULT_COUNTRY);
  const [nationalNumber, setNationalNumber] = useState('');

  // Form validation state
  const [signupErrors, setSignupErrors] = useState<{[key: string]: string}>({});

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubjectChange = (value: string) => {
    setSignupData({
      ...signupData,
      interestedSubject: value
    });
  };

  // Validation functions
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateSignupForm = () => {
    const errors: {[key: string]: string} = {};

    if (!signupData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!signupData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!signupData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(signupData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!nationalNumber.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!validatePhone(nationalNumber, phoneCountry)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!signupData.password.trim()) {
      errors.password = 'Password is required';
    } else if (signupData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!signupData.confirmPassword.trim()) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (signupData.password !== signupData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!signupData.interestedSubject) {
      errors.interestedSubject = 'Please select your area of interest';
    }

    setSignupErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isSignupFormValid = () => {
    return (
      signupData.firstName.trim() &&
      signupData.lastName.trim() &&
      signupData.email.trim() &&
      validateEmail(signupData.email) &&
      nationalNumber.trim() &&
      validatePhone(nationalNumber, phoneCountry) &&
      signupData.password.trim() &&
      signupData.password.length >= 6 &&
      signupData.confirmPassword.trim() &&
      signupData.password === signupData.confirmPassword &&
      signupData.interestedSubject
    );
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const email = loginData.username.trim();
      if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      const { appUser } = await apiClient.signIn(email, loginData.password);

      toast({
        title: "Login Successful!",
        description: "Welcome back to Zyvotrix!",
      });

      login(appUser);
      onClose();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast({
        title: "Login Failed",
        description: message.includes('Invalid login') || message.includes('not found')
          ? "Invalid email or password. Please sign up first."
          : message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSignupForm()) {
      return;
    }
    
    setIsLoading(true);

    try {
      const fullPhone = toE164(nationalNumber, phoneCountry);
      const { appUser } = await apiClient.signUp({
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        phone: fullPhone,
        email: signupData.email,
        password: signupData.password,
        interestedSubject: signupData.interestedSubject,
      });

      toast({
        title: "Account Created!",
        description: "Welcome to Zyvotrix! Your account has been created successfully.",
      });

      login(appUser);

      // Reset form
      setSignupData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        interestedSubject: ''
      });
      setPhoneCountry(DEFAULT_COUNTRY);
      setNationalNumber('');
      setSignupErrors({});

      onClose();
    } catch (error) {
      console.error("Signup error:", error);
      const description =
        error instanceof Error ? error.message : 'There was an error creating your account. Please try again.';
      toast({
        title: "Signup Failed",
        description,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await apiClient.resetPassword(forgotPasswordEmail);

      toast({
        title: "Password Reset Email Sent!",
        description: `Check ${forgotPasswordEmail} and open the latest link within 1 hour. It will take you to reset your password.`,
      });
      
      setShowForgotPassword(false);
      setForgotPasswordEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send password reset email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[500px] max-h-[min(90dvh,720px)] overflow-y-auto p-0 sm:w-full">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-2xl font-bold text-center">Welcome to Zyvotrix</DialogTitle>
        </DialogHeader>
        
        <div className="px-6 pb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="font-semibold">Login</TabsTrigger>
              <TabsTrigger value="signup" className="font-semibold">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-semibold">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="username"
                    name="username"
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.username}
                    onChange={handleLoginChange}
                    required
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold">Password <span className="text-red-500">*</span></Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                    className="h-12"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 font-bold text-base brand-gradient hover:opacity-90 border-0 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
                
                <div className="text-center space-y-3">
                  <button 
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Forgot Password?
                  </button>
                  
                  <div className="text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <button 
                      type="button"
                      onClick={() => setActiveTab('signup')}
                      className="text-primary hover:underline font-medium"
                    >
                      Sign up here
                    </button>
                  </div>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-semibold">First Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="First name"
                      value={signupData.firstName}
                      onChange={handleSignupChange}
                      required
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-semibold">Last Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Last name"
                      value={signupData.lastName}
                      onChange={handleSignupChange}
                      required
                      className="h-12"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">Email <span className="text-red-500">*</span></Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    required
                    className={`h-12 ${signupErrors.email ? 'border-red-500' : ''}`}
                  />
                  {signupErrors.email && <p className="text-red-500 text-sm">{signupErrors.email}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold">Phone Number <span className="text-red-500">*</span></Label>
                  <PhoneInput
                    id="phone"
                    country={phoneCountry}
                    nationalNumber={nationalNumber}
                    onCountryChange={setPhoneCountry}
                    onNationalNumberChange={setNationalNumber}
                    required
                    inputClassName={`h-12 flex-1 ${signupErrors.phone ? 'border-red-500' : ''}`}
                    selectTriggerClassName="h-12 w-[6.5rem] shrink-0"
                  />
                  {signupErrors.phone && <p className="text-red-500 text-sm">{signupErrors.phone}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold">Password <span className="text-red-500">*</span></Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    required
                    className={`h-12 ${signupErrors.password ? 'border-red-500' : ''}`}
                  />
                  {signupErrors.password && <p className="text-red-500 text-sm">{signupErrors.password}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-semibold">Confirm Password <span className="text-red-500">*</span></Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    required
                    className={`h-12 ${signupErrors.confirmPassword ? 'border-red-500' : ''}`}
                  />
                  {signupErrors.confirmPassword && <p className="text-red-500 text-sm">{signupErrors.confirmPassword}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="interestedSubject" className="text-sm font-semibold">Interested In Which Subject? <span className="text-red-500">*</span></Label>
                  <Select onValueChange={handleSubjectChange} value={signupData.interestedSubject}>
                    <SelectTrigger className={`h-12 ${signupErrors.interestedSubject ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select your area of interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dop">AI-Powered DevOps (DOP)</SelectItem>
                      <SelectItem value="aac">Agentic AI (AAC)</SelectItem>
                      <SelectItem value="aws">AWS Solutions Architect</SelectItem>
                      <SelectItem value="data-science">Data Science with Python</SelectItem>
                      <SelectItem value="all">All Programs</SelectItem>
                    </SelectContent>
                  </Select>
                  {signupErrors.interestedSubject && <p className="text-red-500 text-sm">{signupErrors.interestedSubject}</p>}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 font-bold text-base brand-gradient hover:opacity-90 border-0 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !isSignupFormValid()}
                >
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </Button>
                
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <button 
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="text-primary hover:underline font-medium"
                    >
                      Login here
                    </button>
                  </div>
                </div>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              By signing up, you agree to our{' '}
              <a href="#" className="text-primary hover:underline font-medium">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-primary hover:underline font-medium">Privacy Policy</a>
            </p>
          </div>
        </div>
      </DialogContent>
      </Dialog>
      
      {/* Forgot Password Modal */}
      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Forgot Password?</DialogTitle>
          </DialogHeader>
          
          <div className="px-6 pb-6">
            <p className="text-muted-foreground text-center mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="forgotEmail" className="text-sm font-semibold">Email Address</Label>
                <Input
                  id="forgotEmail"
                  type="email"
                  placeholder="Enter your email address"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              
              <div className="flex space-x-3">
                <Button 
                  type="button"
                  variant="outline" 
                  className="flex-1 h-12"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="flex-1 h-12 font-bold brand-gradient hover:opacity-90 border-0 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </div>
            </form>
            
            <div className="mt-4 text-center">
              <button 
                type="button"
                onClick={() => {
                  setShowForgotPassword(false);
                  setActiveTab('login');
                }}
                className="text-sm text-primary hover:underline font-medium"
              >
                Back to Login
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginSignupModal;
