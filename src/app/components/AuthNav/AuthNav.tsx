import css from "./AuthNav.module.css";
import { Link } from "react-router-dom";

interface AuthNavProps {
  isHome: boolean;
}

function AuthNav({ isHome }: AuthNavProps) {
  return (
    <div className={css.auth_nav}>
      <button
        className={isHome ? css.auth_login_home : css.auth_login}
        type="button"
      >
        <Link to="/login">Log In</Link>
      </button>
      <button
        className={isHome ? css.auth_registration_home : css.auth_registration}
        type="button"
      >
        <Link to="/register">Registration</Link>
      </button>
    </div>
  );
}

export default AuthNav;
