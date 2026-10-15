import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/ArticleView";
import { getBySegmentSlug, allIndex, SECTIONS } from "@/lib/site";

const SEGMENTS = new Set(SECTIONS.map((s) => s.segment));

export const dynamicParams = false;

export function generateStaticParams() {
  return allIndex()
    .filter((e) => SEGMENTS.has(e.segment))
    .map((e) => ({ section: e.segment, slug: e.slug }));
}

type Props = { params: Promise<{ section: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, slug } = await params;
  const page = getBySegmentSlug(section, slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.seo.description ?? undefined,
    alternates: { canonical: `/${section}/${slug}/` },
    openGraph: {
      title: page.title,
      description: page.seo.description ?? undefined,
      type: "article",
    },
  };
}

export default async function Page({ params }: Props) {
  const { section, slug } = await params;
  if (!SEGMENTS.has(section)) notFound();
  const page = getBySegmentSlug(section, slug);
  if (!page) notFound();
  return <ArticleView page={page} />;
}
