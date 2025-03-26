'use client';

import React from 'react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { toggleAvailableAction } from '@/app/dashboard/_actions/product.actions';


export const ToggleAvailableMenuItem = ({ productId, available }: { productId: string; available: boolean }) => {
  const [isPending, startTransition] = React.useTransition();
  const handleClick = () => {
    startTransition(async () => {
      await toggleAvailableAction(productId, available);
    });
  };
  return (
    <DropdownMenuItem onClick={handleClick} disabled={isPending}>
      {available ? 'Выставить на продажу' : 'Снять с продажи'}
    </DropdownMenuItem>
  );
};
