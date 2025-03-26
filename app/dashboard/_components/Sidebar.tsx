import { SidebarNav } from './SidebarNav';
import { StoreSettings } from './StoreSettings';
import { Suspense } from 'react';

export const Sidebar = () => {
  return (
    <section className="p-2 pt-[70px] row-span-full bg-face-background text-face-foreground flex flex-col justify-between">
      <SidebarNav />
      <Suspense>
        <StoreSettings />
      </Suspense>
    </section>
  );
};
