import { Suspense } from 'react';
import { AdminPagesTitle } from '../../_components/AdminPagesTitle';
import { CategoriesSkeleton } from '../../_skeletons/CategoriesSkeleton';
import { getCategories } from '@/drizzle/db/categories.db';
import { Categories } from '../_components/Categories';
import { CreateProduct } from './_components/CreateProduct';

const NewProductPage = () => {
  return (
    <>
      <AdminPagesTitle>Добавить продукт</AdminPagesTitle>
      <section className="max-w-[1200px]">
        <div className="space-y-6">
          <h3 className="text-xl">Выбрать категорию</h3>
          <Suspense fallback={<CategoriesSkeleton />}>
            <SuspendedCategoriesComponent />
          </Suspense>
        </div>
        <CreateProduct />
      </section>
    </>
  );
};

export default NewProductPage;

async function SuspendedCategoriesComponent() {
  const categories = await getCategories();
  return <Categories categories={categories} />;
}
