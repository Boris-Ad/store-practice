import { Suspense } from 'react';

const ProductIdPage = ({ params }: { params: Promise<{ productId: string }> }) => {
  return (
    <Suspense>
      <Section params={params} />
    </Suspense>
  );
};

export default ProductIdPage;

async function Section({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;

  return <h2>ProductId: {productId}</h2>;
}
