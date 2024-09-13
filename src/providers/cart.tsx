"use client";

import { ProductsWithTotalPrice } from "@/helpers/product";
import {
  FunctionComponent,
  ReactNode,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface CartProduct extends ProductsWithTotalPrice {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  subTotal: number;
  total: number;
  totalDiscount: number;
  addProductsToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  IncreaseProductQuantity: (productId: string) => void;
  RemoveProductOnCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  subTotal: 0,
  total: 0,
  totalDiscount: 0,
  addProductsToCart: () => {},
  decreaseProductQuantity: () => {},
  IncreaseProductQuantity: () => {},
  RemoveProductOnCart: () => {},
});

const CartProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  // const [products, setProducts] = useState<CartProduct[]>([]);

  const [products, setProducts] = useState<CartProduct[]>(() => {
    const storedProducts = localStorage.getItem("@cartProducts");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem("@cartProducts", JSON.stringify(products));
  }, [products]);

  // useEffect(() => {
  //   const localProductsCart = localStorage.getItem("@cartProducts");
  //   if (localProductsCart) {
  //     setProducts(JSON.parse(localProductsCart));
  //   }
  // }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     localStorage.setItem("@cartProducts", JSON.stringify(products));
  //   }, 0);
  // }, [products]);

  const subTotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.basePrice) * product.quantity;
    }, 0);
  }, [products]);

  const total = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.totalPrice * product.quantity;
    }, 0);
  }, [products]);

  const totalDiscount = total - subTotal;

  const addProductsToCart = (product: CartProduct) => {
    const productAlreadyOnCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    );

    if (productAlreadyOnCart) {
      setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }

          return cartProduct;
        }),
      );
      return;
    }

    setProducts((prev) => [...prev, product]);
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev
        .map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            };
          }

          return cartProduct;
        })
        .filter((cartProduct) => cartProduct.quantity > 0),
    );
  };

  const IncreaseProductQuantity = (productId: string) => {
    setProducts((prev) =>
      prev.map((cartProduct) => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1,
          };
        }

        return cartProduct;
      }),
    );
  };

  const RemoveProductOnCart = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        products,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
        subTotal,
        total,
        totalDiscount,
        addProductsToCart,
        decreaseProductQuantity,
        IncreaseProductQuantity,
        RemoveProductOnCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
