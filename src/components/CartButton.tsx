import { useEffect } from "react";
import { observer } from "mobx-react";
import { ReactComponent as CartL } from "@/assets/icons/cartl.svg";
import { ReactComponent as CartR } from "@/assets/icons/cartr.svg";
import type { CartStore } from "@/store/cart";

interface CartButtonInterface {
  cartStore: CartStore;
  onClick: () => void;
  onCartStateChange: () => void;
}

function CartButton({ cartStore, onClick, onCartStateChange }: CartButtonInterface) {
  useEffect(() => {
    return () => onCartStateChange();
  });

  const totalProductsPrice = cartStore.getTotalPrice();
  const numberOfProducts = cartStore.getQuantity();

  // TODO: remove harcoded values
  return (
    <div className="z-99 flex items-end cursor-pointer" onClick={onClick}>
      <CartL className="absolute left-[calc(-26px)]" />
      {totalProductsPrice ? (
        <div className="h-34px bg-black-80 mb-10.8px flex justify-center items-center z-1 px-0.5em">
          <div className="h-22px bg-white px-0.375em rounded-3px flex justify-center items-center cart-inner-shadow">
            <p className="font-medium text-black-60">{`$${totalProductsPrice}`}</p>
          </div>
        </div>
      ) : (
        <div className="h-34px w-50px bg-black-80 mb-10.8px z-1" />
      )}
      <CartR className="absolute right-[calc(-10px)]" />
      <div className="absolute w-26px h-26px top-[calc(-10px)] right-[calc(-22px)] z-2 bg-yellow-light rounded-full cart-notification-shadow flex justify-center items-center">
        {(() => {
          if (numberOfProducts === 0) {
            return <p>+</p>;
          } else if (numberOfProducts <= 99) {
            return <small>{numberOfProducts}</small>;
          } else {
            return <small>99+</small>;
          }
        })()}
      </div>
    </div>
  );
}

export default observer(CartButton);
