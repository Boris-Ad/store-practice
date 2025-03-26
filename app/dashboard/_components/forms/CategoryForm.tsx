'use client';

import React from 'react';
import Form from 'next/form';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImagePlus, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CategoryTable } from '@/drizzle/schema';
import { useSelectedCategory } from '@/hooks/useSelectedCategory';
import { createCategoryAction, updateCategoryAction } from '../../_actions/category.actions';


export const CategoryForm = ({
  category,
  setModalIsVisible,
}: {
  category?: typeof CategoryTable.$inferSelect;
  setModalIsVisible: (value: boolean) => void;
}) => {
  const { setSelectedCategory } = useSelectedCategory(state => state);
  const [state, formAction, isPending] = React.useActionState(category ? updateCategoryAction.bind(null, category.id) : createCategoryAction, {});
  const [imageUrl, setImageUrl] = React.useState<string | undefined>();
  const [errors, setErrors] = React.useState<typeof state.errors>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files[0] && files[0].size > 0) {
      const fileUrl = URL.createObjectURL(files[0]);
      setImageUrl(fileUrl);
    } else {
      setImageUrl(undefined);
    }
  };

  React.useEffect(() => {
    const errorsField = state.errors;
    setErrors({ name: errorsField?.name, image: errorsField?.image });

    if (state.category) {
      setModalIsVisible(false);
      setSelectedCategory(state.category);
    }
    setImageUrl(undefined);
  }, [state]);

  return (
    <Form action={formAction} className="space-y-5">
      <div className="relative space-y-2">
        <Label htmlFor="name">Название</Label>
        <Input
          id="name"
          name="name"
          defaultValue={category?.name || state.inputs?.name}
          onFocus={() => setErrors(prev => ({ ...prev, name: undefined }))}
          className={cn({ 'border-destructive': errors?.name })}
        />
        {errors?.name && <p className="absolute start-1 bottom-0 translate-y-full text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium">Изображение</p>
        <Label htmlFor="image" className="grid place-content-center border border-slate-300 aspect-[3/2] cursor-pointer relative">
          <ImagePlus size={42} className="text-slate-400" />
          {imageUrl && <Image src={imageUrl} alt="Category" fill sizes="500px" priority className="object-cover" />}

          {errors?.image && <p className="absolute start-1 bottom-1 text-sm text-destructive -z-10">{errors.image}</p>}
        </Label>
        <Input type="file" id="image" name="image" accept="image/*" onChange={handleChange} className="hidden" />
      </div>
      {category ? (
        <Button disabled={isPending}>{isPending ? <Loader style={{ width: 24, height: 24 }} className="animate-spin" /> : 'Сохранить'}</Button>
      ) : (
        <Button disabled={isPending}>{isPending ? <Loader style={{ width: 24, height: 24 }} className="animate-spin" /> : 'Создать'}</Button>
      )}
    </Form>
  );
};
