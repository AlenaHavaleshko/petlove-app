import { useEffect, useState } from "react";
import { type Notice } from "../../../services/types/notices";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../services/api/notices";
import { toast } from "react-toastify";
import css from "./ModalNotice.module.css";

interface ModalNoticeProps {
  isOpen: boolean;
  onClose: () => void;
  notice: Notice | null;
}

export default function ModalNotice({
  isOpen,
  onClose,
  notice,
}: ModalNoticeProps) {
  const [isFavorite, setIsFavorite] = useState(notice?.isFavorite || false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (notice) {
      setIsFavorite(notice.isFavorite || false);
    }
  }, [notice]);

  useEffect(() => {
    if (!isOpen) return;

    // Block body scroll
    document.body.style.overflow = "hidden";

    // Handle Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !notice) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleToggleFavorite = async () => {
    if (!notice) return;

    setIsLoading(true);
    const previousState = isFavorite;

    // Optimistic update
    setIsFavorite(!isFavorite);

    try {
      if (previousState) {
        await removeFromFavorites(notice._id);
        toast.success("Removed from favorites");
      } else {
        await addToFavorites(notice._id);
        toast.success("Added to favorites");
      }
    } catch (error) {
      // Rollback on error
      setIsFavorite(previousState);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update favorites";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContact = () => {
    if (!notice) return;

    // Using tel: protocol for contact (phone number)
    const phone = notice.phone || "";

    if (phone) {
      window.location.href = `tel:${phone}`;
    } else {
      toast.error("Contact information not available");
    }
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg className={css.closeIcon}>
            <use href="/sprite.svg#icon-cross"></use>
          </svg>
        </button>

        <div className={css.content}>
          <div className={css.imageWrapper}>
            <img src={notice.imgURL} alt={notice.title} className={css.image} />
            <div className={css.categoryBadge}>{notice.category}</div>
          </div>

          <h2 className={css.title}>{notice.title}</h2>

          <div className={css.rating}>
            <svg className={css.star}>
              <use href="/sprite.svg#icon-star"></use>
            </svg>
            <span className={css.ratingValue}>{notice.popularity}</span>
          </div>

          <div className={css.infoFlex}>
            <div className={css.infoItem}>
              <span className={css.infoLabel}>Name</span>
              <span className={css.infoValue}>{notice.name}</span>
            </div>
            <div className={css.infoItem}>
              <span className={css.infoLabel}>Birthday</span>
              <span className={css.infoValue}>{notice.birthday}</span>
            </div>
            <div className={css.infoItem}>
              <span className={css.infoLabel}>Sex</span>
              <span className={css.infoValue}>{notice.sex}</span>
            </div>
            <div className={css.infoItem}>
              <span className={css.infoLabel}>Species</span>
              <span className={css.infoValue}>{notice.species}</span>
            </div>
          </div>

          <p className={css.comment}>{notice.comment}</p>

          <p className={css.price}>${notice.price?.toFixed(2) || "0.00"}</p>

          <div className={css.actions}>
            <button
              className={css.favoriteBtn}
              onClick={handleToggleFavorite}
              disabled={isLoading}
            >
              {isFavorite ? "Remove from" : "Add to"}
              <svg className={css.heartIcon}>
                <use href="/sprite.svg#icon-heart"></use>
              </svg>
            </button>
            <button className={css.contactBtn} onClick={handleContact}>
              Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
