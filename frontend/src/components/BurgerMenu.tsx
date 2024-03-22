import { useEffect } from "react";
import { Navigation } from "./Navigation";
import { RxHamburgerMenu } from "react-icons/rx";

type BurgerMenuProps = {
  showBurgerMenu: boolean;
  setShowBurgerMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BurgerMenu = ({
  showBurgerMenu,
  setShowBurgerMenu,
}: BurgerMenuProps) => {
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (showBurgerMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showBurgerMenu]);

  return (
    <div className="hidden max-md:block">
      <RxHamburgerMenu onClick={() => setShowBurgerMenu(true)} size={36} />
      {showBurgerMenu && (
        <div
          onClick={() => setShowBurgerMenu(false)}
          className="bg-blackCustom absolute left-0 top-0 z-50 h-screen w-screen"
        >
          <div
            onClick={(e) => {
              stopPropagation(e);
            }}
            className="h-screen w-2/5 bg-stone-50 p-4 max-[480px]:w-3/5"
          >
            <Navigation
              textColor="black"
              extraUlStyles="flex-col space-x-0 items-center space-y-[80px] text-2xl mt-6 max-[480px]:text-xl"
              setShowBurgerMenu={setShowBurgerMenu}
            />
          </div>
        </div>
      )}
    </div>
  );
};
