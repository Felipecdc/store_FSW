"use client";

import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PackageSearch,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { useContext, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import Link from "next/link";
import Cart from "./cart";
import { CartContext } from "@/providers/cart";
import { Badge } from "./badge";

const Header = () => {
  const { status, data } = useSession();

  const { products } = useContext(CartContext);

  const cartQuantityItems = products.length;

  const [isPending, handleSession] = useTransition();

  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogoutClick = async () => {
    handleSession(async () => {
      await signOut();
    });
  };

  return (
    <Card className="flex items-center justify-between p-[1.8rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>

          {status === "authenticated" && data?.user && (
            <div className="flex-col">
              <div className="flex items-center gap-2 py-4">
                <Avatar>
                  <AvatarFallback>
                    {data?.user?.name?.[0].toUpperCase()}
                  </AvatarFallback>
                  {data.user.image && <AvatarImage src={data?.user?.image} />}
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-medium">{data?.user?.name}</p>
                  <p className="text-sm opacity-70">Boas Compras!</p>
                </div>
              </div>
              <Separator />
            </div>
          )}
          <div className="mt-4 flex flex-col gap-2">
            {status === "unauthenticated" ? (
              <Button
                onClick={handleLoginClick}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <LogInIcon size={16} />
                Fazer Login
              </Button>
            ) : (
              <Button
                onClick={handleLogoutClick}
                variant="outline"
                className="w-full justify-start gap-2"
                disabled={isPending}
              >
                <LogOutIcon size={16} />
                {isPending ? "Desconectando..." : "Fazer Logout"}
              </Button>
            )}

            <SheetClose asChild>
              <Link href={"/"}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <HomeIcon size={16} /> Inicio
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={"/orders"}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <PackageSearch size={16} /> Meus pedidos
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={"/deals"}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <PercentIcon size={16} /> Ofertas
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={"/catalog"}>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <ListOrderedIcon size={16} /> Catálogo
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      <Link href={"/"}>
        <h1 className="text-lg font-semibold">
          <span className="text-primary">Name</span> Store
        </h1>
      </Link>

      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="relative">
            {cartQuantityItems > 0 && (
              <Badge className="absolute right-[calc(-1.25rem/2)] top-[calc(-1.25rem/2)] flex h-5 w-5 items-center justify-center rounded-lg bg-primary text-sm font-bold">
                {cartQuantityItems}
              </Badge>
            )}
            <ShoppingCartIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[90%] max-w-[400px]">
          <Cart />
        </SheetContent>
      </Sheet>
    </Card>
  );
};

export default Header;
