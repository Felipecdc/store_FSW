import { prismaClient } from "@/lib/prisma";
import ProductList from "../../components/ui/product-list";
import Categories from "./_components/categories";
import PromoBanner from "./_components/promo-banner";
import SectionTitle from "@/components/ui/section-title";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  const categories = await prismaClient.category.findMany({});

  return (
    <div className="flex flex-col gap-8 py-8">
      <PromoBanner
        src={"/banner-home-01.png"}
        alt="Até 55% de desconto esse mes."
      />

      <div className="px-5">
        <Categories categories={categories} />
      </div>

      <div>
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>

      <PromoBanner
        src={"/banner-home-02.png"}
        alt="Até 55% de desconto em mouses."
      />

      <div>
        <SectionTitle>Teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>

      <PromoBanner
        src={"/banner-home-03.png"}
        alt="Até 55% de desconto em fones."
      />

      <div>
        <SectionTitle>Mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  );
}
