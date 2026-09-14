import Page, { meta } from '@/components/pages/Legal';

export const metadata = meta('en', 'gdpr');

export default function Route() {
  return <Page lang="en" id="gdpr" />;
}
