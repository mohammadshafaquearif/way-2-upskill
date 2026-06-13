import { toolIcon } from '@/lib/toolIcons';

export interface DataScienceTool {
  name: string;
  icon: string;
}

/** Tools aligned to the 3-month Data Science & ML with Python curriculum */
export const DATA_SCIENCE_TOOLS: DataScienceTool[] = [
  { name: 'Python', icon: toolIcon('python.svg') },
  { name: 'NumPy', icon: toolIcon('python.svg') },
  { name: 'Pandas', icon: toolIcon('python.svg') },
  { name: 'SQL', icon: toolIcon('postgresql.svg') },
  { name: 'MySQL', icon: toolIcon('postgresql.svg') },
  { name: 'Matplotlib', icon: toolIcon('python.svg') },
  { name: 'Seaborn', icon: toolIcon('python.svg') },
  { name: 'Scikit-Learn', icon: toolIcon('python.svg') },
  { name: 'Jupyter Notebook', icon: toolIcon('jupyter.svg') },
  { name: 'VS Code', icon: toolIcon('vscode.svg') },
  { name: 'Git', icon: toolIcon('git.svg') },
  { name: 'GitHub', icon: toolIcon('github.svg') },
  { name: 'Streamlit', icon: toolIcon('streamlit.svg') },
  { name: 'GitHub Pages', icon: toolIcon('github.svg') },
];
