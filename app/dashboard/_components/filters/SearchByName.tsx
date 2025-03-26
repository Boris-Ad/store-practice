'use client';

import React, { useRef } from 'react';
import Form from 'next/form';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const SearchByName = () => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const searchSubmit = () => {
    let timeout: NodeJS.Timeout | undefined = undefined;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      btnRef.current?.click();
    }, 400);
  };

  return (
    <>
      <Form action="/dashboard/products">
        <div className="relative">
          <Input name="name" onChange={searchSubmit} placeholder="Поиск по названию" className="pr-8" />
          <Search size={18} className="text-slate-500 absolute end-2 top-1/2 -translate-y-1/2" />
        </div>
        <button ref={btnRef} type="submit" className="hidden" />
      </Form>
    </>
  );
};
