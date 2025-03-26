'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { deleteProductAction } from '@/app/dashboard/_actions/product.actions';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';


export const DeleteProductMenuItem = ({ productId }: { productId: string }) => {
  const [isPending, startTransition] = useTransition();
  return (
    <DropdownMenuItem
      disabled={isPending}
      className="text-destructive focus:text-destructive"
      onClick={() => {
        startTransition(async () => {
          await deleteProductAction(productId);
          startTransition(() => {
            toast('Продукт удален!');
          });
        });
      }}
    >
      Удалить
    </DropdownMenuItem>
  );
};
