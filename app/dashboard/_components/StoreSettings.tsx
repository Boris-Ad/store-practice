import Image from 'next/image';
import Link from 'next/link';
import { getStore } from '@/drizzle/db/store.db';
import { Button } from '@/components/ui/button';

export const StoreSettings = async () => {
  const store = await getStore();
  if (store == null) {
    return (
      <Button asChild variant="outline" className="text-slate-800">
        <Link href="/dashboard/store-edit">Создать магазин</Link>
      </Button>
    );
  }

  return (
    <div className="p-2 border border-slate-600 rounded space-y-3">
      <h3 className="text-lg">{store.name}</h3>
      <Image src={store.bannerUrl} width={250} height={200} alt="banner" priority className="aspect-video object-cover" />
      <Button asChild className="w-full">
        <Link href="/dashboard/store-edit">Редактировать</Link>
      </Button>
    </div>
  );
};
