import { toolIcon } from '@/lib/toolIcons';

export interface DevOpsTool {
  name: string;
  icon: string;
}

export const DEVOPS_TOOLS: DevOpsTool[] = [
  { name: 'Linux', icon: toolIcon('linux.svg') },
  { name: 'Git', icon: toolIcon('git.svg') },
  { name: 'AWS', icon: toolIcon('aws.png') },
  { name: 'Docker', icon: toolIcon('docker.svg') },
  { name: 'Kubernetes', icon: toolIcon('kubernetes.svg') },
  { name: 'Helm', icon: toolIcon('helm.svg') },
  { name: 'GitHub Actions', icon: toolIcon('github-actions.svg') },
  { name: 'Jenkins', icon: toolIcon('jenkins.svg') },
  { name: 'Terraform', icon: toolIcon('terraform.svg') },
  { name: 'Ansible', icon: toolIcon('ansible.svg') },
  { name: 'Vault', icon: toolIcon('vault.svg') },
  { name: 'Trivy', icon: toolIcon('trivy.png') },
  { name: 'Prometheus', icon: toolIcon('prometheus.svg') },
  { name: 'Grafana', icon: toolIcon('grafana.svg') },
  { name: 'GitHub Copilot', icon: toolIcon('github-copilot.svg') },
  { name: 'ChatGPT', icon: toolIcon('chatgpt.svg') },
];
