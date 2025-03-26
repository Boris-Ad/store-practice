'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TableHead } from '@/components/ui/table';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const NumberOfTableHead = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleSearchParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    const search = searchParams.has('number', 'desc');
    if (search) {
      params.delete('number');
    } else if (searchParams.has('number', 'asc')) {
      params.set('number', 'desc');
    } else {
      params.delete('price');
      params.set('number', 'asc');
    }
    router.push(pathname + '?' + params);
  };

  return (
    <TableHead>
      <button onClick={toggleSearchParams} className={cn('px-3 py-1 flex items-center')}>
        Количество
        <ChevronRight
          size={18}
          className={
            cn({ 'rotate-90': searchParams.has('number', 'asc') },
             { 'rotate-270': searchParams.has('number', 'desc') },
             { 'text-orange-500': searchParams.has('number') },
              'transition-transform')}
        />
      </button>
    </TableHead>
  );
};
