import Image from "next/image";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./_components/product-list";
import Categories from "./_components/categories";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const categories = await prismaClient.category.findMany({});

  return (
    <div>
      <Image
        src={"/banner-home-01.png"}
        alt="Até 55% de desconto esse mes."
        height={0}
        width={0}
        sizes="100vw"
        className="h-auto w-full px-5"
      />
      <div className="mt-8 px-5">
        <Categories categories={categories} />
      </div>

      <div className="mt-8">
        <p className="mb-3 pl-5 font-bold uppercase">Ofertas</p>
        <ProductList products={deals} />
      </div>
      <Image
        src={"/banner-home-02.png"}
        alt="Até 55% de desconto em mouses."
        height={0}
        width={0}
        sizes="100vw"
        className="h-auto w-full p-5"
      />
    </div>
  );
}
