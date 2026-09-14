import Shell from '@/components/Shell';
import { rootMeta } from '@/lib/meta';

export const metadata = rootMeta('en');
export const viewport = { themeColor: '#2840E7' };

export default function RootLayout({ children }) {
  return <Shell lang="en">{children}</Shell>;
}
