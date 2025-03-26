 "use cache"

import { unstable_cacheTag } from 'next/cache';

const ProductIdPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
   

    unstable_cacheTag('productId')
    
  const { productId } = await params;
  return (
    <div>
      <h2>{productId}</h2>
    </div>
  );
};

export default ProductIdPage;
