import React, { useRef, useState } from "react";
import { useAuth } from "../../../context/useAuth";
import { updateUserProfile } from "../../../services/api/users";
import { uploadImageToCloudinary } from "../../../services/api/cloudinary";
import css from "./ModalEditUser.module.css";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";

interface ModalEditUserProps {
  onClose: () => void;
}

const schema = Yup.object().shape({
  avatar: Yup.string()
    .required("Avatar URL is required")
    .matches(
      /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/i,
      "Enter a valid image URL (png, jpg, jpeg, gif, bmp, webp)",
    ),
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Enter a valid email address",
    ),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\+38\d{10}$/, "Enter a valid phone number (+380XXXXXXXXX)"),
});

type FormData = {
  avatar: string;
  name: string;
  email: string;
  phone: string;
};

const ModalEditUser: React.FC<ModalEditUserProps> = ({ onClose }) => {
  const { user, login } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      avatar: user?.avatar || "",
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  });

  const avatarValue = useWatch({ control, name: "avatar" });

  // Cloudinary upload handler
  const handleUploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setValue("avatar", url, { shouldValidate: true });
      toast.success("Photo uploaded!");
    } catch (err) {
      let errorMsg = "Failed to upload photo";
      if (err instanceof Error) {
        errorMsg = err.message;
      } else if (err && typeof err === "object" && "message" in err) {
        errorMsg = (err as { message?: string }).message || errorMsg;
      }
      // Try to extract Cloudinary error from response if available
      if (err && typeof err === "object" && "response" in err) {
        try {
          // TypeScript: response is likely a Response object
          const response = (err as { response: Response }).response;
          const data = await response.json();
          if (data && data.error && data.error.message) {
            errorMsg = data.error.message;
          }
        } catch {
          // Optionally log or ignore
        }
      }
      toast.error(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Отправить PATCH на сервер
      const updated = await updateUserProfile(data);
      // Обновить контекст пользователя
      login({
        ...user,
        ...data,
        avatar: updated.avatar || data.avatar,
      });
      toast.success("User updated successfully");
      onClose();
    } catch (err) {
      const errorMsg =
        err && typeof err === "object" && "message" in err
          ? (err as { message?: string }).message
          : undefined;
      toast.error(errorMsg || "Failed to update user");
    }
  };

  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onClose}>
          &times;
        </button>
        <h2 className={css.title}>Edit information</h2>
        <form
          className={css.form}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div className={css.avatarBlock}>
            <img
              className={css.avatar}
              src={avatarValue || "https://ftp.goit.study/img/pets/2.webp"}
              alt="avatar"
            />
          </div>
          <div className={css.inputRow}>
            <input
              className={css.input}
              type="text"
              placeholder="https://ftp.goit.study/img/pets/2.webp"
              {...register("avatar")}
            />
            <button
              type="button"
              className={css.uploadBtn}
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload photo"}
              <svg
                width="20"
                height="20"
                aria-hidden="true"
                style={{ marginLeft: 6, verticalAlign: "middle" }}
              >
                <use href="/sprite.svg#icon-upload-cloud" />
              </svg>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleUploadPhoto}
            />
          </div>
          {errors.avatar && (
            <div className={css.error}>{errors.avatar.message}</div>
          )}

          <input
            className={css.input}
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && (
            <div className={css.error}>{errors.name.message}</div>
          )}

          <input
            className={css.input}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <div className={css.error}>{errors.email.message}</div>
          )}

          <input
            className={css.input}
            type="tel"
            placeholder="Phone"
            {...register("phone")}
          />
          {errors.phone && (
            <div className={css.error}>{errors.phone.message}</div>
          )}

          <button className={css.saveBtn} type="submit" disabled={isSubmitting}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalEditUser;
