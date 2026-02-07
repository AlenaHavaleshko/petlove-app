import css from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";
import { useLoader } from "../../../context/useLoader";
import { toast } from "react-toastify";
import sprite from "/sprite.svg";

interface LoginFormData {
  email: string;
  password: string;
}

const Schema = Yup.object().shape({
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
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    watch,
  } = useForm<LoginFormData>({
    resolver: yupResolver(Schema),
    mode: "onChange",
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const isEmailValid = !errors.email && emailValue && touchedFields.email;
  const isPasswordValid =
    !errors.password && passwordValue && touchedFields.password;

  const onSubmit = async (data: LoginFormData) => {
    try {
      showLoader();

      // Симуляція API запиту - замініть на реальний запит
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Симуляція успішного логіну
      const response = {
        token: "mock-token",
        user: {
          name: data.email.split("@")[0],
          email: data.email,
        },
      };

      login(response.user);

      toast.success("Login successful! Welcome back!");
      navigate("/profile");
    } catch (error: any) {
      toast.error(
        error?.message || "Login failed. Please check your credentials.",
      );
    } finally {
      hideLoader();
    }
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
          <div className={css.input_wrapper}>
            <input
              {...register("email")}
              className={`${css.form_input} ${
                errors.email
                  ? css.input_error
                  : isEmailValid
                    ? css.input_success
                    : ""
              }`}
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <svg className={css.validation_icon_error} width={18} height={18}>
                <use href={`${sprite}#icon-cross-small`}></use>
              </svg>
            )}
            {isEmailValid && (
              <svg
                className={css.validation_icon_success}
                width={18}
                height={18}
              >
                <use href={`${sprite}#icon-check`}></use>
              </svg>
            )}
            {errors.email && (
              <p className={css.error_message}>{errors.email.message}</p>
            )}
          </div>
          <div className={css.input_wrapper}>
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
                className={`${css.form_input} ${
                  errors.password
                    ? css.input_error
                    : isPasswordValid
                      ? css.input_success
                      : ""
                }`}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
            </div>
            {errors.password && (
              <svg className={css.validation_icon_error} width={18} height={18}>
                <use href={`${sprite}#icon-cross-small`}></use>
              </svg>
            )}
            {isPasswordValid && (
              <svg
                className={css.validation_icon_success}
                width={18}
                height={18}
              >
                <use href={`${sprite}#icon-check`}></use>
              </svg>
            )}
            {errors.password && (
              <p className={css.error_message}>{errors.password.message}</p>
            )}
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
