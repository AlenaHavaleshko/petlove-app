import css from "./NotFound.module.css";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className={css.not_found_container}>
      <div className="container">
        <div className={css.not_found}>
          <div className={css.not_found_box}>
            <div className={css.not_found_not}>
              <p className={css.not_found_number}>4</p>
              <div className={css.img_box}>
                <picture>
                  <source
                    srcSet="/404/404.desktop2.jpg"
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet="/404/404.tablet2.jpg"
                    media="(min-width: 768px)"
                  />
                  <img
                    className={css.not_found_img}
                    src="/404/404.mobile2.jpg"
                    alt="Cat"
                  />
                </picture>
              </div>
              <p className={css.not_found_number}>4</p>
            </div>
            <p className={css.not_found_text}>Ooops! This page not found :(</p>
            <button className={css.not_found_btn} type="button">
              <Link to="/home">To home page</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
