import { Metadata } from 'next';
import { Navbar } from './_components/Navbar';
import { getStore } from '@/drizzle/db/store.db';

export async function generateMetadata(): Promise<Metadata | undefined> {
  const store = await getStore();
  if (store == null) return;
  return {
    title: store.name,
    icons: {
      icon: store.logoUrl,
    },
  };
}

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-screen flex flex-col bg-face-background text-face-foreground font-roboto">
      <Navbar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
};

export default Layout;
