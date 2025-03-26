'use client';

import React, { useEffect, useState, useActionState } from 'react';
import Link from 'next/link';
import { ImagesTable, ProductTable, CategoryTable } from '@/drizzle/schema';
import { useSelectedCategory } from '@/hooks/useSelectedCategory';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { ProductForm } from '@/app/dashboard/_components/forms/ProductForm';
import { editProductAction } from '@/app/dashboard/_actions/product.actions';
import { Button } from '@/components/ui/button';
import { ImagesToProductForm } from '@/app/dashboard/products/_components/ImagesToProductForm';

type Product = typeof ProductTable.$inferSelect & { images: (typeof ImagesTable.$inferSelect)[] };

export const EditProduct = ({ product, category }: { product: Product; category: typeof CategoryTable.$inferSelect }) => {
  const { setSelectedCategory, selectedCategory } = useSelectedCategory(state => state);
  const [errors, setErrors] = useState<{ name?: string[]; price?: string[]; number?: string[]; images?: string[] }>();
  const [images, setImages] = React.useState<{ id: string; imageUrl: string; imageFile?: File }[]>([]);
  const [state, formAction, isPending] = useActionState(editProductAction.bind(null, images, product.id), {});

  const handleSubmit = (formData: FormData) => {
    if (selectedCategory == null) return;
    formData.append('categoryId', selectedCategory.id);
    formAction(formData);
  };

  useEffect(() => {
    setErrors(state.errors);
    if (state.success) {
      toast('Продукт обновлен!');
    }
    if (state.message) {
      toast(state.message);
    }
  }, [state]);

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  useEffect(() => {
    const img: typeof images = [];
    product.images.forEach(image => img.push({ id: image.id, imageUrl: image.url }));
    setImages(img);
  }, [product]);

  return (
    <section className="w-full max-w-[1200] py-6 space-y-6">
      <h2 className="text-2xl">Категория: {selectedCategory?.name}</h2>
      <ProductForm
        handleSubmit={handleSubmit}
        errors={errors}
        setErrors={setErrors}
        inputs={{ name: product.name, price: product.price.toString(), number: product.number.toString() }}
      />
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
