const ProductIdPage = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;
  return (
    <div>
      <h2>{productId}</h2>
    </div>
  );
};

export default ProductIdPage;
