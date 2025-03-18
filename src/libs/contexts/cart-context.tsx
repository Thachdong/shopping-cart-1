"use client";

import { ELOCALSTORAGE_KEYS } from "@/constants";
import { getItem, setItem } from "@/helpers/local-storage";
import {
  addProductToCartAction,
  getCartAction,
  removeProductFromCartAction,
  updateProductQuantityAction,
} from "@/server-actions/cart";
import { useSession } from "next-auth/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const CartContext = createContext<TCartContext | undefined>(undefined);

export const CartProvider: React.FC<Readonly<TCartProvider>> = ({
  children,
}) => {
  const [products, setProducts] = useState<TProductInCart[]>([]);

  const session = useSession();

  const isAuthenticated = useMemo(
    () => session?.status === "authenticated",
    [session],
  );

  //   #region -- Callbacks
  const initialProducts = useCallback(async () => {
    // CHECK IS USER LOGGED IN
    // IF YES, FETCH CART DATA
    // ELSE, FETCH CART DATA FROM LOCAL STORAGE
    if (isAuthenticated) {
      const { data, success } = await getCartAction();

      if (success && Array.isArray(data)) {
        setProducts(data);
      }
    } else {
      const cartData = getItem<TProductInCart[]>(ELOCALSTORAGE_KEYS.CART) || [];

      setProducts(cartData);
    }
  }, [isAuthenticated]);

  const handleServerAction = useCallback(
    async (cb: () => Promise<void>) => {
      if (isAuthenticated) {
        await cb();
      }
    },
    [isAuthenticated],
  );

  const addProduct = useCallback(
    async (product: TProductInCart) => {
      const productIndex = products.findIndex((p) => p.id === product.id);

      if (productIndex === -1) {
        setProducts((prev) => [...prev, product]);

        await handleServerAction(async () => {
          await addProductToCartAction(product.id, product.quantity);
        });
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

        await handleServerAction(async () => {
          await updateProductQuantityAction(product.id, product.quantity);
        });
      }
    },
    [products, handleServerAction],
  );

  const removeProduct = useCallback(
    async (productId: number) => {
      setProducts((prev) => prev.filter((p) => p.id !== productId));

      await handleServerAction(async () => {
        await removeProductFromCartAction(productId);
      });
    },
    [handleServerAction],
  );

  const updateProduct = useCallback(
    async (productId: number, quantity: number) => {
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

      await handleServerAction(async () => {
        await updateProductQuantityAction(productId, quantity);
      });
    },
    [handleServerAction],
  );
  //   #endregion

  useEffect(() => {
    initialProducts();
  }, [initialProducts]);

  useEffect(() => {
    if (products) {
      setItem<TProductInCart[]>(ELOCALSTORAGE_KEYS.CART, products);
    }
  }, [products]);

  return (
    <CartContext.Provider
      value={{
        count: products.length,
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
