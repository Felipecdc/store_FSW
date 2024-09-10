import { prismaClient } from "@/lib/prisma";
import ProductImage from "./_components/product-images";
import ProductInfo from "./_components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";
import ProductList from "@/components/ui/product-list";

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
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 pb-8">
      <ProductImage imageUrls={product.imageUrls} name={product.name} />
      <ProductInfo product={computeProductTotalPrice(product)} />
      <ProductList products={product.category.products} />
    </div>
  );
};

export default ProductDetailPage;
