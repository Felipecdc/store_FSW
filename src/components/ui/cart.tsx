import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { createOrder } from "@/actions/order";
import { useSession } from "next-auth/react";

const Cart = () => {
  const { data } = useSession();
  const { products, subTotal, total, totalDiscount } = useContext(CartContext);

  const handleFinishPurchaseClick = async () => {
    if (!data?.user) {
      return;
    }

    await createOrder(products, (data?.user as any).id);

    const checkout = await createCheckout(products);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant={"outline"}
      >
        <ShoppingCartIcon />
        Carrinho
      </Badge>
      <div className="h-full overflow-hidden">
        <ScrollArea className="h-full">
          <div className="flex h-full flex-col gap-5">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={computeProductTotalPrice(product as any) as any}
                />
              ))
            ) : (
              <p className="text-center font-semibold opacity-70">
                Carrinho vazio.
              </p>
            )}
          </div>
        </ScrollArea>
      </div>
      {products.length > 0 && (
        <>
          <div className="flex flex-col gap-3 text-xs">
            <Separator />
            <div className="flex items-center justify-between">
              <p>Subtotal</p>
              <p>R$ {subTotal.toFixed(2)}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <p>Entrega</p>
              <p className="uppercase">Grátis</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <p>Descontos</p>
              <p>R$ {totalDiscount.toFixed(2)}</p>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-sm font-bold">
              <p>Total</p>
              <p>R$ {total.toFixed(2)}</p>
            </div>
          </div>
          <Button
            className="font-bold uppercase"
            onClick={handleFinishPurchaseClick}
          >
            Finalizar Compra
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
