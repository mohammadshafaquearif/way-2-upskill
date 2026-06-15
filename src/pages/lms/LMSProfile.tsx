import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Github, Linkedin, Mail, MapPin, Phone, Save, User } from 'lucide-react';
import InvoiceDownloadCard from '@/components/lms/InvoiceDownloadCard';

const LMSProfile = () => {
  const { user } = useAuth();
  const { learnerState, enrollments } = useLearnerProgram();
  const [linkedin, setLinkedin] = useState('');
  const [github, setGithub] = useState('');
  const [country, setCountry] = useState('');

  const handleSave = () => {
    toast({
      title: 'Profile updated',
      description: 'Your learner profile has been saved.',
    });
  };

  if (!user) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your learner information and social profiles.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <CardTitle>{user.firstName} {user.lastName}</CardTitle>
              {learnerState && (
                <Badge variant="secondary" className="mt-1">{learnerState.programCode} Learner</Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input defaultValue={user.firstName} readOnly className="bg-muted/50" />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input defaultValue={user.lastName} readOnly className="bg-muted/50" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Mail className="h-4 w-4" /> Email
            </Label>
            <Input defaultValue={user.email} readOnly className="bg-muted/50" />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Phone className="h-4 w-4" /> Phone
            </Label>
            <Input defaultValue={user.phone} readOnly className="bg-muted/50" />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Country
            </Label>
            <Input
              placeholder="e.g. India, UAE, USA"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </Label>
            <Input
              placeholder="https://linkedin.com/in/yourprofile"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Github className="h-4 w-4" /> GitHub
            </Label>
            <Input
              placeholder="https://github.com/yourusername"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>

          <Button onClick={handleSave} className="cursor-pointer">
            <Save className="mr-2 h-4 w-4" />
            Save Profile
          </Button>
        </CardContent>
      </Card>

      <InvoiceDownloadCard enrollments={enrollments} />
    </div>
  );
};

export default LMSProfile;
