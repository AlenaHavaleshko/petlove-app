import css from "./Main.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className={css.layout_wrapper}>
      <div className={css.layout_logo}>
        <Link
          to="/home"
          aria-label="Home"
          className={css.layout_logo_text}
          onClick={() => setIsLoading(true)}
        >
          petl
          <svg className={css.layout_logo_icon} width={36} height={31}>
            <use href="/sprite.svg#icon-heart" />
          </svg>
          ve
        </Link>
        {isLoading && <Loader />}
      </div>
    </div>
  );
}

export default Main;
