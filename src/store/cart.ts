import { makeObservable, override } from "mobx";
import { ProductStore } from "@/store/products";

export class CartStore extends ProductStore {
  constructor() {
    super();
    makeObservable(this, {
      products: override,
    });
  }

  getQuantity() {
    return this.products.length;
  }

  getQuantityById(id: string) {
    return this.getById(id).length;
  }
}

const cartStore = new CartStore();
export default cartStore;
