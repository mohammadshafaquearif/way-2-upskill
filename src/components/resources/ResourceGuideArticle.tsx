import React, { useMemo } from 'react';
import { Clock, List } from 'lucide-react';
import type { ResourceArticle, ResourceSection } from '@/lib/resourcesContent';
import { sectionSlug } from '@/lib/resourcesContent';

type GuideSection = ResourceSection & { id: string };

const GuideSectionContent = ({ section }: { section: ResourceSection }) => (
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
    {section.subheadings && section.subheadings.length > 0 && (
      <div className="resource-guide-subsections">
        {section.subheadings.map((sub, subIndex) => (
          <div key={subIndex} className="resource-guide-subsection">
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

interface ResourceGuideArticleProps {
  article: ResourceArticle;
  categoryLabel: string;
  categoryAccent: string;
}

const ResourceGuideArticle = ({ article, categoryLabel, categoryAccent }: ResourceGuideArticleProps) => {
  const sections = useMemo<GuideSection[]>(
    () =>
      article.sections
        .filter((section) => section.heading || section.body)
        .map((section, index) => ({
          ...section,
          id: section.heading ? sectionSlug(section.heading, index) : `section-${index + 1}`,
        })),
    [article.sections],
  );

  const tocSections = useMemo(
    () => sections.filter((section) => section.heading),
    [sections],
  );

  const readMinutes = useMemo(() => estimateReadMinutes(sections), [sections]);

  return (
    <article className="resource-blog resource-guide">
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

      {tocSections.length > 0 && (
        <nav className="resource-guide-toc-mobile" aria-label="Table of contents">
          <div className="resource-guide-toc-mobile-header">
            <List className="h-4 w-4" aria-hidden />
            <span>On this page</span>
          </div>
          <ol className="resource-guide-toc-list">
            {tocSections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.heading}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="resource-guide-layout">
        {tocSections.length > 0 && (
          <aside className="resource-guide-toc-sidebar" aria-label="Table of contents">
            <p className="resource-guide-toc-title">On this page</p>
            <ol className="resource-guide-toc-list">
              {tocSections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.heading}</a>
                </li>
              ))}
            </ol>
          </aside>
        )}

        <div className="resource-blog-prose resource-guide-prose">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="resource-blog-block scroll-mt-28"
            >
              {section.heading && (
                <h2 className="resource-blog-question">{section.heading}</h2>
              )}
              <GuideSectionContent section={section} />
              {index < sections.length - 1 && (
                <hr className="resource-blog-divider" aria-hidden />
              )}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ResourceGuideArticle;
