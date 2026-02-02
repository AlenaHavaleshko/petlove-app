import css from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";

interface LoginFormData {
  email: string;
  password: string;
}

export const Schema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Invalid email format",
    )
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Minimum 7 characters")
    .required("Password is required"),
});

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<LoginFormData>({
    resolver: yupResolver(Schema),
  });

  const onSubmit = (data: LoginFormData) => {
    // Здесь должен быть реальный API вызов
    // Для демонстрации используем email как имя
    const userName = data.email.split("@")[0];
    login({ name: userName, email: data.email });
    navigate("/home");
  };

  return (
    <div className={css.form_box}>
      <div className={css.form_info}>
        <h2 className={css.form_title}>Log in</h2>
        <p className={css.form_text}>
          Welcome! Please enter your credentials to login to the platform:
        </p>
      </div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.form_wrapper}>
          <input
            {...register("email")}
            className={css.form_input}
            type="email"
            placeholder="Email"
          />
          <div className={css.password_wrapper}>
            <button
              className={css.password_btn_eyes}
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <svg width={18} height={18} className={css.password_eye_icon}>
                  <use href="/sprite.svg#icon-eye1"></use>
                </svg>
              ) : (
                <svg
                  width={18}
                  height={18}
                  className={css.password_eye_icon_off}
                >
                  <use href="/sprite.svg#icon-eye-off"></use>
                </svg>
              )}
            </button>
            <input
              {...register("password")}
              className={css.form_input}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
          </div>
        </div>
        <div className={css.form_box_btn}>
          <button className={css.form_btn} type="submit">
            Log In
          </button>
          <p className={css.form_link}>
            Don’t have an account?{" "}
            <Link className={css.form_link_text} to="/register">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
