import { getStore } from '@/drizzle/db/store.db';
import { auth } from '@/service/auth';
import Image from 'next/image';
import { Suspense } from 'react';
import { UserButton } from './UserButton';

export const Navbar = () => {
  return (
    <header className="h-15 shadow-md">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-x-3">
          <Suspense fallback={<h3>Logo</h3>}>
            <SuspendedLogoComponent />
          </Suspense>
        </div>
        <div className="flex items-center gap-x-4">
          <Suspense>
            <SuspendedUserButtonComponent />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

async function SuspendedLogoComponent() {
  const store = await getStore();
  if (store == null) return <h3>Logo</h3>;
  return (
    <div className="flex items-center space-x-4">
      <Image src={store.logoUrl} alt="Logo" width={40} height={40} className="w-10 h-10" />
      <h3 className="text-xl font-montserrat">{store.name}</h3>
    </div>
  );
}

async function SuspendedUserButtonComponent() {
  const session = await auth();
  return <UserButton session={session} />;
}
