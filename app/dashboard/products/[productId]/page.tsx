import { Suspense } from 'react';

const ProductIdPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
  
  return (
    <div>
      <Suspense>
        <SuspendedProduct params={params} />
      </Suspense>
    </div>
  );
};

export default ProductIdPage;

async function SuspendedProduct({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  return <p>{productId}</p>;
}
