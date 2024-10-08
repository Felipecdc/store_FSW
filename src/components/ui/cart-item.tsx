import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";
import { formatCurrency } from "@/helpers/formatCurrency";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    IncreaseProductQuantity,
    RemoveProductOnCart,
  } = useContext(CartContext);

  const handleDecreaseProductClick = () => {
    decreaseProductQuantity(product.id);
  };

  const handleIncreaseProductClick = () => {
    IncreaseProductQuantity(product.id);
  };

  const handleRemoveProductOnCart = () => {
    RemoveProductOnCart(product.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-xs">{product.name}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">
              {formatCurrency({ price: product.totalPrice })}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75">
                {formatCurrency({ price: Number(product.basePrice) })}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              size={"icon"}
              variant={"outline"}
              className="h-8 w-8"
              onClick={handleDecreaseProductClick}
            >
              <ArrowLeftIcon size={16} />
            </Button>
            <span className="text-xs">{product.quantity}</span>
            <Button
              size={"icon"}
              variant={"outline"}
              className="h-8 w-8"
              onClick={handleIncreaseProductClick}
            >
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
      <Button
        size={"icon"}
        variant={"outline"}
        onClick={handleRemoveProductOnCart}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
