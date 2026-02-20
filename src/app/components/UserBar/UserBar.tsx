import css from "./UserBar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";

function UserBar() {
  const { user } = useAuth();

  return (
    <Link to="/profile" className={css.user_bar}>
      <div className={css.user_avatar}>
        <svg className={css.avatar_icon} width={20} height={20}>
          <use href="/sprite.svg#icon-user" />
        </svg>
      </div>
      <span className={css.user_name}>{user?.name || "User"}</span>
    </Link>
  );
}

export default UserBar;
