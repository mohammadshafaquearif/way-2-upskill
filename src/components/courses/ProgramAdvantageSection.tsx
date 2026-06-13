import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Reveal3D } from '@/components/motion/Reveal3D';

export interface AdvantageRow {
  need: string;
  zyvotrix: string;
  typical: string;
}

export interface ContrastRow {
  left: string;
  right: string;
}

export interface ProgramAdvantageContent {
  eyebrow?: string;
  headline: React.ReactNode;
  sub: string;
  rows: AdvantageRow[];
  traditionalVs: ContrastRow[];
  othersVs: ContrastRow[];
}

const defaultAdvantageContent: ProgramAdvantageContent = {
  eyebrow: 'The Zyvotrix Difference',
  headline: (
    <>
      Why Learners <span>Choose Zyvotrix</span>
    </>
  ),
  sub: 'A structured path from AI foundations to production agent systems — built for careers, not just certificates.',
  rows: [
    {
      need: 'Strong AI Foundations',
      zyvotrix: 'Learn LLMs, Transformers, Prompt Engineering & Agent Architecture from scratch',
      typical: 'Surface-level prompting with no systems understanding',
    },
    {
      need: 'Agent Engineering Skills',
      zyvotrix: 'Build AI Agents using LangChain, LangGraph, CrewAI & AutoGen',
      typical: 'Single-tool demos without orchestration depth',
    },
    {
      need: 'Production-Ready Knowledge',
      zyvotrix: 'FastAPI, Docker, Deployment & Cloud Integration included',
      typical: 'Notebook-only exercises with no deployment path',
    },
    {
      need: 'Real RAG Implementation',
      zyvotrix: 'Build document chatbots, enterprise search & Agentic RAG systems',
      typical: 'Basic Q&A chatbots over sample PDFs',
    },
    {
      need: 'Multi-Agent Systems',
      zyvotrix: 'Design collaborative AI agents using modern orchestration patterns',
      typical: 'Single-agent tutorials with no team workflows',
    },
    {
      need: 'AI Observability',
      zyvotrix: 'Learn LangSmith, LangFuse & AgentOps monitoring workflows',
      typical: 'No tracing, evaluation, or production monitoring',
    },
    {
      need: 'Portfolio Projects',
      zyvotrix: 'Multiple industry-grade projects included',
      typical: 'Generic assignments with limited portfolio value',
    },
    {
      need: 'Cloud AI Exposure',
      zyvotrix: 'AWS Bedrock, Azure OpenAI & Vertex AI concepts covered',
      typical: 'Local-only setups with no cloud context',
    },
    {
      need: 'Career-Oriented Learning',
      zyvotrix: 'Structured roadmap from beginner to Agentic AI Engineer',
      typical: 'Unstructured video lists without a clear path',
    },
    {
      need: 'Hands-On Training',
      zyvotrix: 'Project-first learning approach with practical implementation',
      typical: 'Theory-heavy lectures with minimal building',
    },
  ],
  traditionalVs: [
    { left: 'Watch Tutorials', right: 'Build Projects' },
    { left: 'Learn Concepts', right: 'Implement Solutions' },
    { left: 'Create Chatbots', right: 'Build AI Agents' },
    { left: 'Theory Focused', right: 'Hands-On Learning' },
    { left: 'Generic Assignments', right: 'Industry Projects' },
    { left: 'Learning Only', right: 'Portfolio + Skills' },
  ],
  othersVs: [
    { left: 'Prompt Engineering', right: 'Agent Engineering' },
    { left: 'AI Tools', right: 'AI Systems' },
    { left: 'Chatbots', right: 'Production AI Apps' },
    { left: 'Theory', right: 'Real Deployment' },
  ],
};

const AdvantageCheckIcon = () => (
  <svg className="advantage-icon advantage-icon--check" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="10" cy="10" r="9" fill="#CCFBF1" />
    <path
      d="M6 10.5l2.5 2.5 5-5"
      stroke="#0F766E"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AdvantageXIcon = () => (
  <svg className="advantage-icon advantage-icon--x" viewBox="0 0 20 20" fill="none" aria-hidden>
    <circle cx="10" cy="10" r="9" fill="#FFE4E6" />
    <path
      d="M7 7l6 6M13 7l-6 6"
      stroke="#F43F5E"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const AdvantageCheckIconSm = () => (
  <svg className="advantage-icon advantage-icon--check advantage-icon--sm" viewBox="0 0 14 14" fill="none" aria-hidden>
    <circle cx="7" cy="7" r="6" fill="#CCFBF1" />
    <path
      d="M4 7.5l2 2 4-4"
      stroke="#0F766E"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AdvantageXIconSm = () => (
  <svg className="advantage-icon advantage-icon--x advantage-icon--sm" viewBox="0 0 14 14" fill="none" aria-hidden>
    <circle cx="7" cy="7" r="6" fill="#FFE4E6" />
    <path
      d="M4.5 4.5l5 5M9.5 4.5l-5 5"
      stroke="#F43F5E"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);

const ProgramAdvantageSection = ({ content = defaultAdvantageContent }: { content?: ProgramAdvantageContent }) => {
  const { eyebrow, headline, sub, rows, traditionalVs, othersVs } = content;

  return (
    <section className="section-padding section-white border-b border-border" id="zyvotrix-advantage">
      <div className="program-page-container">
        <Reveal3D className="program-page-header">
          <p className="program-advantage-eyebrow mb-3">{eyebrow ?? 'The Zyvotrix Difference'}</p>
          <h2 className="program-advantage-headline mb-4">{headline}</h2>
          <p className="program-advantage-sub">{sub}</p>
        </Reveal3D>

        <Reveal3D delay={80}>
          <div className="program-page-content program-advantage-table">
            <div className="program-advantage-table-head">
              <div className="program-advantage-th program-advantage-th--need">What Learners Need</div>
              <div className="program-advantage-th program-advantage-th--zyvotrix">
                ✦ Zyvotrix Advantage
              </div>
              <div className="program-advantage-th program-advantage-th--typical">✕ Typical Courses</div>
            </div>

            <div className="program-advantage-table-body">
              {rows.map((row) => (
                <div key={row.need} className="program-advantage-row">
                  <div className="program-advantage-cell program-advantage-cell--need">
                    <span className="program-advantage-mobile-label">What Learners Need</span>
                    <span className="program-advantage-need-label">{row.need}</span>
                  </div>
                  <div className="program-advantage-cell program-advantage-cell--good">
                    <span className="program-advantage-mobile-label program-advantage-mobile-label--good">
                      Zyvotrix Advantage
                    </span>
                    <AdvantageCheckIcon />
                    <span className="program-advantage-text-good">{row.zyvotrix}</span>
                  </div>
                  <div className="program-advantage-cell program-advantage-cell--bad">
                    <span className="program-advantage-mobile-label program-advantage-mobile-label--bad">
                      Typical Courses
                    </span>
                    <AdvantageXIcon />
                    <span className="program-advantage-text-bad">{row.typical}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal3D>

        <div className="program-page-content program-advantage-cards mt-12">
          <Reveal3D delay={120}>
            <div className="program-advantage-card">
              <div className="program-advantage-card-head program-advantage-card-head--vs">
                <p className="program-advantage-card-label">Traditional Learning vs Zyvotrix</p>
              </div>
              <div className="program-advantage-card-body">
                {traditionalVs.map((row) => (
                  <div key={row.left} className="program-advantage-vs-row">
                    <div className="program-advantage-vs-left">{row.left}</div>
                    <ArrowRight className="program-advantage-vs-arrow h-3.5 w-3.5 shrink-0" aria-hidden />
                    <div className="program-advantage-vs-right">{row.right}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal3D>

          <Reveal3D delay={160}>
            <div className="program-advantage-card">
              <div className="program-advantage-card-head program-advantage-card-head--ot">
                <p className="program-advantage-card-label">Others Teach · Zyvotrix Teaches</p>
              </div>
              <div className="program-advantage-card-body">
                {othersVs.map((row) => (
                  <div key={row.left} className="program-advantage-ot-row">
                    <div className="program-advantage-ot-left">
                      <AdvantageXIconSm />
                      {row.left}
                    </div>
                    <div className="program-advantage-ot-right">
                      <AdvantageCheckIconSm />
                      {row.right}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal3D>
        </div>
      </div>
    </section>
  );
};

export default ProgramAdvantageSection;
