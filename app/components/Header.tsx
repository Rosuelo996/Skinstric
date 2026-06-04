"use client";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const isTransparent = pathname === "/camera/caption";

  const hideButton =
    pathname === "/result" ||
    pathname === "/summary" ||
    pathname === "/select" ||
    pathname.startsWith("/camera");

  return (
    <header className={`header ${isTransparent ? "header--transparent" : ""}`}>
      <div className="header__left">
        <div className="header__logo">SKINSTRIC</div>

        <div
          className={`header__step ${isTransparent ? "header__step--light" : ""}`}
        >
          <img
            src={
              isTransparent
                ? "/icons/left-bracket-white.svg"
                : "/icons/left-bracket.svg"
            }
            alt=""
          />
          <span>INTRO</span>
          <img
            src={
              isTransparent
                ? "/icons/right-bracket-white.svg"
                : "/icons/right-bracket.svg"
            }
            alt=""
          />
        </div>
      </div>

      {!hideButton && <button className="header__button">ENTER CODE</button>}
    </header>
  );
};

export default Header;
