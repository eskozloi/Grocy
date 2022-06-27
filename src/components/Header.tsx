import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { ReactComponent as Logo } from "@/assets/icons/logo.svg";
import MenuButton from "@/components/MenuButton";
import Cart from "@/components/Cart";
import headerStore from "@/store/header";
import menuStore from "@/store/menu";

function Header() {
  return (
    <div className="w-full">
      <div className="w-full absolute z-99 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>
        <h3 className="text-center font-medium absolute left-0 right-0">{headerStore.title}</h3>
        <div className="flex justify-center items-center gap-2em">
          <div className="hide-mob">
            <Cart />
          </div>
          {headerStore.button ? (
            <a href={headerStore.button.href}>
              <p>{headerStore.button.title}</p>
            </a>
          ) : (
            <MenuButton active={menuStore.isActive} onClick={() => menuStore.toggle()} />
          )}
        </div>
      </div>
    </div>
  );
}

export default observer(Header);
