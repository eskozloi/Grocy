/* eslint-disable no-cond-assign */
import { action, makeObservable, observable } from "mobx";
import ProductsJson from "@/composables/products.json";

export interface ProductInterface {
  id: string;
  name?: string;
  description?: string;
  image?: string;
  rating?: number;
  price?: number;
}

export type ProductsSortBy = (products?: ProductInterface[], asc?: boolean) => ProductInterface[];

// temporary solution for fetching products data
// TODO: create a service to make secure CRUD operations
export function fetchProducts(): ProductInterface[] {
  const products = ProductsJson.map((product, id) => {
    return {
      id: id.toString(),
      name: typeof product.name === "string" ? product.name : undefined,
      description: typeof product.description === "string" ? product.description : undefined,
      image: typeof product.image === "string" ? product.image : undefined,
      rating: typeof product.rating === "number" ? product.rating : undefined,
      price: typeof product.price === "number" ? product.price : undefined,
    };
  });

  return products;
}

export class ProductStore {
  products: ProductInterface[] = [];

  constructor() {
    makeObservable(this, {
      products: observable,
      reset: action,
      set: action,
      push: action,
      remove: action,
      removeAll: action,
    });
  }

  reset() {
    this.products = [];
  }

  set(newProducts: ProductInterface[]) {
    this.products = newProducts;
  }

  push(newProduct: ProductInterface, allowDuplicates = true) {
    if (!allowDuplicates && this.getFirstById(newProduct.id))
      throw new Error(
        `Product already exists! | Attempt to add: ${newProduct} | Found products with the same id: ${this.getById(
          newProduct.id
        )}`
      );
    this.products.push(newProduct);
  }

  remove(id: string) {
    const index = this.getFirstIndexById(id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  removeAll(id: string) {
    let index;
    while ((index = this.getFirstIndexById(id)) !== -1) {
      this.products.splice(index, 1);
    }
  }

  getTotalPrice(products?: ProductInterface[]) {
    if (!products) products = this.products;
    return parseFloat(products.reduce((acc, product) => acc + (product.price ? product.price : 0), 0).toFixed(2));
    // .toFixed(2) was added to fix the issue with javascript floating point, e.g. 0.1 + 0.2 !== 0.3
  }

  getTotalPriceById(id: string, products?: ProductInterface[]) {
    if (!products) products = this.products;
    return parseFloat(
      products
        .filter((product) => product.id === id)
        .reduce((acc, product) => acc + (product.price ? product.price : 0), 0)
        .toFixed(2)
    );
  }

  getWithoutDuplicates(products?: ProductInterface[]) {
    if (!products) products = this.products;
    return products.filter((product, index, self) => self.findIndex((t) => t.id === product.id) === index);
  }

  searchByName(name: string) {
    return this.products.filter((product) => product.name?.toLowerCase().search(name.toLowerCase()) !== -1);
  }

  sortByName: ProductsSortBy = (products?: ProductInterface[], asc = true) => {
    let i = 1;
    let q = -1;
    if (!asc) {
      i = -1;
      q = 1;
    }
    if (!products) products = [...this.products];
    products.sort((a, b) => {
      if (!a.name) return q;
      if (!b.name) return i;

      if (a.name < b.name) {
        return q;
      }
      if (a.name > b.name) {
        return i;
      }
      return 0;
    });
    return [...products];
  };

  sortByPrice: ProductsSortBy = (products?: ProductInterface[], asc = true) => {
    let i = 1;
    let q = -1;
    if (!asc) {
      i = -1;
      q = 1;
    }
    if (!products) products = [...this.products];
    products.sort((a, b) => {
      if (!a.price) return q;
      if (!b.price) return i;

      if (a.price < b.price) {
        return q;
      }
      if (a.price > b.price) {
        return i;
      }
      return 0;
    });
    return [...products];
  };

  getById(id: string) {
    return this.products.filter((product) => product.id === id);
  }

  getIndexesById(id: string) {
    return this.products.filterIndex((product) => product.id === id);
  }

  getFirstById(id: string) {
    return this.products.find((product) => product.id === id);
  }

  getFirstIndexById(id: string) {
    return this.products.findIndex((product) => product.id === id);
  }
}

const productStore = new ProductStore();
export default productStore;
