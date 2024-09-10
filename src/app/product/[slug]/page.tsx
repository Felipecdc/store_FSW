import { prismaClient } from "@/lib/prisma";

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

  return <h1>{product?.name}</h1>;
};

export default ProductDetailPage;
