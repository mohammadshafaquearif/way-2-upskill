import React from 'react';
import { Link } from 'react-router-dom';
import { useLearnerProgram } from '@/hooks/useLearnerProgram';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Award, Download, Lock, ShieldCheck } from 'lucide-react';

const LMSCertificate = () => {
  const { learnerState } = useLearnerProgram();

  if (!learnerState) return null;

  const locked = learnerState.certificateLocked;
  const remaining = Math.max(0, 80 - learnerState.progress);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Certificate</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Complete your program to unlock your verified Zyvotrix certificate.
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className={`p-8 text-center ${locked ? 'bg-muted/40' : 'bg-gradient-to-br from-primary/10 via-background to-secondary/10'}`}>
          <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${locked ? 'bg-muted' : 'bg-primary/10'}`}>
            {locked ? (
              <Lock className="h-10 w-10 text-muted-foreground" />
            ) : (
              <Award className="h-10 w-10 text-primary" />
            )}
          </div>

          {locked ? (
            <>
              <h2 className="text-xl font-bold">Certificate Locked</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Reach 80% program completion to unlock your certificate.
              </p>
              <div className="mx-auto mt-6 max-w-xs">
                <div className="mb-2 flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-bold">{learnerState.progress}%</span>
                </div>
                <Progress value={learnerState.progress} className="h-2" />
                <p className="mt-2 text-xs text-muted-foreground">{remaining}% remaining</p>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold">Congratulations!</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                You have completed {learnerState.programTitle}.
              </p>
              {learnerState.certificateId && (
                <div className="mt-4 rounded-lg border bg-background/80 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Certificate ID</p>
                  <p className="mt-1 font-mono text-lg font-bold text-primary">{learnerState.certificateId}</p>
                </div>
              )}
              <Button className="mt-6 cursor-pointer" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download Certificate
              </Button>
            </>
          )}
        </div>

        <CardContent className="p-6">
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="font-medium text-foreground">Verified by Zyvotrix</p>
              <p className="mt-1">
                Your certificate can be verified publicly at{' '}
                <Link to="/verify-certificate" className="font-medium text-primary hover:underline">
                  verify-certificate
                </Link>
                .
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LMSCertificate;
