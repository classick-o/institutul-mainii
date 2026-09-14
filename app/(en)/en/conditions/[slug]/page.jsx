import Page, { meta, params } from '@/components/pages/Condition';

/** Fără server, cele opt pagini trebuie enumerate la build. */
export function generateStaticParams() {
  return params('en');
}

export async function generateMetadata({ params: p }) {
  const { slug } = await p;
  return meta('en', slug);
}

export default async function Route({ params: p }) {
  const { slug } = await p;
  return <Page lang="en" slug={slug} />;
}
