import css from "./Logo.module.css";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useState } from "react";

interface LogoProps {
  isHome: boolean;
}

function Logo({ isHome }: LogoProps) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className={css.logo}>
      <Link
        to="/home"
        aria-label="Home"
        className={isHome ? css.logo_text_home : css.logo_text_other}
        onClick={() => setIsLoading(true)}
      >
        petl
        <svg
          className={isHome ? css.logo_icon_home : css.logo_icon_other}
          width={14}
          height={12}
        >
          <use href="/sprite.svg#icon-heart" />
        </svg>
        ve
      </Link>
      {isLoading && <Loader />}
    </div>
  );
}

export default Logo;
