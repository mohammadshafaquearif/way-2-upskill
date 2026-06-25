import type { ResourceSection } from '@/lib/resources/types';

export const DEVOPS_ROADMAP_2026_SECTIONS: ResourceSection[] = [
  {
    heading: 'Introduction',
    body: 'DevOps in 2026 is less about “tools” and more about building reliable delivery systems: fast releases, safe rollbacks, secure pipelines, and observable production. This roadmap is a structured learning plan for working professionals who want to become job-ready DevOps engineers through hands-on projects — not theory alone.\n\nFollow the phases in order, ship at least one mini-project per phase, and document everything (README + diagrams + screenshots) to build a portfolio recruiters can trust.',
  },
  {
    heading: 'Why Learn DevOps in 2026?',
    body: 'Modern teams ship continuously. Companies need engineers who can automate delivery, reduce downtime, improve reliability, and scale infrastructure safely. DevOps skills also overlap heavily with Cloud, SRE, Platform Engineering, and Security — making it one of the highest leverage career paths.',
    bullets: [
      'High demand across startups and enterprise IT modernization',
      'Strong overlap with AWS + Kubernetes + Terraform',
      'Clear portfolio path: CI/CD, IaC, deployments, monitoring',
      'Remote-friendly roles with global opportunities',
    ],
  },
  {
    heading: 'What Does a DevOps Engineer Do?',
    body: 'A DevOps engineer enables fast, safe delivery. They design CI/CD pipelines, automate infrastructure, improve reliability, and create developer-friendly platforms.\n\nTypical responsibilities:',
    bullets: [
      'Build CI/CD pipelines (test → build → scan → deploy)',
      'Containerize apps and manage deployments (Docker/Kubernetes)',
      'Provision infrastructure with IaC (Terraform/CloudFormation)',
      'Implement monitoring, alerting, and incident workflows',
      'Improve security posture (secrets, IAM, scanning, policies)',
      'Optimize performance, availability, and cost',
    ],
  },
  {
    heading: 'Skills Required to Become a DevOps Engineer',
    body: 'DevOps is a systems role. You need fundamentals (Linux + networking), delivery automation (CI/CD), infrastructure (cloud + IaC), and operations (observability).',
    subheadings: [
      { title: 'Linux', body: 'Shell, processes, permissions, systemd, logs, troubleshooting.' },
      { title: 'Networking', body: 'DNS, TCP/UDP, HTTP, TLS, load balancing basics.' },
      { title: 'Git', body: 'Branching strategies, PR workflows, tagging, release practices.' },
      { title: 'Containers', body: 'Docker images, registries, compose, security basics.' },
      { title: 'Kubernetes', body: 'Deployments, Services, Ingress, Helm, autoscaling.' },
      { title: 'IaC', body: 'Terraform modules/state, environments, drift management.' },
      { title: 'CI/CD', body: 'Pipelines, quality gates, artifact management, blue/green.' },
      { title: 'Observability', body: 'Logs, metrics, traces, alerting, SLOs.' },
      { title: 'Security', body: 'Secrets, IAM, scanning, policy as code, DevSecOps.' },
    ],
  },
  {
    heading: 'DevOps Roadmap 2026',
    body: 'Use this phase-by-phase path. Spend 1–2 weeks per phase and ship something small at the end of each phase. By the final phase you should have 3–5 strong portfolio projects.',
    subheadings: [
      {
        title: 'Phase 1: Linux Fundamentals',
        body: 'Filesystems, permissions, SSH, users/groups, packages, logs, and troubleshooting.',
      },
      {
        title: 'Phase 2: Networking Basics',
        body: 'DNS, ports, HTTP/HTTPS, TLS, proxies, load balancers, debugging connectivity.',
      },
      {
        title: 'Phase 3: Git & Collaboration',
        body: 'Branching, PRs, tags, releases, semantic versioning, code review workflow.',
      },
      {
        title: 'Phase 4: Containers with Docker',
        body: 'Dockerfiles, images, registries, compose, container security, best practices.',
      },
      {
        title: 'Phase 5: CI/CD Foundations',
        body: 'Pipeline design, tests, linting, build artifacts, release automation.',
      },
      {
        title: 'Phase 6: Kubernetes Core',
        body: 'Pods, Deployments, Services, Ingress, ConfigMaps/Secrets, RBAC.',
      },
      {
        title: 'Phase 7: Helm & Packaging',
        body: 'Helm charts, templating, values, environment overlays, versioned releases.',
      },
      {
        title: 'Phase 8: Infrastructure as Code (Terraform)',
        body: 'Providers, modules, state, workspaces, environments, drift detection.',
      },
      {
        title: 'Phase 9: Cloud Fundamentals (AWS)',
        body: 'IAM, VPC basics, EC2, S3, load balancing, scaling patterns.',
      },
      {
        title: 'Phase 10: Observability',
        body: 'Metrics, logs, traces; dashboards; alerting; incident response workflows.',
      },
      {
        title: 'Phase 11: DevSecOps',
        body: 'Secrets management, image scanning, SAST/DAST basics, policy as code.',
      },
      {
        title: 'Phase 12: Production Readiness',
        body: 'HA patterns, backups, DR basics, performance, cost optimization, runbooks.',
      },
    ],
  },
  {
    heading: 'DevOps Projects to Build in 2026',
    body: 'Projects are your proof. Ship these (or equivalents) and publish them with clean READMEs and architecture diagrams:',
    bullets: [
      'CI/CD pipeline for a real app (tests + build + deploy)',
      'Dockerized microservice with multi-stage build + health checks',
      'Kubernetes deployment with Ingress + autoscaling + config/secret management',
      'Terraform VPC + compute stack with environments (dev/stage/prod)',
      'Monitoring stack: dashboards + alert rules + incident playbook',
      'Capstone: end-to-end production deployment (GitOps/Helm) with SLOs',
    ],
  },
  {
    heading: 'Recommended Tools in 2026',
    bullets: [
      'CI/CD: GitHub Actions, GitLab CI, Jenkins (legacy awareness), Argo CD',
      'Containers: Docker, container registries, Trivy scanning',
      'Kubernetes: Helm, kubectl, Kustomize, Ingress controllers',
      'IaC: Terraform, Terragrunt (awareness), CloudFormation (awareness)',
      'Observability: Prometheus/Grafana, CloudWatch, ELK/OpenSearch',
      'Secrets: SSM Parameter Store, Secrets Manager, Vault (awareness)',
    ],
  },
  {
    heading: 'Common Mistakes Beginners Make',
    bullets: [
      'Jumping to Kubernetes before Linux/networking fundamentals',
      'Building pipelines without tests/quality gates',
      'Hardcoding secrets in repos or configs',
      'Not using IaC — manual console clicks don’t scale',
      'No monitoring/alerting in “production” projects',
      'Focusing on certificates instead of deployable proof-of-work',
    ],
  },
  {
    heading: 'Career Opportunities',
    body: 'DevOps skills unlock multiple roles depending on your strengths:',
    bullets: [
      'DevOps Engineer',
      'Site Reliability Engineer (SRE)',
      'Platform Engineer',
      'Cloud Engineer',
      'Infrastructure Engineer',
      'DevSecOps Engineer',
    ],
  },
  {
    heading: 'Expected Salary Trends in 2026',
    body: 'Salaries depend on your ability to operate production systems (not just tool familiarity). Portfolio + real deployment experience typically beats certificates.',
    table: {
      headers: ['Experience', 'India (annual)', 'Global / Remote (annual)'],
      rows: [
        ['Entry (0–2 yrs)', '₹6–14 LPA', '$80k–115k'],
        ['Mid (3–5 yrs)', '₹14–28 LPA', '$115k–155k'],
        ['Senior (5+ yrs)', '₹28–50+ LPA', '$155k–200k+'],
      ],
    },
  },
  {
    heading: 'Final Learning Plan',
    body: 'A practical 12-week plan (8–10 hrs/week):',
    bullets: [
      'Weeks 1–2: Linux + Networking (Phases 1–2)',
      'Weeks 3–4: Git + Docker (Phases 3–4)',
      'Weeks 5–6: CI/CD + Kubernetes core (Phases 5–6)',
      'Weeks 7–8: Helm + Terraform (Phases 7–8)',
      'Weeks 9–10: Cloud + Observability (Phases 9–10)',
      'Weeks 11–12: DevSecOps + Capstone (Phases 11–12)',
    ],
  },
  {
    heading: 'Frequently Asked Questions (FAQs)',
    subheadings: [
      {
        title: 'Do I need coding to learn DevOps?',
        body: 'Basic scripting helps, but DevOps is more about automation, systems, and reliability. You can start without being an advanced developer.',
      },
      {
        title: 'Kubernetes or Terraform first?',
        body: 'Learn Docker first, then Kubernetes basics, then Terraform. In real jobs you will often use both together.',
      },
      {
        title: 'How do I build a DevOps portfolio?',
        body: 'Ship 3–5 end-to-end projects: CI/CD + IaC + deployments + monitoring. Add diagrams and clear READMEs. Show production thinking (security + rollback + alerts).',
      },
    ],
  },
  {
    heading: 'Conclusion',
    body: 'DevOps in 2026 rewards engineers who can ship reliably: automate delivery, secure pipelines, and operate production with observability. Follow the phases, build projects, and document everything.\n\nIf you want mentor-led training with labs, projects, and a structured path, explore the Zyvotrix AI-Powered DevOps Engineer Program (DOP).',
  },
];

