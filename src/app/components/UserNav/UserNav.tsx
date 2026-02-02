import css from "./UserNav.module.css";
import UserBar from "../UserBar/UserBar";
import LogOutBtn from "../LogOutBtn/LogOutBtn";

interface UserNavProps {
  isHome: boolean;
}

function UserNav({ isHome }: UserNavProps) {
  return (
    <div className={css.user_nav}>
      <LogOutBtn isHome={isHome} />
      <UserBar />
    </div>
  );
}

export default UserNav;
