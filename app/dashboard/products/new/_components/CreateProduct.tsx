'use client';

import React, { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { ProductForm } from '@/app/dashboard/_components/forms/ProductForm';
import { useSelectedCategory } from '@/hooks/useSelectedCategory';
import { Button } from '@/components/ui/button';
import { createProductAction } from '@/app/dashboard/_actions/product.actions';
import { ImagesToProductForm } from '../../_components/ImagesToProductForm';

export const CreateProduct = () => {
  const { selectedCategory } = useSelectedCategory(state => state);
  const [errors, setErrors] = useState<{ name?: string[]; price?: string[]; number?: string[]; images?: string[] }>();
  const [images, setImages] = useState<{ id: string; imageUrl: string; imageFile?: File }[]>([]);
  const [state, formAction, isPending] = useActionState(createProductAction.bind(null, images), {});

  useEffect(() => {
    setErrors(state.errors);
    if (state.success) {
      toast('Продукт создан!');
      setImages([]);
    }
  }, [state]);

  if (selectedCategory == null) return null;

  const handleSubmit = (formData: FormData) => {
    formData.append('categoryId', selectedCategory.id);
    formAction(formData);
  };

  return (
    <section className="w-full max-w-[1200] py-6 space-y-6">
      <h2 className="text-2xl">Категория: {selectedCategory?.name}</h2>
      <ProductForm handleSubmit={handleSubmit} errors={errors} setErrors={setErrors} inputs={state.inputFields} />
      <ImagesToProductForm
        images={images}
        setImages={setImages}
        error={errors?.images}
        clearError={() => setErrors(prev => ({ ...prev, images: undefined }))}
      />
      <div className="flex items-center gap-x-4">
        <Button type="submit" disabled={isPending} form="product">
          {isPending ? <Loader style={{ width: 24, height: 24 }} className="animate-spin" /> : 'Сохранить'}
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard/products">Отмена</Link>
        </Button>
      </div>
    </section>
  );
};
