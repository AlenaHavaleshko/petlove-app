import css from "./RegistrationForm.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";
import { useLoader } from "../../../context/useLoader";
import { toast } from "react-toastify";
import sprite from "/sprite.svg";

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Schema = Yup.object().shape({
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login } = useAuth();
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    watch,
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(Schema),
    mode: "onChange",
  });

  const nameValue = watch("name");
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const isNameValid = !errors.name && nameValue && touchedFields.name;
  const isEmailValid = !errors.email && emailValue && touchedFields.email;
  const isPasswordValid =
    !errors.password && passwordValue && touchedFields.password;
  const isConfirmPasswordValid =
    !errors.confirmPassword &&
    confirmPasswordValue &&
    touchedFields.confirmPassword;

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      showLoader();

      // Симуляція API запиту - замініть на реальний запит
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Симуляція успішної реєстрації
      const response = {
        token: "mock-token",
        user: {
          name: data.name,
          email: data.email,
        },
      };

      // Автоматична авторізація
      login(response.user);

      toast.success("Registration successful! Welcome!");
      navigate("/profile");
    } catch (error: any) {
      toast.error(error?.message || "Registration failed. Please try again.");
    } finally {
      hideLoader();
    }
  };

  return (
    <div className={css.form_box}>
      <div className={css.form_info}>
        <h2 className={css.form_title}>Registration</h2>
        <p className={css.form_text}>
          Thank you for your interest in our platform.
        </p>
      </div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.form_wrapper}>
          <div className={css.input_wrapper}>
            <div className={css.input_container}>
              <input
                {...register("name")}
                className={`${css.form_input} ${
                  errors.name
                    ? css.input_error
                    : isNameValid
                      ? css.input_success
                      : ""
                }`}
                type="text"
                placeholder="Name"
              />
              {errors.name && (
                <svg
                  className={css.validation_icon_error}
                  width={18}
                  height={18}
                >
                  <use href={`${sprite}#icon-cross-small`}></use>
                </svg>
              )}
              {isNameValid && (
                <svg
                  className={css.validation_icon_success}
                  width={18}
                  height={18}
                >
                  <use href={`${sprite}#icon-check`}></use>
                </svg>
              )}
            </div>
            {errors.name && (
              <p className={css.error_message}>{errors.name.message}</p>
            )}
          </div>
          <div className={css.input_wrapper}>
            <div className={css.input_container}>
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
                <svg
                  className={css.validation_icon_error}
                  width={18}
                  height={18}
                >
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
            </div>
            {errors.email && (
              <p className={css.error_message}>{errors.email.message}</p>
            )}
          </div>
          <div className={css.input_wrapper}>
            <div className={css.input_container}>
              <div className={css.password_wrapper}>
                <button
                  className={css.password_btn_eyes}
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <svg
                      width={18}
                      height={18}
                      className={css.password_eye_icon}
                    >
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
                <svg
                  className={css.validation_icon_error}
                  width={18}
                  height={18}
                >
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
            </div>
            {errors.password && (
              <p className={css.error_message}>{errors.password.message}</p>
            )}
          </div>
          <div className={css.input_wrapper}>
            <div className={css.input_container}>
              <div className={css.password_wrapper}>
                <button
                  className={css.password_btn_eyes}
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <svg
                      width={18}
                      height={18}
                      className={css.password_eye_icon}
                    >
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
                  {...register("confirmPassword")}
                  className={`${css.form_input} ${
                    errors.confirmPassword
                      ? css.input_error
                      : isConfirmPasswordValid
                        ? css.input_success
                        : ""
                  }`}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                />
              </div>
              {errors.confirmPassword && (
                <svg
                  className={css.validation_icon_error}
                  width={18}
                  height={18}
                >
                  <use href={`${sprite}#icon-cross-small`}></use>
                </svg>
              )}
              {isConfirmPasswordValid && (
                <svg
                  className={css.validation_icon_success}
                  width={18}
                  height={18}
                >
                  <use href={`${sprite}#icon-check`}></use>
                </svg>
              )}
            </div>
            {errors.confirmPassword && (
              <p className={css.error_message}>
                {errors.confirmPassword.message}
              </p>
            )}
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
