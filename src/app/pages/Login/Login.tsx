import css from "./Login.module.css";
import LoginForm from "../../components/LoginForm/LoginForm";
import Title from "../../components/Title/Title";
import PetBlock from "../../components/PetBlock/PetBlock";

function Login() {
  return (
    <div className={css.login}>
      <div className="container">
        <div className={css.login_box}>
          <div className={css.login_image}>
            <div className={css.login_title}>
              <Title
                name="Rich"
                birthday="21.09.2020"
                text="Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!"
                src="/title/dog.jpg"
              />
            </div>
            <PetBlock
              desktopSet="/login/dog.desktop.jpg"
              laptopSet="/login/dog.tablet.jpg"
              mobileSrc="/login/dog.mobile.jpg"
            />
          </div>
          <div className={css.login_form}>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
