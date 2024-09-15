import { Prisma } from "@prisma/client";
import { Card } from "./card";
import { format } from "date-fns";
import { Separator } from "./separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { useMemo } from "react";
import { formatCurrency } from "@/helpers/formatCurrency";
import { computeProductTotalPrice } from "@/helpers/product";
import OrderProductItem from "@/app/(shop)/orders/_components/order-product-item";
import { getOrderStatus } from "@/app/(shop)/orders/helpers/status";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const subTotal = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      return (
        acc + Number(orderProduct.product.basePrice) * orderProduct.quantity
      );
    }, 0);
  }, [order.orderProducts]);

  const total = useMemo(() => {
    return order.orderProducts.reduce((acc, orderProduct) => {
      const productTotalPrice = computeProductTotalPrice(orderProduct.product);
      return acc + productTotalPrice * orderProduct.quantity;
    }, 0);
  }, [order.orderProducts]);

  const totalDiscount = total - subTotal;

  return (
    <Card className="px-5">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              <p className="text-sm font-medium uppercase">
                Pedido com {order.orderProducts.length} produto(s)
              </p>
              <p className="text-xs opacity-60">
                Feito em {format(order.createdAt, "d/MM/y 'ás' HH:mm")}
              </p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="font-bold">
                  <p>Status</p>
                  <p className="text-[#8162ff]">
                    {getOrderStatus(order.status)}
                  </p>
                </div>
                <div>
                  <p className="font-bold">Data</p>
                  <p className="opacity-75">
                    {format(order.createdAt, "d/MM/y")}
                  </p>
                </div>
                <div>
                  <p className="font-bold">Pagamento</p>
                  <p className="opacity-75">Cartão</p>
                </div>
              </div>
              {order.orderProducts.map((orderProduct) => (
                <OrderProductItem
                  key={orderProduct.id}
                  orderProduct={orderProduct}
                />
              ))}
            </div>
            <div className="flex w-full flex-col gap-1 pt-3 text-xs">
              <Separator />
              <div className="flex w-full justify-between py-3">
                <p>Subtotal</p>
                <p>{formatCurrency({ price: subTotal })}</p>
              </div>
              <Separator />
              <div className="flex w-full justify-between py-3">
                <p>Entrega</p>
                <p className="uppercase">Grátis</p>
              </div>
              <Separator />
              <div className="flex w-full justify-between py-3">
                <p>Descontos</p>
                <p>{formatCurrency({ price: totalDiscount })}</p>
              </div>
              <Separator />
              <div className="flex w-full justify-between py-3 text-sm font-bold">
                <p>Total</p>
                <p>{formatCurrency({ price: total })}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
