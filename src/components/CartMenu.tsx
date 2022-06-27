import { useEffect } from "react";
import { observer } from "mobx-react";
import type { CartStore } from "@/store/cart";
import { ReactComponent as PlusIco } from "@/assets/icons/plus.svg";
import { ReactComponent as MinusIco } from "@/assets/icons/minus.svg";
import { ReactComponent as TrashcanIco } from "@/assets/icons/trashcan.svg";
import InvisibleCover from "@/components/InvisibleCover";

interface CartMenuInterface {
  cartStore: CartStore;
  onEmptySpaceClick: () => void;
  onCartStateChange: () => void;
}

function CartMenu({ cartStore, onEmptySpaceClick, onCartStateChange }: CartMenuInterface) {
  useEffect(() => {
    return () => onCartStateChange();
  });

  // TODO: remove harcoded values
  return (
    <>
      <span className="absolute rounded-8px bg-black-4 top-[calc(-20px)] bottom-[calc(-20px)] left-[calc(-36px)] right-[calc(-30px)]" />
      <div className="absolute z-98 right-[calc(-30px)] rounded-8px bg-black-4 overflow-hidden p-1em cartMenuSize">
        <div className="overflow-scroll w-full h-full">
          <table>
            <thead>
              <tr>
                <th>
                  <h4>Product</h4>
                </th>
                <th>
                  <h4>Price</h4>
                </th>
                <th>
                  <h4>Quantity</h4>
                </th>
                <th>
                  <h4>Total</h4>
                </th>
              </tr>
            </thead>
            <tbody>
              {cartStore.sortByName(cartStore.getWithoutDuplicates()).map((product) => (
                <tr key={product.id}>
                  <td>
                    <h4>{product.name ? product.name : "-"}</h4>
                  </td>
                  <td>
                    <h4>{product.price ? `$${product.price}` : "-"}</h4>
                  </td>
                  <td>
                    <div>
                      <div
                        onClick={() => cartStore.remove(product.id)}
                        className="cursor-pointer w-full h-full flex justify-center items-center"
                      >
                        <MinusIco />
                      </div>
                      <h4>{cartStore.getQuantityById(product.id)}</h4>
                      <div
                        onClick={() => cartStore.push(product)}
                        className="cursor-pointer w-full h-full flex justify-center items-center"
                      >
                        <PlusIco />
                      </div>
                    </div>
                  </td>
                  <td>
                    <h4>{product.price ? `$${cartStore.getTotalPriceById(product.id)}` : "-"}</h4>
                  </td>
                  <td>
                    <div className="cursor-pointer" onClick={() => cartStore.removeAll(product.id)}>
                      <TrashcanIco />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <InvisibleCover onClick={onEmptySpaceClick} />
    </>
  );
}

export default observer(CartMenu);
