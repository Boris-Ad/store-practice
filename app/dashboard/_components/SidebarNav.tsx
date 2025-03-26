'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarNavLinks } from '@/app/dashboard/_data/dashboard.data';

export const SidebarNav = () => {
  const pathname = usePathname();

  return (
    <nav className="p-2">
      <ul className="text-lg text-slate-300">
        {sidebarNavLinks.map(page => (
          <li key={page.title}>
            <Link
              href={page.href}
              className={cn(
                'w-full p-2 block hover:bg-slate-600 rounded-md transition-colors',
                {
                  'text-amber-500': pathname === page.href,
                },
                pathname === page.href ? 'hover:text-amber-500' : 'hover:text-white'
              )}
            >
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
