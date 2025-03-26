'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Loader, SlidersHorizontal, Trash2 } from 'lucide-react';
import { CategoryTable } from '@/drizzle/schema';
import { useSelectedCategory } from '@/hooks/useSelectedCategory';
import { deleteCategoryAction } from '../../_actions/category.actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CategoryForm } from '../../_components/forms/CategoryForm';

export const CategoryCard = ({ category }: { category: typeof CategoryTable.$inferSelect }) => {
  const { setSelectedCategory, selectedCategory } = useSelectedCategory(state => state);
  const [isPending, startTransition] = React.useTransition();
  const [modalIsVisible, setModalIsVisible] = React.useState(false);
  const [isVisibleAlert, setIsVisibleAlert] = React.useState(false);

  const deleteCategory = () => {
    if (category.id === selectedCategory?.id) {
      setSelectedCategory(null);
    }
    startTransition(async () => {
      deleteCategoryAction(category.id);
    });
  };

  const getAlert = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsVisibleAlert(true);
  };

  const updateCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setModalIsVisible(true);
  };

  return (
    <>
      {isPending ? (
        <div className="h-full aspect-[3/2] grid place-content-center shadow-md rounded bg-slate-300">
          <Loader size={32} className="animate-spin text-white" />
        </div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 1 }}
          onClick={() => setSelectedCategory(category)}
          className={cn('h-full aspect-[3/2] relative grid place-content-center shadow-md rounded overflow-hidden cursor-pointer group', {
            'ring-4 ring-orange-500': selectedCategory?.id === category.id,
          })}
        >
          <Image src={category.imageUrl} alt={category.name} fill sizes="200px" className="object-cover" priority />
          <div className="absolute inset-0 bg-black/20" />
          <h2 className="text-white z-10">{category.name}</h2>
          <button
            onClick={updateCategory}
            onPointerDownCapture={e => e.stopPropagation()}
            className="w-8 h-8 bg-black/40 absolute top-1 end-1 grid place-content-center rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/30"
          >
            <SlidersHorizontal size={18} className="text-white" />
          </button>

          <button
            onClick={getAlert}
            onPointerDownCapture={e => e.stopPropagation()}
            className="w-8 h-8 bg-black/40 absolute bottom-1 end-1 grid place-content-center rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/30"
          >
            <Trash2 size={18} className="text-destructive" />
          </button>
        </motion.div>
      )}
      <AlertDialog open={isVisibleAlert} onOpenChange={setIsVisibleAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить категорию {category.name}?</AlertDialogTitle>
            <AlertDialogDescription>Вместе с категорией удалятся все продукты этой категории!</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={deleteCategory}>Продолжить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={modalIsVisible} onOpenChange={setModalIsVisible}>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Редактировать категорию</DialogTitle>
          </DialogHeader>
          <CategoryForm category={category} setModalIsVisible={setModalIsVisible} />
        </DialogContent>
      </Dialog>
    </>
  );
};
