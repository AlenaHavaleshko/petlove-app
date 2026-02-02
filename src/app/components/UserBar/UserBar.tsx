import css from "./UserBar.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";

function UserBar() {
  const { user } = useAuth();

  return (
    <Link to="/profile" className={css.user_bar}>
      <div className={css.user_avatar}>
        {user?.avatar ? (
          <img src={user.avatar} alt={user.name} className={css.avatar_img} />
        ) : (
          <svg className={css.avatar_icon} width={20} height={20}>
            <use href="/sprite.svg#icon-user" />
          </svg>
        )}
      </div>
      {user && <span className={css.user_name}>{user.name}</span>}
    </Link>
  );
}

export default UserBar;
