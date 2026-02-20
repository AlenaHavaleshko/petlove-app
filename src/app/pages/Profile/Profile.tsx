import MyNotices from "../../components/MyNotices/MyNotices";
import UserCard from "../../components/UserCard/UserCard";
import css from "./Profile.module.css";

function Profile() {
  return (
    <div className={css.profile}>
      <div className={css.container}>
        <div>
          <UserCard />
        </div>
        <div className={css.myNotices}>
          <MyNotices />
        </div>
      </div>
    </div>
  );
}

export default Profile;
