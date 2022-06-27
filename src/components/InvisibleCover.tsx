interface MenuInterface {
  onClick: () => void;
}

function InvisibleCover({ onClick }: MenuInterface) {
  return <span className="fixed z-97 h-screen w-screen top-0 left-0" onClick={onClick} />;
}

export default InvisibleCover;
