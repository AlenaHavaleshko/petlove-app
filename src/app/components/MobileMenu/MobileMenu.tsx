import css from "./Mobile.menu.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";
import { useState } from "react";
import ModalApproveAction from "../ModalApproveAction/ModalApproveAction";

interface MobileMenuProps {
  isOpenMobileMenu: boolean;
  onClose: () => void;
  isHome: boolean;
}

function MobileMenu({ isOpenMobileMenu, onClose, isHome }: MobileMenuProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!isOpenMobileMenu) return null;

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setIsModalOpen(false);
    onClose();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
          {isAuthenticated ? (
            <>
              <button
                className={
                  isHome ? css.mobile_logout : css.mobile_logout_orange
                }
                type="button"
                onClick={handleLogoutClick}
              >
                Log out
              </button>
              {user && (
                <Link
                  to="/profile"
                  className={css.mobile_user}
                  onClick={onClose}
                >
                  <div className={css.mobile_user_avatar}>
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className={css.mobile_avatar_img}
                      />
                    ) : (
                      <svg
                        className={css.mobile_user_icon}
                        width={20}
                        height={20}
                      >
                        <use href="/sprite.svg#icon-user" />
                      </svg>
                    )}
                  </div>
                  <span className={css.mobile_user_name}>{user.name}</span>
                </Link>
              )}
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
        <ModalApproveAction
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmLogout}
        />
      </div>
    </div>
  );
}
export default MobileMenu;
