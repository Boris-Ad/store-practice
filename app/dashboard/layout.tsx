import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/sonner';
import { Suspense } from 'react';
import { getStore } from '@/drizzle/db/store.db';
import { auth } from '@/service/auth';
import { AdminButton } from './_components/AdminButton';
import { Sidebar } from './_components/Sidebar';

export const metadata: Metadata = {
  title: 'Admin',
};

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] grid-rows-[70px_1fr] font-roboto">
      <Sidebar />
      <header className="px-6 shadow-md bg-white flex justify-between items-center">
        <Suspense>
          <SuspendedHeaderComponent />
        </Suspense>
      </header>
      <main className="p-4 overflow-y-auto overflow-x-hidden">{children}</main>
      <Toaster />
    </div>
  );
};

export default AdminLayout;

async function SuspendedHeaderComponent() {
  const [store, session] = await Promise.all([getStore(), auth()]);
  return (
    <>
      <h2 className="text-xl">{store ? store.name : 'Название магазина'}</h2>
      <AdminButton session={session} />
    </>
  );
}
