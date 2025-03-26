'use client';

import React, { useState, useActionState, useEffect } from 'react';
import Form from 'next/form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { StoreTable } from '@/drizzle/schema';
import { createStoreAction, updateStoreAction } from '@/app/dashboard/_actions/store.actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const StoreForm = ({ store }: { store?: typeof StoreTable.$inferSelect }) => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(store ? updateStoreAction : createStoreAction, {});
  const [images, setImages] = useState<{ logo?: string; banner?: string }>({});
  const [errors, setErrors] = useState<typeof state.errors>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const fileName = e.target.name;
    if (files && files[0] && files[0].size > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      const logo = fileName === 'logo' ? imageUrl : undefined;
      const banner = fileName === 'banner' ? imageUrl : undefined;
      setImages(prev => ({ logo: logo ? logo : prev.logo, banner: banner ? banner : prev.banner }));
      setErrors(prev => ({ logo: logo ? undefined : prev?.logo, banner: banner ? undefined : prev?.banner }));
    } else {
      setImages(prev => ({ logo: fileName === 'logo' ? undefined : prev.logo, banner: fileName === 'banner' ? undefined : prev.banner }));
    }
  };

  useEffect(() => {
    setErrors(state.errors);
    if (store) {
      if (state.success) {
        toast('Данные изменены!');
      }
    } else {
      if (state.success) {
        toast('Магазин создан!');
        router.push('/dashboard');
      }
      setImages({});
    }

    if (state.success === false) {
      toast('Произошла ошибка!');
    }
  }, [state]);

  useEffect(() => {
    if (store) {
      setImages({ logo: store.logoUrl, banner: store.bannerUrl });
    }
  }, [store]);

  return (
    <Form action={formAction} className="max-w-sm space-y-5">
      <div className="space-y-2 relative">
        <Label htmlFor="name">Название магазина</Label>
        <Input
          type="text"
          id="name"
          name="name"
          defaultValue={store ? store.name : state.inputs?.name}
          onFocus={() => setErrors(prev => ({ ...prev, name: undefined }))}
          className={cn({ 'border-destructive/80': errors?.name })}
        />
        {errors?.name && <p className="text-sm text-destructive absolute start-0 bottom-0 translate-y-full">{errors.name}</p>}
      </div>
      <div className="space-y-2 relative">
        <Label htmlFor="logo">Логотип магазина</Label>
        <Input type="file" id="logo" name="logo" accept="image/*" onChange={handleChange} className={cn({ 'border-destructive/80': errors?.logo })} />
        {errors?.logo && <p className="text-sm text-destructive absolute start-0 bottom-0 translate-y-full">{errors.logo}</p>}
      </div>
      <div className="w-16 mt-6 aspect-square bg-slate-200 grid place-items-center relative">
        {images.logo && <Image src={images.logo} alt="banner" fill sizes="64px" className="object-cover" />}
      </div>
      <div className="space-y-2 relative">
        <Label htmlFor="banner">Баннер магазина</Label>
        <Input type="file" id="banner" name="banner" accept="image/*" onChange={handleChange} className={cn({ 'border-destructive/80': errors?.banner })} />
        {errors?.banner && <p className="text-sm text-destructive absolute start-0 bottom-0 translate-y-full">{errors.banner}</p>}
      </div>
      <div className="mt-6 aspect-video bg-slate-200 grid place-items-center relative">
        {images.banner && <Image src={images.banner} alt="banner" fill sizes="400px" priority className="object-cover" />}
      </div>
      <div className="flex space-x-4">
        <Button disabled={isPending}>{isPending ? <Loader style={{ width: 24, height: 24 }} className="animate-spin" /> : 'Создать'}</Button>
        <Button asChild variant="outline">
          <Link href="/dashboard">Отмена</Link>
        </Button>
      </div>
    </Form>
  );
};
