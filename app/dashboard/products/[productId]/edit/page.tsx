import { Suspense } from 'react';
import { AdminPagesTitle } from '@/app/dashboard/_components/AdminPagesTitle';
import { getCategories, getCategoryById } from '@/drizzle/db/categories.db';
import { getProductById } from '@/drizzle/db/products.db';
import { Categories } from '../../_components/Categories';
import { CategoriesSkeleton } from '@/app/dashboard/_skeletons/CategoriesSkeleton';
import { EditProduct } from './_components/EditProduct';

const EditProductPage = ({ params }: { params: Promise<{ productId: string }> }) => {
  return (
    <>
      <AdminPagesTitle>Редактировать продукт</AdminPagesTitle>
      <section className="max-w-[1200px] space-y-6">
        <h3 className="text-xl">Выбрать категорию</h3>
        <Suspense fallback={<CategoriesSkeleton />}>
          <SuspendedCategoriesComponent />
        </Suspense>
        <Suspense>
          <SuspendedEditProductComponent params={params} />
        </Suspense>
      </section>
    </>
  );
};

export default EditProductPage;

async function SuspendedCategoriesComponent() {
  const categories = await getCategories();
  return <Categories categories={categories} />;
}

async function SuspendedEditProductComponent({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const product = await getProductById(productId, { images: true });
  if (product == null) return null;
  const category = await getCategoryById(product.categoryId, {});
  if (category == null) return null;
  return <EditProduct product={product} category={category} />;
}
