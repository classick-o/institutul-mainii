import Shell from '@/components/Shell';
import { rootMeta } from '@/lib/meta';

export const metadata = rootMeta('ro');
export const viewport = { themeColor: '#2840E7' };

export default function RootLayout({ children }) {
  return <Shell lang="ro">{children}</Shell>;
}
