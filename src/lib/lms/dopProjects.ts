import type { LMSPhaseProject } from './types';

/** Phase-aligned portfolio projects for the DOP program (one per phase, sequential). */
export const DOP_PHASE_PROJECTS: Record<string, LMSPhaseProject> = {
  'phase-1': {
    label: 'Project 1',
    title: 'Cloud Infrastructure Automation Platform',
    description:
      'Design and implement a cloud environment with IAM users, VPC networking, EC2 instances, and S3 storage — automating repetitive admin tasks with Bash scripting.',
    deliverables: [
      'IAM users, VPC, EC2, and S3 setup',
      'Bash scripts to automate admin tasks',
    ],
    skills: ['Linux', 'Bash', 'Git', 'AWS IAM', 'EC2', 'S3', 'VPC'],
    moduleId: 1,
  },
  'phase-2': {
    label: 'Project 2',
    title: 'Production Application Delivery Platform',
    description:
      'Containerize an application, deploy it on Kubernetes, and build an automated CI/CD pipeline that tests, builds, and deploys updates to production.',
    deliverables: [
      'Containerized application',
      'Kubernetes deployment',
      'Automated CI/CD pipeline (test → build → deploy)',
    ],
    skills: ['Docker', 'Kubernetes', 'Helm', 'Jenkins', 'GitHub Actions'],
    moduleId: 2,
  },
  'phase-3': {
    label: 'Project 3',
    title: 'Enterprise Infrastructure Automation Platform',
    description:
      'Provision multi-environment infrastructure with Terraform and Ansible while implementing security controls, secrets management, and automated compliance checks.',
    deliverables: [
      'Terraform + Ansible multi-environment infrastructure',
      'Security controls, secrets management, and compliance checks',
    ],
    skills: ['Terraform', 'Ansible', 'DevSecOps', 'Vault'],
    moduleId: 3,
  },
  'phase-4': {
    label: 'Capstone',
    title: 'AI-Powered DevOps Command Center',
    description:
      'Architect and deploy an end-to-end production-grade DevOps platform — infrastructure automation, Kubernetes orchestration, CI/CD, observability, security controls, and AI-assisted operations ready for recruiter review.',
    deliverables: [
      'Kubernetes Production Cluster',
      'CI/CD Deployment Pipeline',
      'Infrastructure as Code Platform',
      'Monitoring & Alerting Stack (Prometheus, Grafana)',
      'AI-Powered Incident Assistant',
      'Security & Compliance Controls',
    ],
    skills: [
      'AWS',
      'Docker',
      'Kubernetes',
      'Terraform',
      'Ansible',
      'Jenkins',
      'GitHub Actions',
      'Prometheus',
      'Grafana',
      'DevSecOps',
      'AIOps',
      'SRE',
    ],
    moduleId: 4,
    isCapstone: true,
  },
};

export function getDopPhaseProject(phaseSlug: string): LMSPhaseProject | undefined {
  const normalized = phaseSlug.startsWith('p') && phaseSlug.length === 2
    ? `phase-${phaseSlug.slice(1)}`
    : phaseSlug;
  return DOP_PHASE_PROJECTS[normalized];
}

export function getDopProjectByModuleId(moduleId: number): LMSPhaseProject | undefined {
  return Object.values(DOP_PHASE_PROJECTS).find((p) => p.moduleId === moduleId);
}

export function getDopProjectsList(): LMSPhaseProject[] {
  return ['phase-1', 'phase-2', 'phase-3', 'phase-4']
    .map((slug) => DOP_PHASE_PROJECTS[slug])
    .filter(Boolean);
}
