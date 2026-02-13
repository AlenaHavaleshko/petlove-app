import { useState } from "react";
import { type Notice } from "../../../services/types/notices";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../services/api/notices";
import css from "./NoticesItem.module.css";

interface NoticesItemProps {
  notice: Notice;
  onAuthAction: () => boolean;
  onLearnMore: (notice: Notice) => void;
  onFavoriteToggle?: () => void;
}

export default function NoticesItem({
  notice,
  onAuthAction,
  onLearnMore,
  onFavoriteToggle,
}: NoticesItemProps) {
  const [isFavorite, setIsFavorite] = useState(notice.isFavorite || false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLearnMore = () => {
    onLearnMore(notice);
  };

  const handleFavorite = async () => {
    console.log("Favorite button clicked", {
      noticeId: notice._id,
      currentState: isFavorite,
    });

    if (!onAuthAction()) {
      console.log("User not authenticated - showing modal");
      return;
    }

    console.log("User authenticated - processing favorite toggle");

    // Оптимістичне оновлення UI - відразу змінюємо стан
    const previousState = isFavorite;
    setIsFavorite(!isFavorite);
    setIsLoading(true);

    try {
      if (previousState) {
        console.log("Removing from favorites...");
        await removeFromFavorites(notice._id);
        console.log("Successfully removed from favorites");
      } else {
        console.log("Adding to favorites...");
        await addToFavorites(notice._id);
        console.log("Successfully added to favorites");
      }
      onFavoriteToggle?.();
    } catch (error) {
      console.error("Error toggling favorite:", error);
      // Якщо помилка - повертаємо попередній стан
      setIsFavorite(previousState);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li key={notice._id} className={css.noticeItem}>
      <div className={css.imageWrapper}>
        <img
          src={notice.imgURL}
          alt={notice.title}
          className={css.noticeImage}
        />
      </div>
      <div className={css.noticeContent}>
        <div className={css.header}>
          <h3 className={css.noticeTitle}>{notice.title}</h3>
          <div className={css.rating}>
            <svg className={css.star}>
              <use href="/sprite.svg#icon-star"></use>
            </svg>
            <span className={css.ratingValue}>{notice.popularity}</span>
          </div>
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
          <div className={css.infoItem}>
            <span className={css.infoLabel}>Category</span>
            <span className={css.infoValue}>{notice.category}</span>
          </div>
        </div>

        <p className={css.description}>{notice.comment}</p>

        <div className={css.footer}>
          <p className={css.price}>${notice.price?.toFixed(2) || "0.00"}</p>
          <div className={css.actions}>
            <button className={css.learnMoreBtn} onClick={handleLearnMore}>
              Learn more
            </button>
            <button
              className={css.favoriteBtn}
              onClick={handleFavorite}
              disabled={isLoading}
            >
              <svg
                className={`${css.heart} ${isFavorite ? css.heartActive : ""}`}
              >
                <use href="/sprite.svg#icon-heart"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
