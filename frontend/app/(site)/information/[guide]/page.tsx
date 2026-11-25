import type { Metadata } from "next";
import { Icon } from "@/components/icon";
import { GUIDES, type GuideId } from "@/lib/content";

type Props = { params: Promise<{ guide: GuideId }> };

// One page per guide, built ahead of time; any other /information/<name>/ is a 404.
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(GUIDES).map((guide) => ({ guide }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: GUIDES[(await params).guide].title };
}

export default async function Guide({ params }: Props) {
  const guide = GUIDES[(await params).guide];
  return (
    <section className="route-section">
      <div className="wrap">
        <a className="breadcrumb" href="/information/">
          <Icon name="left" /> All information guides
        </a>
        <article className="reading-card">
          <div className="eyebrow">{guide.eyebrow}</div>
          <h1>{guide.title}</h1>
          <div className="prose" dangerouslySetInnerHTML={{ __html: guide.body }} />
          <div className="button-row">
            <a className="btn" href="/contact/">
              Discuss my situation <Icon name="arrow" />
            </a>
            <a className="btn secondary" href="/information/">
              More guides
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
