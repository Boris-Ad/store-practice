'use client';

import React, { useRef } from 'react';
import Form from 'next/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CategoryTable } from '@/drizzle/schema';

export const SelectCategory = ({ categories }: { categories: (typeof CategoryTable.$inferSelect)[] }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Form action="/dashboard/products">
      <Select name="category" onValueChange={() => buttonRef.current && buttonRef.current.click()}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Выбрать категорию" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Все категории</SelectItem>
          {categories.map(category => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <button ref={buttonRef} type="submit" className="hidden" />
    </Form>
  );
};
