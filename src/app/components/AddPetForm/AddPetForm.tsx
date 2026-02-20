import { useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { addUserPet } from "../../../services/api/users";
import { toast } from "react-toastify";
import css from "./AddPetForm.module.css";

const schema = Yup.object().shape({
  imgURL: Yup.string()
    .required("Image URL is required")
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/i,
      "Enter a valid image URL",
    ),
  title: Yup.string().required("Title is required"),
  name: Yup.string().required("Pet's name is required"),
  birthday: Yup.string()
    .required("Birthday is required")
    .matches(/^\d{2}\.\d{2}\.\d{4}$/, "Enter date in format DD.MM.YYYY"),
  species: Yup.string().required("Type of pet is required"),
  sex: Yup.string().required("Sex is required"),
});

interface AddPetFormData {
  imgURL: string;
  title: string;
  name: string;
  birthday: string;
  species: string;
  sex: string;
}

const speciesOptions = [
  { value: "Dog", label: "Dog" },
  { value: "Cat", label: "Cat" },
  { value: "Monkey", label: "Monkey" },
  { value: "Bird", label: "Bird" },
];

export default function AddPetForm() {
  const navigate = useNavigate();
  const [birthdayValue, setBirthdayValue] = useState<Date | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddPetFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      imgURL: "",
      title: "",
      name: "",
      birthday: "",
      species: "Type of pet",
      sex: "male",
    },
  });

  const onSubmit = async (data: AddPetFormData) => {
    // Преобразуем дату в формат YYYY-MM-DD для backend
    const [day, month, year] = data.birthday.split(".");
    const birthday = `${year}-${month}-${day}`;
    try {
      await addUserPet({ ...data, birthday });
      toast.success("Pet added!");
      navigate("/profile");
    } catch (err) {
      let errorMsg = "Failed to add pet";
      if (err instanceof Error) errorMsg = err.message;
      else if (err && typeof err === "object" && "message" in err)
        errorMsg = (err as { message?: string }).message || errorMsg;
      toast.error(errorMsg);
    }
  };

  return (
    <form
      className={css.add_pet_form}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <h2 className={css.form_title}>
        Add my pet / <span className={css.form_span}>Personal details</span>
      </h2>
      <div className={css.form_box_icons}>
        <label className={css.sex_radio}>
          <input
            type="radio"
            value="female"
            {...register("sex")}
            className={css.radio}
          />
          <span className={css.sex_circle}>
            <svg className={css.sex_icon}>
              <use href="sprite.svg#icon-female" />
            </svg>
          </span>
        </label>
        <label className={css.sex_radio}>
          <input
            type="radio"
            value="male"
            {...register("sex")}
            className={css.radio}
          />
          <span className={css.sex_circle}>
            <svg className={css.sex_icon}>
              <use href="sprite.svg#icon-male" />
            </svg>
          </span>
        </label>
        <label className={css.sex_radio}>
          <input
            type="radio"
            value="other"
            {...register("sex")}
            className={css.radio}
          />
          <span className={css.sex_circle}>
            <svg className={css.sex_icon}>
              <use href="sprite.svg#icon-reproductive" />
            </svg>
          </span>
        </label>
      </div>
      <div className={css.form_photo}>
        {/* Показываем фото, если введён валидный URL, иначе — SVG лапки */}
        {(() => {
          const url =
            (typeof window !== "undefined" &&
              (
                document?.querySelector(
                  'input[name="imgURL"]',
                ) as HTMLInputElement | null
              )?.value) ||
            "";
          const isValid =
            /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/i.test(url);
          return isValid ? (
            <img src={url} alt="Pet" className={css.form_img} />
          ) : (
            <svg width={96} height={96} className={css.paw_icon}>
              <use href="sprite.svg#icon-paw" />
            </svg>
          );
        })()}
      </div>
      <div className={css.inputRow}>
        <input
          className={css.input}
          type="text"
          placeholder="Enter URL"
          {...register("imgURL")}
        />
        <button type="button" className={css.uploadBtn} disabled>
          Upload photo
          <svg
            width="20"
            height="20"
            aria-hidden="true"
            style={{ marginLeft: 6, verticalAlign: "middle" }}
          >
            <use href="sprite.svg#icon-upload-cloud" />
          </svg>
        </button>
      </div>
      {errors.imgURL && (
        <div className={css.error}>{errors.imgURL.message}</div>
      )}

      <input
        className={css.input}
        type="text"
        placeholder="Title"
        {...register("title")}
      />
      {errors.title && <div className={css.error}>{errors.title.message}</div>}

      <input
        className={css.input}
        type="text"
        placeholder="Pet's Name"
        {...register("name")}
      />
      {errors.name && <div className={css.error}>{errors.name.message}</div>}

      <div className={css.inputRow}>
        <div className={css.inputWithIcon}>
          <DatePicker
            className={css.input}
            selected={birthdayValue}
            onChange={setBirthdayValue}
            placeholderText="00.00.0000"
            dateFormat="dd.MM.yyyy"
            showPopperArrow={false}
            popperClassName="custom-datepicker-dropdown"
          />
          <span className={css.calendarIcon}>
            <svg width="20" height="20" aria-hidden="true">
              <use href="sprite.svg#icon-calendar" />
            </svg>
          </span>
        </div>
        <div className={css.selectWrapper}>
          <Select
            classNamePrefix="custom-select"
            options={speciesOptions}
            placeholder="Type of pet"
            styles={{
              control: (base) => ({
                ...base,
                minHeight: 52,
                maxHeight: 52,
                borderRadius: 30,
                fontSize: 18,
                background: "#fff",
                color: "#262626",
                border: "1px solid #e0e0e0",
                boxShadow: "none",
                paddingRight: 0,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexWrap: "wrap",
                position: "relative",
                cursor: "pointer",
              }),
              menu: (base) => ({
                ...base,
                borderRadius: 30,
                boxShadow: "0 4px 16px rgba(84,173,255,0.15)",
                fontSize: 18,
                color: "#262626",
                background: "#fff",
                border: "1px solid #e0e0e0",
              }),
              option: (base) => ({
                ...base,
                borderRadius: 30,
                fontSize: 18,
                color: "#262626",
                background: "#fff",
                padding: "12px 16px",
              }),
              placeholder: (base) => ({
                ...base,
                color: "rgba(38,38,38,0.5)",
                fontSize: 18,
                height: 30,
              }),
              singleValue: (base) => ({
                ...base,
                color: "#262626",
                fontSize: 18,
              }),
            }}
            components={{ IndicatorSeparator: () => null }}
          />
        </div>
      </div>
      {errors.birthday && (
        <div className={css.error}>{errors.birthday.message}</div>
      )}
      {errors.species && (
        <div className={css.error}>{errors.species.message}</div>
      )}

      <div className={css.buttonRow}>
        <button
          type="button"
          className={css.backBtn}
          onClick={() => navigate("/profile")}
        >
          Back
        </button>
        <button type="submit" className={css.saveBtn} disabled={isSubmitting}>
          Submit
        </button>
      </div>
    </form>
  );
}
