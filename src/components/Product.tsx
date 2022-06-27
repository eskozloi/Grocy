import type { ProductInterface as StoreProductInterface } from "@/store/products";
import NoImage from "@/assets/icons/noImage.svg?url";

interface ProductInterface {
  product: StoreProductInterface;
  onDivClick: () => void;
  onButtonClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

// TODO: remove hardcoded svg template
export default function Product({ product, onDivClick, onButtonClick }: ProductInterface) {
  return (
    <div
      className="w-16em h-20em border-2px border-black-80 flex flex-col justify-between m-1em rounded-6px overflow-hidden cursor-pointer"
      onClick={onDivClick}
    >
      <div className="h-8.5em flex justify-center items-center">
        <svg
          className="absolute bottom-0"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 264 150.169"
        >
          <defs>
            <pattern
              id={`pattern_product_${product.id}`}
              preserveAspectRatio="xMidYMid slice"
              width="100%"
              height="100%"
              viewBox="0 0 565 565"
            >
              <image width="565" height="565" href={product.image ? product.image : NoImage} />
            </pattern>
            <filter id={`Intersection_product_${product.id}`} x="0" y="0" filterUnits="userSpaceOnUse">
              <feOffset dy="3" />
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood floodOpacity="0.161" />
              <feComposite operator="in" in2="blur" />
              <feComposite in="SourceGraphic" />
            </filter>
          </defs>
          <g transform="matrix(1, 0, 0, 1, 0, 0)" filter={`url(#Intersection_product_${product.id}`}>
            <path
              id={`Intersection_product_${product.id}-2`}
              data-name="Intersection 1"
              d="M59.274-986.253v-115.164a6,6,0,0,1,6-6h254a6,6,0,0,1,6,6v99.423c-34.1,13.31-75.063,22.508-119.476,25.614-10.889.761-21.644,1.132-32.17,1.132C128.347-975.247,96.273-979.169,68.274-986.253Z"
              transform="translate(-59.27 1113.42)"
              fill={`url(#pattern_product_${product.id})`}
            />
          </g>
        </svg>
      </div>
      <div className="flex flex-col justify-center items-center my-0.5em text-center">
        {(() => {
          if (product.name && product.name.length < 6) {
            return <h3 className="font-semibold pb-0.25em">{product.name}</h3>;
          } else if (product.name && product.name.length < 12) {
            return <h4 className="font-semibold pb-0.25em">{product.name}</h4>;
          } else {
            return <p className="font-semibold pb-0.25em">{product.name}</p>;
          }
        })()}
        <hr className="w-[calc(80%)] border-t-2px border-black-80 pb-0.25em" />
        <div className="flex justify-center items-center">
          <h4 className="rounded-6px bg-black-8 px-0.25em">{product.price ? `$${product.price}` : "-"}</h4>
          <h4> /each</h4>
        </div>
      </div>
      <div
        className="w-full flex justify-center items-center cursor-pointer py-0.75em bg-green-lime border-t-black-80 border-t-2px border-dashed z-1"
        onClick={onButtonClick}
      >
        <h4 className="font-bold">Add to cart</h4>
      </div>
    </div>
  );
}
