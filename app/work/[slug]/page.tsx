import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/caseStudies";
import { CaseStudy } from "@/components/CaseStudy";
import { profile } from "@/lib/data";

const siteUrl = "https://arhamjavaid.dev";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.title} — Case Study · Arham Javaid`,
    description: cs.summary,
    openGraph: {
      title: `${cs.title} — Case Study`,
      description: cs.summary,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: cs.title,
    description: cs.summary,
    author: { "@type": "Person", name: profile.name, url: profile.links.linkedin },
    publisher: { "@type": "Person", name: profile.name },
    keywords: cs.stack.join(", "),
    about: cs.company,
    url: `${siteUrl}/work/${cs.slug}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/work/${cs.slug}` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudy data={cs} />
    </>
  );
}
