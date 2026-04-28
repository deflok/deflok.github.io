import type { Metadata } from "next";
import { getArticleBySlug, getAllArticles, generateSlug } from '@/utils/api';
import { notFound } from 'next/navigation';
import type { Article } from '@/utils/api';

interface PageProps {
  params: Promise<{ slug: string }>;
}


export async function generateStaticParams() {
  const articles = await getAllArticles();

  return articles.map((article: Article) => ({
    slug: generateSlug(article.title),
  }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div>
      <h1>{article.title}</h1>
    </div>
  );
}