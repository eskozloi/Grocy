import { Link, useLocation } from "react-router-dom";
import { ReactComponent as TempUserImage } from "@/assets/icons/tempUserImage.svg";
import menuStore from "@/store/menu";
import InvisibleCover from "@/components/InvisibleCover";

interface MenuInterface {
  onEmptySpaceClick: () => void;
}

export default function Menu({ onEmptySpaceClick }: MenuInterface) {
  const location = useLocation();

  return (
    <>
      <div className="fixed z-98 h-screen top-0 right-0 bg-black-4 max-w-[calc(80%)]">
        <div className="h-full flex flex-col justify-between menuYPadding">
          <div className="flex flex-col">
            {menuStore.tabs.map((tab) => (
              <Link key={tab.href} to={tab.href} className={location.pathname === tab.href ? "bg-white" : ""}>
                <div className="flex items-center float-right my-1em screenPadding-x">
                  <h4>{tab.title}</h4>
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
      <InvisibleCover onClick={onEmptySpaceClick} />
    </>
  );
}
