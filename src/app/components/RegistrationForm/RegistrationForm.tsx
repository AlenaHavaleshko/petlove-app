import css from "./RegistrationForm.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
}

export const Schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
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

export function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { register } = useForm<RegistrationFormData>({
    resolver: yupResolver(Schema),
  });
  return (
    <div className={css.form_box}>
      <div className={css.form_info}>
        <h2 className={css.form_title}>Registration</h2>
        <p className={css.form_text}>
          Thank you for your interest in our platform.
        </p>
      </div>
      <form className={css.form}>
        <div className={css.form_wrapper}>
          <input
            {...register("name")}
            className={css.form_input}
            type="text"
            placeholder="Name"
          />
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
              type="text"
              placeholder="Password"
            />
          </div>
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
              type="text"
              placeholder="Confirm password"
            />
          </div>
        </div>
        <div className={css.form_box_btn}>
          <button className={css.form_btn} type="submit">
            Registration
          </button>
          <p className={css.form_link}>
            Already have an account?{" "}
            <Link className={css.form_link_text} to="/login">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
