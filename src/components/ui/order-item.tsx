import { Prisma } from "@prisma/client";
import { Card } from "./card";
import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import OrderProductItem from "@/app/orders/_components/order-product-item";

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
  return (
    <Card className="px-5">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              Pedido com {order.orderProducts.length}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="font-bold">
                  <p>Status</p>
                  <p className="text-[#8162ff]">{order.status}</p>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default OrderItem;
