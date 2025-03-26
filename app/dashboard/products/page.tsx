import Link from 'next/link';
import { AdminPagesTitle } from '../_components/AdminPagesTitle';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/drizzle/db/products.db';
import { ProductsTable } from './_components/ProductsTable';
import { Suspense } from 'react';
import { TableSkeleton } from '../_skeletons/TableSkeleton';
import { SearchByName } from '../_components/filters/SearchByName';
import { getCategories } from '@/drizzle/db/categories.db';
import { SelectCategory } from '../_components/filters/SelectCategory';
import { AvailableCheckbox } from '../_components/filters/AvailableCheckbox';

const ProductsPage = ({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <AdminPagesTitle>Продукты</AdminPagesTitle>
        <Button asChild>
          <Link href="/dashboard/products/new">Создать продукт</Link>
        </Button>
      </div>

      <h2 className="text-xl">Фильтры</h2>
      <div className="my-4 grid grid-cols-4 gap-x-3">
        <SearchByName />
        <Suspense>
          <SuspendedSelectCategoryComponent />
        </Suspense>
        <div />
        <Suspense>
          <AvailableCheckbox />
        </Suspense>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <SuspendedTableComponent searchParams={searchParams} />
      </Suspense>
    </>
  );
};

export default ProductsPage;

async function SuspendedTableComponent({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const searchParamsValue = await searchParams;
  const products = await getProducts(searchParamsValue);
  return <ProductsTable products={products} />;
}

async function SuspendedSelectCategoryComponent() {
  const categories = await getCategories();
  return <SelectCategory categories={categories} />;
}
