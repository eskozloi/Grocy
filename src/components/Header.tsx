import { useState } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import type { ButtonInterface } from "@/composables/interfaces";
import { ReactComponent as Logo } from "@/assets/icons/logotest.svg";
import MenuButton from "@/components/MenuButton";
import headerStore from "@/store/header";

interface HeaderInterface {
  menuIsActive?: boolean;
  onMenuButtonClick?: () => void;
}

function Header({ menuIsActive, onMenuButtonClick }: HeaderInterface) {
  return (
    <div className="w-full">
      <div className="w-full absolute z-99 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>
        {headerStore.title ? <h3 className="font-medium">{headerStore.title}</h3> : null}
        {headerStore.button ? (
          <a href={headerStore.button.href}>
            <p>{headerStore.button.title}</p>
          </a>
        ) : (
          <MenuButton active={menuIsActive} onClick={onMenuButtonClick} />
        )}
      </div>
    </div>
  );
}

export default observer(Header);
