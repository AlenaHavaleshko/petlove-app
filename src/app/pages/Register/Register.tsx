import css from "./Register.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import Title from "../../components/Title/Title";
import PetBlock from "../../components/PetBlock/PetBlock";

function Register() {
  return (
    <div className={css.register}>
      <div className="container">
        <div className={css.register_box}>
          <div className={css.register_image}>
            <div className={css.register_title}>
              <Title
                name="Jack"
                birthday="18.10.2021"
                text="Jack is a gray Persian cat with green eyes. He loves to be pampered
            and groomed, and enjoys playing with toys."
                src="/title/cat.jpg"
              />
            </div>
            <PetBlock
              desktopSet="/register/cat.desktop.jpg"
              laptopSet="/register/cat.tablet.jpg"
              mobileSrc="/register/cat.mobile.jpg"
            />
          </div>
          <div className={css.register_form}>
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
