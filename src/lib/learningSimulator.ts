export interface SimulatorLesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'lab' | 'quiz';
  content: string;
  starterCode?: string;
  expectedOutput?: string;
}

export interface SimulatorModule {
  id: string;
  title: string;
  lessons: SimulatorLesson[];
}

const BASE_MODULES: Record<string, SimulatorModule[]> = {
  dop: [
    {
      id: 'm1',
      title: 'Linux & Git Foundations',
      lessons: [
        {
          id: 'l1',
          title: 'Environment Setup',
          duration: '12 min',
          type: 'video',
          content:
            'Configure your learner workspace: terminal, Git identity, and a sample repo clone. This simulator mirrors Week 1 onboarding.',
        },
        {
          id: 'l2',
          title: 'Git Workflow Lab',
          duration: '20 min',
          type: 'lab',
          content: 'Practice branch, commit, and push in a sandbox terminal.',
          starterCode: 'git status\ngit checkout -b feature/devops-lab\necho "pipeline ready" >> README.md\ngit add .\ngit commit -m "Add DevOps lab marker"',
          expectedOutput: 'On branch feature/devops-lab',
        },
      ],
    },
    {
      id: 'm2',
      title: 'CI/CD Pipeline Simulator',
      lessons: [
        {
          id: 'l3',
          title: 'Build Stage',
          duration: '15 min',
          type: 'lab',
          content: 'Trigger a mock CI build and inspect logs.',
          starterCode: 'npm run build\necho "Build artifact: dist/app.zip"',
          expectedOutput: 'Build artifact: dist/app.zip',
        },
        {
          id: 'l4',
          title: 'Deploy Checkpoint',
          duration: '10 min',
          type: 'quiz',
          content: 'Validate rollback strategy before promoting to production.',
        },
      ],
    },
  ],
  aac: [
    {
      id: 'm1',
      title: 'Agent Foundations',
      lessons: [
        {
          id: 'l1',
          title: 'LLM Tooling Overview',
          duration: '14 min',
          type: 'video',
          content: 'Understand agent loops, tool calling, and memory in a guided sandbox.',
        },
        {
          id: 'l2',
          title: 'First Agent Lab',
          duration: '25 min',
          type: 'lab',
          content: 'Wire a simple tool-calling agent in Python.',
          starterCode: 'from agent import ToolAgent\nagent = ToolAgent(tools=["search", "calculator"])\nprint(agent.run("Summarize today\'s standup notes"))',
          expectedOutput: 'Agent response generated',
        },
      ],
    },
    {
      id: 'm2',
      title: 'Production Agent Patterns',
      lessons: [
        {
          id: 'l3',
          title: 'RAG Pipeline Lab',
          duration: '18 min',
          type: 'lab',
          content: 'Index documents and run retrieval-augmented queries.',
          starterCode: 'pipeline.ingest("docs/")\nanswer = pipeline.query("What is our refund policy?")\nprint(answer)',
          expectedOutput: 'What is our refund policy?',
        },
      ],
    },
  ],
  aws: [
    {
      id: 'm1',
      title: 'AWS Core Services',
      lessons: [
        {
          id: 'l1',
          title: 'IAM & Security Basics',
          duration: '16 min',
          type: 'video',
          content: 'Explore least-privilege IAM policies in a read-only simulator.',
        },
        {
          id: 'l2',
          title: 'EC2 Launch Lab',
          duration: '22 min',
          type: 'lab',
          content: 'Launch a mock EC2 instance and attach a security group.',
          starterCode: 'aws ec2 run-instances --image-id ami-demo --instance-type t3.micro\naws ec2 describe-instances --filters Name=tag:Lab,Values=architect',
          expectedOutput: 'InstanceState: running',
        },
      ],
    },
  ],
  'data-science': [
    {
      id: 'm1',
      title: 'Python Analytics Starter',
      lessons: [
        {
          id: 'l1',
          title: 'Pandas Quickstart',
          duration: '15 min',
          type: 'lab',
          content: 'Load a dataset and compute summary statistics.',
          starterCode: 'import pandas as pd\ndf = pd.read_csv("sales.csv")\nprint(df.describe())',
          expectedOutput: 'count',
        },
        {
          id: 'l2',
          title: 'Dashboard Preview',
          duration: '12 min',
          type: 'video',
          content: 'Preview how Streamlit dashboards turn analysis into stakeholder-ready views.',
        },
      ],
    },
  ],
};

export function getSimulatorModules(courseId: string): SimulatorModule[] {
  return BASE_MODULES[courseId] ?? BASE_MODULES.aac;
}

export function getTotalLessons(modules: SimulatorModule[]): number {
  return modules.reduce((sum, module) => sum + module.lessons.length, 0);
}

export function getProgressStorageKey(userId: string, courseId: string): string {
  return `zyvotrix_sim_progress_${userId}_${courseId}`;
}

export const GUEST_CHECKOUT_EMAIL_KEY = 'zyvotrix_guest_checkout_email';

export function getGuestCheckoutEmail(): string | null {
  try {
    return sessionStorage.getItem(GUEST_CHECKOUT_EMAIL_KEY);
  } catch {
    return null;
  }
}

export function setGuestCheckoutEmail(email: string): void {
  sessionStorage.setItem(GUEST_CHECKOUT_EMAIL_KEY, email.toLowerCase().trim());
}

export function getSimulatorUserKey(authUserId?: string): string {
  if (authUserId) return authUserId;
  const guestEmail = getGuestCheckoutEmail();
  if (guestEmail) return `guest_${guestEmail.replace(/[^a-z0-9]/gi, '_')}`;
  return 'anonymous';
}

export interface SimulatorProgress {
  completedLessons: string[];
  lastLessonId?: string;
}

export function loadSimulatorProgress(userId: string, courseId: string): SimulatorProgress {
  try {
    const raw = localStorage.getItem(getProgressStorageKey(userId, courseId));
    if (!raw) return { completedLessons: [] };
    return JSON.parse(raw) as SimulatorProgress;
  } catch {
    return { completedLessons: [] };
  }
}

export function saveSimulatorProgress(
  userId: string,
  courseId: string,
  progress: SimulatorProgress,
): void {
  localStorage.setItem(getProgressStorageKey(userId, courseId), JSON.stringify(progress));
}
