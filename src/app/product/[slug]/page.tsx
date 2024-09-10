import { prismaClient } from "@/lib/prisma";
import ProductImage from "./_components/product-images";

interface ProductDetailProp {
  params: {
    slug: string;
  };
}

const ProductDetailPage = async ({ params: { slug } }: ProductDetailProp) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
  });

  if (!product) {
    return null;
  }

  return (
    <div>
      <ProductImage imageUrls={product.imageUrls} name={product.name} />
    </div>
  );
};

export default ProductDetailPage;
