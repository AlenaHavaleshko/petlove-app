import css from "./AddPetForm.module.css";

export function AddPetForm() {
  return (
    <div className={css.pet_form}>
      <h2 className={css.form_title}>
        Add my pet / <span className={css.form_span}>Personal details</span>
      </h2>
      <div className={css.form_box_icons}>
        <div className={css.form_icon_first}>
          <svg width={18} height={18} className={css.password_eye_icon}>
            <use href="/sprite.svg#icon-female"></use>
          </svg>
        </div>
        <div className={css.form_icon_second}>
          <svg width={18} height={18} className={css.password_eye_icon}>
            <use href="/sprite.svg#icon-eye1"></use>
          </svg>
        </div>
        <div className={css.form_icon_third}>
          <svg width={18} height={18} className={css.password_eye_icon}>
            <use href="/sprite.svg#icon-eye1"></use>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default AddPetForm;
