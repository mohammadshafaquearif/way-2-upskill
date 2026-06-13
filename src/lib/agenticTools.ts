import { toolIcon } from '@/lib/toolIcons';

export interface AgenticTool {
  name: string;
  icon: string;
}

/** Tools aligned to the 12-module Agentic AI curriculum */
export const AGENTIC_TOOLS: AgenticTool[] = [
  { name: 'ChatGPT', icon: toolIcon('chatgpt.svg') },
  { name: 'Anthropic', icon: toolIcon('anthropic.svg') },
  { name: 'Pydantic', icon: toolIcon('pydantic.svg') },
  { name: 'Ollama', icon: toolIcon('ollama.svg') },
  { name: 'Llama 3', icon: toolIcon('meta.svg') },
  { name: 'LangChain', icon: toolIcon('langchain.svg') },
  { name: 'LangGraph', icon: toolIcon('langgraph.svg') },
  { name: 'LangSmith', icon: toolIcon('langsmith.svg') },
  { name: 'ChromaDB', icon: toolIcon('chroma.svg') },
  { name: 'Pinecone', icon: toolIcon('pinecone.svg') },
  { name: 'CrewAI', icon: toolIcon('crewai.svg') },
  { name: 'AutoGen', icon: toolIcon('autogpt.svg') },
  { name: 'MetaGPT', icon: toolIcon('metagpt.svg') },
  { name: 'Docker', icon: toolIcon('docker.svg') },
  { name: 'FastAPI', icon: toolIcon('fastapi.svg') },
  { name: 'AWS', icon: toolIcon('aws.png') },
  { name: 'GitHub', icon: toolIcon('github.svg') },
  { name: 'GitHub Copilot', icon: toolIcon('github-copilot.svg') },
  { name: 'Jupyter', icon: toolIcon('jupyter.svg') },
  { name: 'VS Code', icon: toolIcon('vscode.svg') },
  { name: 'PostgreSQL', icon: toolIcon('postgresql.svg') },
];
