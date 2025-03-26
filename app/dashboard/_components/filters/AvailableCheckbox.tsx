'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export const AvailableCheckbox = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [checkedAvailable, setCheckedAvailable] = useState<'available' | 'notAvailable' | false>(false);
  
  const setSearchParamsByAvailable = () => {
    const params = new URLSearchParams(searchParams.toString());

    switch (checkedAvailable) {
      case 'available':
        params.set('available', 'true');
        break;
      case 'notAvailable':
        params.set('available', 'false');
        break;
      default:
        params.delete('available');
    }
    router.push(pathname + '?' + params);
  };

  useEffect(() => {
    setSearchParamsByAvailable();
  }, [checkedAvailable]);

  return (
    <div className='flex flex-col space-y-2'>
      <div className="flex items-center space-x-1">
        <Checkbox
          id="available"
          checked={checkedAvailable === 'available' ? true : false}
          onCheckedChange={value => setCheckedAvailable(value ? 'available' : value)}
        />
        <Label htmlFor="available">Продукты доступные к продаже</Label>
      </div>
      <div className="flex items-center space-x-1">
        <Checkbox
          id="not-available"
          checked={checkedAvailable === 'notAvailable' ? true : false}
          onCheckedChange={value => setCheckedAvailable(value ? 'notAvailable' : value)}
        />
        <Label htmlFor="not-available">Продукты недоступные к продаже</Label>
      </div>
    </div>
  );
};
