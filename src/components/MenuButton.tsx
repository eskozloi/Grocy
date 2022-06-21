import { ReactComponent as MenuButtonIco } from "@/assets/icons/menuButton.svg";

interface MenuButtonInterface {
  active?: boolean;
  onClick?: () => void;
}

export default function MenuButton({ active, onClick }: MenuButtonInterface) {
  return <MenuButtonIco className={`${active ? "is-open" : "is-close"} main-header-menu-toggle`} onClick={onClick} />;
}
