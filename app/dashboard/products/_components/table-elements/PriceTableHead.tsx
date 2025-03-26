'use client';

import React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TableHead } from '@/components/ui/table';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export const PriceTableHead = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleSearchParams = () => {
    const params = new URLSearchParams(searchParams.toString());
    const search = searchParams.has('price', 'desc');
    if (search) {
      params.delete('price');
    } else if (searchParams.has('price', 'asc')) {
      params.set('price', 'desc');
    } else {
      params.delete('number');
      params.set('price', 'asc');
    }
    router.push(pathname + '?' + params);
  };

  return (
    <TableHead>
      <button onClick={toggleSearchParams} className={cn('px-3 py-1 flex items-center')}>
        Цена
        <ChevronRight
          size={18}
          className={cn(
            { 'rotate-90': searchParams.has('price', 'asc') },
            { 'rotate-270': searchParams.has('price', 'desc') },
            { 'text-orange-500': searchParams.has('price') },
            'transition-transform'
          )}
        />
      </button>
    </TableHead>
  );
};
