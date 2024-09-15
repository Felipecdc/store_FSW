import { Badge } from "@/components/ui/badge";
import OrderItem from "@/components/ui/order-item";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { PackageSearch } from "lucide-react";
import { getServerSession } from "next-auth";

const OrderPage = async () => {
  const user = getServerSession(authOptions);

  if (!user) {
    return <p>Access Denied.</p>;
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (user as any).id,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant={"outline"}
      >
        <PackageSearch />
        Meus pedidos
      </Badge>

      <div className="flex flex-col gap-5">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
