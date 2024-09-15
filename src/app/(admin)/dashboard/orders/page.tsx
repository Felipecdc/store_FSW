import { Badge } from "@/components/ui/badge";
import OrderItem from "@/components/ui/order-item";
import { prismaClient } from "@/lib/prisma";
import { ListOrderedIcon } from "lucide-react";

const OrdersPage = async () => {
  const orders = await prismaClient.order.findMany({
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="flex w-full flex-col gap-10 p-10">
      <Badge variant={"heading"}>
        <ListOrderedIcon size={18} /> Produtos
      </Badge>
      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-bold">
          Pedidos encontrados: {orders.length}
        </p>
      </div>
      <div className="flex h-full flex-col gap-3 overflow-auto">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
