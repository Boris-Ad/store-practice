import { Suspense } from 'react';
import { AdminPagesTitle } from '../_components/AdminPagesTitle';
import { getStore } from '@/drizzle/db/store.db';
import { StoreForm } from '../_components/forms/StoreForm';

const StoreEditPage = () => {
  return (
    <>
      <Suspense fallback={<p>Load...</p>}>
        <SuspendedStoreEditComponent />
      </Suspense>
    </>
  );
};

export default StoreEditPage;

async function SuspendedStoreEditComponent() {
  const store = await getStore();
  return (
    <>
      <AdminPagesTitle>{store ? 'Редактирование магазина' : 'Создание магазина'}</AdminPagesTitle>
      <StoreForm store={store} />
    </>
  );
}
