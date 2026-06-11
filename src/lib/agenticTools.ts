/** Agentic AI program tech stack with brand icons */
const simpleIcon = (slug: string, color?: string) =>
  color
    ? `https://cdn.simpleicons.org/${slug}/${color.replace('#', '')}`
    : `https://cdn.simpleicons.org/${slug}`;

const devicon = (name: string, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

export interface AgenticTool {
  name: string;
  icon: string;
}

export const AGENTIC_TOOLS: AgenticTool[] = [
  { name: 'Python', icon: devicon('python') },
  { name: 'OpenAI', icon: simpleIcon('openai', '412991') },
  { name: 'LangChain', icon: simpleIcon('langchain', '1C3C3C') },
  { name: 'LangGraph', icon: simpleIcon('langchain', '1C3C3C') },
  { name: 'Hugging Face', icon: simpleIcon('huggingface', 'FFD21E') },
  { name: 'Pinecone', icon: simpleIcon('pinecone', '000000') },
  { name: 'FAISS', icon: devicon('python') },
  { name: 'FastAPI', icon: simpleIcon('fastapi', '009688') },
  { name: 'Docker', icon: simpleIcon('docker', '2496ED') },
  { name: 'Streamlit', icon: simpleIcon('streamlit', 'FF4B4B') },
  { name: 'Anthropic', icon: simpleIcon('anthropic', '191919') },
  { name: 'Git', icon: simpleIcon('git', 'F05032') },
  { name: 'AWS', icon: '/images/tools/aws.png' },
  { name: 'Gradio', icon: simpleIcon('gradio', 'F97316') },
  { name: 'Chroma', icon: simpleIcon('chroma', 'FF6442') },
];
