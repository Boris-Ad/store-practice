'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CategoryTable } from '@/drizzle/schema';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CategoryForm } from '../../_components/forms/CategoryForm';
import { Separator } from '@/components/ui/separator';
import { CategoryCard } from './CategoryCard';

export const Categories = ({ categories }: { categories: (typeof CategoryTable.$inferSelect)[] }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="h-40 p-2 border border-slate-400 rounded flex gap-3">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 1 }}
            className="h-full aspect-[3/2] border border-slate-400 rounded grid place-content-center cursor-pointer"
          >
            Создать категорию
          </motion.button>
        </DialogTrigger>
        <DialogContent aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle className="text-xl">Новая категория</DialogTitle>
          </DialogHeader>
          <CategoryForm setModalIsVisible={setOpenDialog} />
        </DialogContent>
      </Dialog>
      <Separator className="bg-slate-400" orientation="vertical" />
      {categories.map(category => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};
