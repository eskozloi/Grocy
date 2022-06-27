import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import headerStore from "@/store/header";
import productsStore, { fetchProducts } from "@/store/products";
import SortBy from "@/components/SortBy";
import SearchBar from "@/components/SearchBar";
import Product from "@/components/Product";
import type { ProductInterface, ProductsSortBy } from "@/store/products";
import type { DropDownInterface } from "@/components/DropDown";
import AscIcoUrl from "@/assets/icons/asc.svg?url";
import DescIcoUrl from "@/assets/icons/desc.svg?url";
import cartStore from "@/store/cart";

function Store() {
  const [products, setProducts] = useState<ProductInterface[]>([]);

  // "lastUsedSortingMethod" is needed to handle any new <ProductsSortBy> sorting method
  // TODO: find a better solution
  const [lastUsedSortingMethod, setLastUsedSortingMethod] = useState<{ fun: ProductsSortBy }>();
  const [sortByAsc, setSortByAsc] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    headerStore.setTitle("Store");
    productsStore.set(fetchProducts());
    setProducts([...productsStore.products]);
    return () => headerStore.reset();
  }, []);

  let inputValue: string;
  let inputTimer: NodeJS.Timeout;

  // it is made to reduce amount of search requests (can be canceld before timer ends)
  const inputTimerStart = () => {
    inputTimer = setTimeout(() => {
      setProducts(productsStore.searchByName(inputValue));
    }, 200);
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputValue = e.target.value;
    clearTimeout(inputTimer);
    inputTimerStart();
  };

  const changeSortingMethod = (fn: ProductsSortBy) => {
    setProducts(fn(products, sortByAsc));
    setLastUsedSortingMethod({ fun: fn });
  };

  const sortAsc = () => {
    if (!lastUsedSortingMethod) return;
    setProducts(lastUsedSortingMethod.fun(products, true));
    setSortByAsc(true);
  };

  const sortDesc = () => {
    if (!lastUsedSortingMethod) return;
    setProducts(lastUsedSortingMethod.fun(products, false));
    setSortByAsc(false);
  };

  const sortingOptions: DropDownInterface[] = [
    {
      options: [
        { id: "name", body: "Name", fn: () => changeSortingMethod(productsStore.sortByName) },
        { id: "price", body: "Price", fn: () => changeSortingMethod(productsStore.sortByPrice) },
      ],
      activeId: undefined,
    },
    {
      options: [
        { id: "true", body: <img className="py-0.375em h-full" src={AscIcoUrl} />, fn: () => sortAsc() },
        { id: "false", body: <img className="py-0.375em h-full" src={DescIcoUrl} />, fn: () => sortDesc() },
      ],
      activeId: sortByAsc.toString(),
    },
  ];

  // console.log(16.99 + 4.99); // === 21.979999999999997

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between mb-2em">
        <SortBy sortingOptions={sortingOptions} />
        <SearchBar onInput={onInputValueChange} />
      </div>
      <div className="flex flex-wrap justify-around overflow-scroll">
        {products.map((product) => (
          <div key={product.id}>
            <Product
              product={product}
              onDivClick={() => navigate(product.id)}
              onButtonClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                cartStore.push(product);
                e.stopPropagation();
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default observer(Store);
