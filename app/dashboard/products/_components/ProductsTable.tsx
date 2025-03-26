import Link from 'next/link';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CheckCircle2, MoreVertical, XCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { PriceTableHead } from './table-elements/PriceTableHead';
import { NumberOfTableHead } from './table-elements/NumberTableHead';
import { DeleteProductMenuItem } from './table-elements/DeleteProductMenuItem';
import { ToggleAvailableMenuItem } from './table-elements/ToggleAvailableMenuItem';
import { ProductTable } from '@/drizzle/schema';
import { Suspense } from 'react';

export const ProductsTable = ({ products }: { products: (typeof ProductTable.$inferSelect)[] }) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-0"></TableHead>
            <TableHead>Название</TableHead>
            <Suspense fallback={<p>Load...</p>}>
              <PriceTableHead />
            </Suspense>
            <Suspense fallback={<p>Load...</p>}>
              <NumberOfTableHead />
            </Suspense>
            <TableHead>Продано</TableHead>
            <TableHead>Ожидает доставки</TableHead>
            <TableHead className="w-0"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.id}>
              <TableCell>{product.available ? <CheckCircle2 className="text-green-500" /> : <XCircle className="text-destructive" />}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.number}</TableCell>
              <TableCell>0</TableCell>
              <TableCell>0</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-3">
                    <DropdownMenuItem>
                      <Link href={'/dashboard/products/' + product.id + '/edit'}>Редактировать</Link>
                    </DropdownMenuItem>
                    <ToggleAvailableMenuItem productId={product.id} available={!product.available} />
                    <DropdownMenuSeparator />
                    <DeleteProductMenuItem productId={product.id} />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
