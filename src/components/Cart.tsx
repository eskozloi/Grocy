import { useEffect, useState } from "react";
import CartButton from "@/components/CartButton";
import CartMenu from "@/components/CartMenu";
import cartStore from "@/store/cart";

// TODO: make lazy load for a cart menu
function Cart() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const cartState = sessionStorage.getItem("cart");
    if (cartState) cartStore.set(JSON.parse(cartState));
    return () => sessionStorage.setItem("cart", JSON.stringify(cartStore.products));
  }, []);

  const saveChanges = () => {
    sessionStorage.setItem("cart", JSON.stringify(cartStore.products));
  };

  const toggle = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <CartButton cartStore={cartStore} onClick={toggle} onCartStateChange={saveChanges} />
      {isActive ? <CartMenu cartStore={cartStore} onEmptySpaceClick={toggle} onCartStateChange={saveChanges} /> : null}
    </>
  );
}

export default Cart;
