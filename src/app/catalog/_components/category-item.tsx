import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex flex-col">
      <div className="bg-category-item-gradient h- flex h-[130px] w-full items-center justify-center rounded-t-lg">
        <Image
          src={category.imageUrl}
          alt={category.name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-full max-w-[80%]"
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <div className="rounded-b-lg bg-accent py-3">
        <p className="text-center text-sm font-semibold">{category.name}</p>
      </div>
    </div>
  );
};

export default CategoryItem;
