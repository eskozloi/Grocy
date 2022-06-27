import type { DropDownInterface } from "@/components/DropDown";
import DropDown from "@/components/DropDown";

interface SortByInterface {
  sortingOptions: DropDownInterface[];
}

export default function SortBy({ sortingOptions }: SortByInterface) {
  return (
    <div className="flex justify-center items-center">
      <h4 className="pr-0.5em whitespace-nowrap hide-mob">Sort by:</h4>
      <div className="flex py-0.375em bg-black-8 rounded-8px justify-center items-center w-full h-full">
        {sortingOptions.map((o, id) => {
          return (
            <div
              key={id}
              className={`${id === sortingOptions.length - 1 ? "" : "border-r border-r-black-60"} px-1em w-full h-full`}
            >
              <DropDown options={o.options} activeId={o.activeId} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
