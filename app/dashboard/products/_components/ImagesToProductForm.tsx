'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Reorder } from 'motion/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Image as LucideImage } from 'lucide-react';

interface ImagesToProductFormProps {
  images: { id: string; imageUrl: string; imageFile?: File }[];
  setImages: React.Dispatch<React.SetStateAction<{ id: string; imageUrl: string; imageFile?: File }[]>>;
  error?: string[];
  clearError: () => void;
}

export const ImagesToProductForm = ({ images, setImages, error, clearError }: ImagesToProductFormProps) => {
  const constraintsRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (images.length >= 3) return;
    if (files && files[0] && files[0].size > 0) {
      const imageUrl = URL.createObjectURL(files[0]);
      const imageFile = files[0];

      setImages(prev => [...prev, { id: crypto.randomUUID(), imageUrl, imageFile }]);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const deleteImage = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    const filteredImages = [...images].filter(item => item.id !== id);
    setImages(filteredImages);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xl">
        Изображения перетаскиваются мышью <span className="text-sm">(Расположение изображений сохранится в магазине, первое главное!)</span>
      </h3>
      <div ref={constraintsRef} className="h-60 p-2 border border-slate-400 rounded relative">
        <div className="p-6 absolute inset-0 grid grid-cols-3 gap-x-6 place-items-center">
          {Array.from(new Array(3).keys()).map(item => (
            <LucideImage key={item} size={52} className="text-slate-500" />
          ))}
        </div>
        <Reorder.Group axis="x" values={images} onReorder={setImages} className={'w-full h-full flex gap-3'}>
          {images.map(item => (
            <Reorder.Item key={item.id} value={item} dragConstraints={constraintsRef} className="w-1/3 relative bg-slate-200 cursor-grab group">
              <button
                onClick={e => deleteImage(e, item.id)}
                className="w-8 h-8 absolute top-1 end-1 grid place-content-center bg-slate-300 hover:bg-slate-400/50 rounded cursor-pointer z-10 opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="text-red-500" />
              </button>
              <Image src={item.imageUrl} alt="Image" fill sizes="400px" draggable="false" className="object-contain" priority />
            </Reorder.Item>
          ))}
        </Reorder.Group>
        {error && <p className="text-sm text-destructive absolute start-1 bottom-2">{error}</p>}
      </div>

      <div>
        <Button variant="outline" onClick={clearError}>
          <Label htmlFor="setImage">Добавить изображение</Label>
        </Button>
        <Input ref={inputRef} id="setImage" type="file" className="hidden" onChange={handleChange} disabled={images.length >= 3} />
      </div>
    </div>
  );
};
