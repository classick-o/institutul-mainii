import Page, { meta, params } from '@/components/pages/Condition';

/** Fără server, cele opt pagini trebuie enumerate la build. */
export function generateStaticParams() {
  return params('ro');
}

export async function generateMetadata({ params: p }) {
  const { slug } = await p;
  return meta('ro', slug);
}

export default async function Route({ params: p }) {
  const { slug } = await p;
  return <Page lang="ro" slug={slug} />;
}
