import { toolIcon } from '@/lib/toolIcons';

export interface DevOpsTool {
  name: string;
  icon: string;
}

export const DEVOPS_TOOLS: DevOpsTool[] = [
  { name: 'Linux', icon: toolIcon('linux.svg') },
  { name: 'Docker', icon: toolIcon('docker.svg') },
  { name: 'Kubernetes', icon: toolIcon('kubernetes.svg') },
  { name: 'AWS', icon: toolIcon('aws.png') },
  { name: 'GCP', icon: toolIcon('gcp.svg') },
  { name: 'Terraform', icon: toolIcon('terraform.svg') },
  { name: 'Ansible', icon: toolIcon('ansible.svg') },
  { name: 'GitHub Actions', icon: toolIcon('github-actions.svg') },
  { name: 'Jenkins', icon: toolIcon('jenkins.svg') },
  { name: 'Prometheus', icon: toolIcon('prometheus.svg') },
  { name: 'Grafana', icon: toolIcon('grafana.svg') },
  { name: 'Vault', icon: toolIcon('vault.svg') },
  { name: 'Trivy', icon: toolIcon('trivy.png') },
  { name: 'Helm', icon: toolIcon('helm.svg') },
  { name: 'ArgoCD', icon: toolIcon('argocd.svg') },
];
