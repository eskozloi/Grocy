import { Link, useLocation } from "react-router-dom";
import HouseIcoUrl from "@/assets/icons/house.svg?url";
import GrocBagIcoUrl from "@/assets/icons/grocBag.svg?url";
import { ReactComponent as TempUserImage } from "@/assets/icons/tempUserImage.svg";

interface MenuInterface {
  onExitClick: () => void;
}

/* interface TabInterface {
  title: string;
  href: string;
  ico: string;
} */

export default function Header({ onExitClick }: MenuInterface) {
  const tabs = [
    { text: "Home", href: "/", ico: HouseIcoUrl },
    { text: "Store", href: "/store", ico: GrocBagIcoUrl },
  ];

  const location = useLocation();

  return (
    <>
      <div className="fixed z-98 h-screen top-0 right-0 bg-black-6 max-w-[calc(80%)]">
        <div className="h-full flex flex-col justify-between menuYPadding">
          <div className="flex flex-col">
            {tabs.map((tab) => (
              <Link key={tab.href} to={tab.href} className={location.pathname === tab.href ? "bg-white" : ""}>
                <div className="flex items-center float-right my-1em screenPadding-x">
                  <h4>{tab.text}</h4>
                  <img src={tab.ico} className="ml-2em" />
                </div>
              </Link>
            ))}
          </div>
          <Link to="/">
            <div className="flex items-center float-right screenPadding-x">
              <h4>Your Name</h4>
              <TempUserImage className="ml-2em" />
            </div>
          </Link>
        </div>
      </div>
      <span className="fixed z-1 h-screen w-screen top-0 left-0" onClick={onExitClick} />
    </>
  );
}
