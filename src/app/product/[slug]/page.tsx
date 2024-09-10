import { prismaClient } from "@/lib/prisma";
import ProductImage from "./_components/product-images";
import ProductInfo from "./_components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";

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
    <div className="flex flex-col gap-8">
      <ProductImage imageUrls={product.imageUrls} name={product.name} />
      <ProductInfo product={computeProductTotalPrice(product)} />
    </div>
  );
};

export default ProductDetailPage;
