import { prismaClient } from "@/lib/prisma";

const ProductsPage = async () => {
  const products = await prismaClient.product.findMany({});

  return (
    <div>
      <h1>ds</h1>
    </div>
  );
};

export default ProductsPage;
