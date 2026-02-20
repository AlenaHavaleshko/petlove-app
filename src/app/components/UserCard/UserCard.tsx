import EditUserBtn from "../EditUserBtn/EditUserBtn";
import UserBlock from "../UserBlock/UserBlock";
import PetsBlock from "../PetsBlock/PetsBlock";
import LogOutBtn from "../LogOutBtn/LogOutBtn";
import css from "./UserCard.module.css";

export default function UserCard() {
  return (
    <div className={css.userCard}>
      <div className={css.userBarAbsolute}>
        <svg className={css.avatar_icon} width={20} height={20}>
          <use href="/sprite.svg#icon-user" />
        </svg>
        <span className={css.user_name}>User</span>
      </div>
      <EditUserBtn />
      <UserBlock />
      <PetsBlock />
      <div className={css.logoutLeft}>
        <LogOutBtn />
      </div>
    </div>
  );
}
