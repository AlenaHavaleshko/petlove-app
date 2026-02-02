import css from "./Profile.module.css";

function Profile() {
  return (
    <div className={css.profile}>
      <div className="container">
        <h1 className={css.profile_title}>Profile</h1>
        <p className={css.profile_text}>This is your profile page</p>
      </div>
    </div>
  );
}

export default Profile;
