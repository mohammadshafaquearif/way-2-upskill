/** DevOps program tech stack with official brand icons */
const simpleIcon = (slug: string, color?: string) =>
  color
    ? `https://cdn.simpleicons.org/${slug}/${color.replace('#', '')}`
    : `https://cdn.simpleicons.org/${slug}`;

const devicon = (name: string, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

export interface DevOpsTool {
  name: string;
  icon: string;
}

export const DEVOPS_TOOLS: DevOpsTool[] = [
  { name: 'Linux', icon: devicon('linux') },
  { name: 'Docker', icon: simpleIcon('docker', '2496ED') },
  { name: 'Kubernetes', icon: simpleIcon('kubernetes', '326CE5') },
  { name: 'AWS', icon: devicon('amazonwebservices', 'original-wordmark') },
  { name: 'GCP', icon: simpleIcon('googlecloud', '4285F4') },
  { name: 'Terraform', icon: simpleIcon('terraform', '844FBA') },
  { name: 'Ansible', icon: simpleIcon('ansible', 'EE0000') },
  { name: 'GitHub Actions', icon: simpleIcon('githubactions', '2088FF') },
  { name: 'Jenkins', icon: simpleIcon('jenkins', 'D24939') },
  { name: 'Prometheus', icon: simpleIcon('prometheus', 'E6522C') },
  { name: 'Grafana', icon: simpleIcon('grafana', 'F46800') },
  { name: 'AI Agents', icon: simpleIcon('huggingface', 'FFD21E') },
  { name: 'Vault', icon: devicon('vault') },
  { name: 'Trivy', icon: simpleIcon('trivy', '1904DA') },
  { name: 'Helm', icon: simpleIcon('helm', '0F1689') },
  { name: 'ArgoCD', icon: simpleIcon('argo', 'EF7B4D') },
];
