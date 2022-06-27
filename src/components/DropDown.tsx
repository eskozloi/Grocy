import { useState } from "react";

export interface DropDownOptionInterface {
  id: string;
  body: string | JSX.Element;
  fn: () => void;
}

export interface DropDownInterface {
  options: DropDownOptionInterface[];
  activeId?: string;
}

export default function DropDown({ options, activeId }: DropDownInterface) {
  const [isActive, setIsActive] = useState(false);

  const getActiveOption = (id: string) => {
    return options.find((option) => option.id === id);
  };

  const [activeOption, setActiveOption] = useState(activeId ? getActiveOption(activeId) : undefined);

  const onOptionClick = (option: DropDownOptionInterface) => {
    option.fn();
    setActiveOption(option);
    setIsActive(false);
  };

  return (
    <>
      <div
        className="flex justify-center items-center w-full h-full cursor-pointer"
        onClick={() => setIsActive(!isActive)}
      >
        {(() => {
          if (!activeOption) return <h4>Choose...</h4>;
          if (typeof activeOption.body === "string") return <h4 className="w-full h-full">{activeOption.body}</h4>;
          return activeOption.body;
        })()}
      </div>
      <div
        className={`${
          isActive ? "" : "hidden"
        } absolute z-99 flex flex-col justify-around gap-0.375em items-center w-full h-[calc(100%*${
          options.length
        })] left-0 right-0 bg-black-8 rounded-b-8px py-0.375em`}
      >
        {options.map((option) =>
          option.id !== activeOption?.id ? (
            <h4
              className="flex justify-center items-center px-1rem cursor-pointer"
              key={option.id}
              onClick={() => onOptionClick(option)}
            >
              {option.body}
            </h4>
          ) : undefined
        )}
      </div>
    </>
  );
}
