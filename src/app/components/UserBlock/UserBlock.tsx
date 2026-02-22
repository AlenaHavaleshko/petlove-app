import css from "./UserBlock.module.css";
import { useAuth } from "../../../context/useAuth";
import { useRef, useState } from "react";
import { uploadImageToCloudinary } from "../../../services/api/cloudinary";
import { updateUserProfile } from "../../../services/api/users";

export default function UserBlock() {
  const { user, login } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        const url = await uploadImageToCloudinary(file);
        const updated = await updateUserProfile({ avatar: url });
        login({ ...user, avatar: updated.avatar });
      } catch {
        alert("Avatar upload failed");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={css.userBlock}>
      <div className={css.avatarWrapper}>
        <div className={css.avatarBlock}>
          {user.avatar ? (
            <img className={css.avatar} src={user.avatar} alt={user.name} />
          ) : (
            <svg className={css.avatarPlaceholder}>
              <use href="/sprite.svg#icon-user" />
            </svg>
          )}
        </div>
        {!user.avatar && (
          <span
            className={css.uploadText}
            onClick={() => fileInputRef.current?.click()}
          >
            {loading ? "Uploading..." : "Upload photo"}
          </span>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleAvatarChange}
        />
      </div>
      <div className={css.infoBlock}>
        <div className={css.header}>My information</div>
        <div className={css.inputsGrid}>
          <div className={`${css.name} ${user.name ? css.filled : ""}`}>
            {user.name}
          </div>
          <div className={`${css.email} ${user.email ? css.filled : ""}`}>
            {user.email}
          </div>
          <div className={`${css.phone} ${user.phone ? css.filled : ""}`}>
            {user.phone || "+380"}
          </div>
        </div>
      </div>
    </div>
  );
}
