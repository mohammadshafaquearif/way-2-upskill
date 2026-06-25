import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  Cloud,
  DollarSign,
  FolderKanban,
  GraduationCap,
  HelpCircle,
  List,
  Map as MapIcon,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import type { ResourceArticle, ResourceSection } from '@/lib/resources/types';
import { sectionSlug } from '@/lib/resources/sectionSlug';

type GuideSubsection = {
  title: string;
  body?: string;
  bullets?: string[];
  id: string;
};

type GuideSection = ResourceSection & {
  id: string;
  subsections: GuideSubsection[];
};

type TocItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  children?: { id: string; label: string }[];
};

const TOC_ICON_MAP: Record<string, LucideIcon> = {
  Introduction: BookOpen,
  'Why Learn AWS in 2026?': TrendingUp,
  'What Does an AWS Solutions Architect Do?': Briefcase,
  'Skills Required to Become an AWS Solutions Architect': GraduationCap,
  'AWS Solutions Architect Roadmap 2026': MapIcon,
  'AWS Projects to Build in 2026': FolderKanban,
  'AWS Solutions Architect Certification Path (SAA-C03)': Award,
  'Essential AWS Tools & Services': Cloud,
  'Common Mistakes Beginners Make': AlertCircle,
  'AWS Career Opportunities': Briefcase,
  'Expected Salary Trends in 2026': DollarSign,
  'Final Learning Plan': Calendar,
  'Frequently Asked Questions (FAQs)': HelpCircle,
  Conclusion: CheckCircle2,
};

function tocIconFor(heading: string): LucideIcon {
  return TOC_ICON_MAP[heading] ?? Circle;
}

function subsectionId(parentId: string, title: string, index: number): string {
  const base = title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  return base ? `${parentId}--${base}` : `${parentId}--sub-${index + 1}`;
}

const GuideSectionContent = ({
  section,
  subsections,
}: {
  section: ResourceSection;
  subsections: GuideSubsection[];
}) => (
  <>
    {section.body && (
      <p className="resource-blog-answer whitespace-pre-line">{section.body}</p>
    )}
    {section.bullets && section.bullets.length > 0 && (
      <ul className="resource-blog-list">
        {section.bullets.map((item, bulletIndex) => (
          <li key={bulletIndex}>{item}</li>
        ))}
      </ul>
    )}
    {subsections.length > 0 && (
      <div className="resource-guide-subsections">
        {subsections.map((sub) => (
          <div key={sub.id} id={sub.id} className="resource-guide-subsection scroll-mt-28">
            <h3 className="resource-guide-subheading">{sub.title}</h3>
            {sub.body && (
              <p className="resource-blog-answer whitespace-pre-line">{sub.body}</p>
            )}
            {sub.bullets && sub.bullets.length > 0 && (
              <ul className="resource-blog-list">
                {sub.bullets.map((item, bulletIndex) => (
                  <li key={bulletIndex}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}
    {section.table && (
      <div className="resource-guide-table-wrap">
        <table className="resource-guide-table">
          <thead>
            <tr>
              {section.table.headers.map((header, headerIndex) => (
                <th key={headerIndex} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.table.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </>
);

const estimateReadMinutes = (sections: ResourceSection[]) => {
  const words = sections
    .flatMap((section) => [
      section.heading,
      section.body,
      ...(section.bullets ?? []),
      ...(section.subheadings?.flatMap((sub) => [sub.title, sub.body, ...(sub.bullets ?? [])]) ?? []),
      ...(section.table?.rows.flat() ?? []),
    ])
    .filter(Boolean)
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 200));
};

const ResourceGuideTocHero = ({
  items,
  onNavigate,
}: {
  items: TocItem[];
  onNavigate: (id: string) => void;
}) => (
  <nav id="table-of-contents" className="resource-guide-toc-hero" aria-label="Table of contents">
    <h2 className="resource-guide-toc-hero-title">Table of Contents</h2>
    <ol className="resource-guide-toc-hero-list">
      {items.map((item, index) => (
        <li key={item.id} className="resource-guide-toc-hero-item">
          <a
            href={`#${item.id}`}
            onClick={(event) => {
              event.preventDefault();
              onNavigate(item.id);
            }}
          >
            <span className="resource-guide-toc-hero-number">{index + 1}.</span>
            <span>{item.label}</span>
          </a>
          {item.children && item.children.length > 0 && (
            <ul className="resource-guide-toc-hero-nested">
              {item.children.map((child) => (
                <li key={child.id}>
                  <a
                    href={`#${child.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      onNavigate(child.id);
                    }}
                  >
                    {child.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

const ResourceGuideToc = ({
  items,
  activeId,
  onNavigate,
  variant,
}: {
  items: TocItem[];
  activeId: string;
  onNavigate: (id: string) => void;
  variant: 'mobile' | 'sidebar';
}) => (
  <nav
    className={variant === 'mobile' ? 'resource-guide-toc-mobile' : 'resource-guide-toc-sidebar'}
    aria-label="Table of contents"
  >
    <div className="resource-guide-toc-mobile-header">
      <List className="h-4 w-4" aria-hidden />
      <span>{variant === 'sidebar' ? 'Table of Contents' : 'On this page'}</span>
    </div>
    <ol className="resource-guide-toc-list">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeId === item.id || item.children?.some((child) => child.id === activeId);

        return (
          <li key={item.id} className={item.children?.length ? 'resource-guide-toc-group' : undefined}>
            <a
              href={`#${item.id}`}
              className={isActive ? 'is-active' : undefined}
              onClick={(event) => {
                event.preventDefault();
                onNavigate(item.id);
              }}
            >
              <Icon className="resource-guide-toc-icon" aria-hidden />
              <span>{item.label}</span>
            </a>
            {item.children && item.children.length > 0 && (
              <ol className="resource-guide-toc-nested">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <a
                      href={`#${child.id}`}
                      className={activeId === child.id ? 'is-active' : undefined}
                      onClick={(event) => {
                        event.preventDefault();
                        onNavigate(child.id);
                      }}
                    >
                      <ChevronRight className="resource-guide-toc-icon resource-guide-toc-icon--nested" aria-hidden />
                      <span>{child.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </li>
        );
      })}
    </ol>
  </nav>
);

interface ResourceGuideArticleProps {
  article: ResourceArticle;
  categoryLabel: string;
  categoryAccent: string;
}

const ResourceGuideArticle = ({ article, categoryLabel, categoryAccent }: ResourceGuideArticleProps) => {
  const [activeId, setActiveId] = useState('');

  const isAwsDoc = categoryAccent === 'aws';

  const sections = useMemo<GuideSection[]>(
    () =>
      article.sections
        .filter((section) => section.heading || section.body)
        .map((section, index) => {
          const id = section.heading ? sectionSlug(section.heading, index) : `section-${index + 1}`;
          const subsections =
            section.subheadings?.map((sub, subIndex) => ({
              ...sub,
              id: subsectionId(id, sub.title, subIndex),
            })) ?? [];

          return { ...section, id, subsections };
        }),
    [article.sections],
  );

  const tocItems = useMemo<TocItem[]>(
    () =>
      sections
        .filter((section) => section.heading)
        .map((section) => ({
          id: section.id,
          label: section.heading!,
          icon: tocIconFor(section.heading!),
          children:
            section.subsections.length > 0
              ? section.subsections.map((sub) => ({
                  id: sub.id,
                  label: sub.title,
                }))
              : undefined,
        })),
    [sections],
  );

  const observeIds = useMemo(() => {
    const ids: string[] = [];
    for (const section of sections) {
      if (section.heading) ids.push(section.id);
      for (const sub of section.subsections) ids.push(sub.id);
    }
    return ids;
  }, [sections]);

  const handleNavigate = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveId(id);
    window.history.replaceState(null, '', `#${id}`);
  }, []);

  useEffect(() => {
    if (observeIds.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.intersectionRatio);
        }

        let bestId = '';
        let bestRatio = 0;

        for (const [id, ratio] of visibility) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestRatio > 0 && bestId) {
          setActiveId(bestId);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const id of observeIds) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, [observeIds]);

  const readMinutes = useMemo(() => estimateReadMinutes(sections), [sections]);

  return (
    <article
      className={`resource-blog resource-guide${isAwsDoc ? ' resource-guide--aws' : ''}`}
    >
      <header className="resource-blog-header">
        <div className="resource-blog-meta">
          <span className={`resource-category-badge resource-category-badge--${categoryAccent}`}>
            {categoryLabel}
          </span>
          <span className="resource-blog-meta-item">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {readMinutes} min read
          </span>
        </div>
        <p className="resource-blog-lead">{article.description}</p>
      </header>

      {article.heroImage && (
        <figure className="resource-guide-hero">
          <img
            src={article.heroImage}
            alt={`${article.title} — career guide infographic`}
            width={1200}
            height={675}
            loading="eager"
            decoding="async"
          />
        </figure>
      )}

      {tocItems.length > 0 && isAwsDoc && (
        <ResourceGuideTocHero items={tocItems} onNavigate={handleNavigate} />
      )}

      <div className="resource-guide-shell">
        {tocItems.length > 0 && (
          <ResourceGuideToc
            items={tocItems}
            activeId={activeId}
            onNavigate={handleNavigate}
            variant="mobile"
          />
        )}

        <div className="resource-guide-layout">
          {tocItems.length > 0 && (
            <ResourceGuideToc
              items={tocItems}
              activeId={activeId}
              onNavigate={handleNavigate}
              variant="sidebar"
            />
          )}

          <div className="resource-blog-prose resource-guide-prose">
            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                className="resource-blog-block resource-guide-section scroll-mt-28"
              >
                {section.heading && (
                  <h2 className="resource-blog-question resource-guide-section-title">
                    {section.heading}
                  </h2>
                )}
                <GuideSectionContent section={section} subsections={section.subsections} />
                {index < sections.length - 1 && (
                  <hr className="resource-blog-divider" aria-hidden />
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ResourceGuideArticle;
