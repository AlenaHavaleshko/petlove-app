import css from "./Mobile.menu.module.css";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  isOpenMobileMenu: boolean;
  onClose: () => void;
  isHome: boolean;
}

function MobileMenu({ isOpenMobileMenu, onClose, isHome }: MobileMenuProps) {
  if (!isOpenMobileMenu) return null;
  return (
    <div className={isHome ? css.mobile_menu : css.mobile_menu_orange}>
      <div className={css.mobile_mop}>
        <button
          className={css.mobile_btn_close}
          type="button"
          onClick={onClose}
        >
          <svg
            width={16}
            height={16}
            className={
              isHome ? css.mobile_close_icon : css.mobile_close_icon_orange
            }
          >
            <use href="/sprite.svg#icon-cross"></use>
          </svg>
        </button>
        <nav className={css.mobile_nav}>
          <ul className={css.mobile_list}>
            <li className={isHome ? css.mobile_item : css.mobile_item_orange}>
              <Link
                className={isHome ? css.mobile_link : css.mobile_link_orange}
                to="/news"
                onClick={onClose}
              >
                News
              </Link>
            </li>
            <li className={isHome ? css.mobile_item : css.mobile_item_orange}>
              <Link
                className={isHome ? css.mobile_link : css.mobile_link_orange}
                to="/notices"
                onClick={onClose}
              >
                Find pet
              </Link>
            </li>
            <li className={isHome ? css.mobile_item : css.mobile_item_orange}>
              <Link
                className={isHome ? css.mobile_link : css.mobile_link_orange}
                to="/friends"
                onClick={onClose}
              >
                Our friends
              </Link>
            </li>
          </ul>
        </nav>
        <div className={css.mobile_btns}>
          <button
            className={isHome ? css.mobile_login : css.mobile_login_orange}
            type="button"
          >
            <Link to="/login" onClick={onClose}>
              Log In
            </Link>
          </button>
          <button className={css.mobile_registration} type="button">
            <Link to="/register" onClick={onClose}>
              Registration
            </Link>
          </button>
          <button
            className={isHome ? css.mobile_logout : css.mobile_logout_orange}
            type="button"
            onClick={onClose}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
export default MobileMenu;
