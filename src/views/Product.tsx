import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react";
import headerStore from "@/store/header";
import type { ProductInterface } from "@/store/products";
import { ReactComponent as NoImage } from "@/assets/icons/noImage.svg";
import productsStore, { fetchProducts } from "@/store/products";
import cartStore from "@/store/cart";

function Product() {
  const params = useParams();

  const [product, setProduct] = useState<ProductInterface>();

  useEffect(() => {
    if (params.id === undefined) return;
    productsStore.set(fetchProducts());
    setProduct(productsStore.getFirstById(params.id));
    return () => headerStore.reset();
  }, []);

  useEffect(() => {
    headerStore.setTitle(product ? product.name : "-");
  }, [product]);

  return (
    <div className="w-full h-full flex justify-around items-center flex-wrap overflow-scroll">
      <div className="rounded-8px h-full w-[calc(48%)] w-mob-100pr overflow-hidden">
        {product?.image ? (
          <div
            className="w-full h-full bg-center bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${product.image})` }}
          ></div>
        ) : (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <NoImage />
            <h2 className="text-center font-semibold">No image</h2>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-between m-0 p-0 h-full w-[calc(48%)] w-mob-100pr">
        <div className="min-h-[calc(60%)] flex justify-center items-center">
          {product?.description ? (
            <h3 className="text-center font-medium">{product.description}</h3>
          ) : (
            <h3 className="text-center font-medium">-</h3>
          )}
        </div>
        <div className="flex justify-around flex-wrap gap-1em mx-0.5em">
          <div className="flex justify-center items-center gap-0.5em flex-grow">
            <div className="rounded-4px bg-black-8 px-0.5em">
              {product?.price ? (
                <h3 className="text-center">{`$${product.price}`}</h3>
              ) : (
                <h3 className="text-center">-</h3>
              )}
            </div>
            <h3>/each</h3>
          </div>
          <div className="flex justify-center items-center gap-0.5em flex-grow">
            <div className="rounded-4px bg-black-8 px-0.5em">
              {product?.rating ? <h3 className="text-center">{product.rating}</h3> : <h3 className="text-center">-</h3>}
            </div>
            <h3>stars</h3>
          </div>
          <button
            className="bg-green-lime font-bold rounded-6px flex-grow"
            onClick={() => {
              if (product) cartStore.push(product);
            }}
          >
            <h3>Add to cart</h3>
          </button>
        </div>
      </div>
    </div>
  );
}

export default observer(Product);
