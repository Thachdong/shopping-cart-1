"use client";

import { ELOCALSTORAGE_KEYS } from "@/constants";
import { getItem } from "@/helpers/local-storage";
import { getCartByUserIdAction } from "@/server-actions/cart";
import { useSession } from "next-auth/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext<TCartContext | undefined>(undefined);

export const CartProvider: React.FC<Readonly<TCartProvider>> = ({
  children,
}) => {
  const [products, setProducts] = useState<TProductInCart[]>([]);

  const session = useSession();

  //   #region -- Callbacks
  const initialProducts = useCallback(async () => {
    // CHECK IS USER LOGGED IN
    // IF YES, FETCH CART DATA
    // ELSE, FETCH CART DATA FROM LOCAL STORAGE
    const { status, data } = session || {};

    const user = data?.user;

    if (status === "authenticated" && !!user) {
      const { data, success } = await getCartByUserIdAction(user.id);

      if (success && Array.isArray(data)) {
        setProducts(data);
      }
    } else {
      const cartData = getItem<TProductInCart[]>(ELOCALSTORAGE_KEYS.CART) || [];

      setProducts(cartData);
    }
  }, [session]);

  const addProduct = useCallback(
    (product: TProductInCart) => {
      const productIndex = products.findIndex((p) => p.id === product.id);

      if (productIndex === -1) {
        setProducts((prev) => [...prev, product]);
      } else {
        setProducts((prev) =>
          prev.map((p) => {
            if (p.id === product.id) {
              return {
                ...p,
                quantity: p.quantity + product.quantity,
                total: p.total + product.total,
              };
            }

            return p;
          }),
        );
      }
    },
    [products],
  );

  const removeProduct = useCallback((productId: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const updateProduct = useCallback((productId: number, quantity: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            quantity,
            total: p.price * quantity,
          };
        }

        return p;
      }),
    );
  }, []);
  //   #endregion

  useEffect(() => {
    initialProducts();
  }, [initialProducts]);

  return (
    <CartContext.Provider
      value={{
        products,
        addProduct,
        removeProduct,
        updateProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): TCartContext => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
