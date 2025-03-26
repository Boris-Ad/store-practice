'use client';

import React from 'react';
import Form from 'next/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface IFormErrors {
  name?: string[];
  price?: string[];
  number?: string[];
}

export const ProductForm = ({
  handleSubmit,
  errors,
  setErrors,
  inputs,
}: {
  handleSubmit: (data: FormData) => void;
  errors?: IFormErrors;
  setErrors: React.Dispatch<React.SetStateAction<IFormErrors | undefined>>;
  inputs?: { name?: string; price?: string; number?: string };
}) => {
  return (
    <Form id="product" action={handleSubmit} className="flex gap-3">
      <div className="w-full relative">
        <Label htmlFor="name">Название</Label>
        <Input
          id="name"
          name="name"
          defaultValue={inputs?.name}
          onFocus={() => setErrors(prev => ({ ...prev, name: undefined }))}
          className={cn({ 'border-destructive': errors?.name })}
        />
        {errors?.name && <p className="text-sm text-destructive absolute start-1 bottom-0 translate-y-full">{errors.name}</p>}
      </div>

      <div className="w-full relative">
        <Label htmlFor="price">Цена</Label>
        <Input
          id="price"
          name="price"
          defaultValue={inputs?.price}
          onFocus={() => setErrors(prev => ({ ...prev, price: undefined }))}
          className={cn({ 'border-destructive': errors?.price })}
        />
        {errors?.price && <p className="text-sm text-destructive absolute start-1 bottom-0 translate-y-full">{errors.price}</p>}
      </div>

      <div className="w-full relative">
        <Label htmlFor="number">Количество</Label>
        <Input
          id="number"
          name="number"
          defaultValue={inputs?.number}
          onFocus={() => setErrors(prev => ({ ...prev, number: undefined }))}
          className={cn({ 'border-destructive': errors?.number })}
        />
        {errors?.number && <p className="text-sm text-destructive absolute start-1 bottom-0 translate-y-full">{errors.number}</p>}
      </div>
    </Form>
  );
};
