import { useState } from "react";
import type { Notice } from "../../../services/types/notices";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../services/api/notices";
import { useFavorites } from "../../../context/useFavorites";
import css from "./NoticesItem.module.css";

interface NoticesItemProps {
  notice: Notice;
  onAuthAction: () => boolean;
  onLearnMore: (notice: Notice) => void;
  hideFavorite?: boolean;
  showRemoveBtn?: boolean;
}

export default function NoticesItem({
  notice,
  onAuthAction,
  onLearnMore,
  hideFavorite = false,
  showRemoveBtn = false,
}: NoticesItemProps) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [isLoading, setIsLoading] = useState(false);

  const isFavorite = favorites.some((f) => f._id === notice._id);

  const handleLearnMore = () => {
    onLearnMore(notice);
  };

  const handleFavorite = async () => {
    if (!onAuthAction()) return;

    setIsLoading(true);

    // оптимистическое обновление UI
    try {
      if (isFavorite) {
        removeFavorite(notice._id);
        await removeFromFavorites(notice._id);
      } else {
        addFavorite(notice);
        await addToFavorites(notice._id);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      // откат изменений в случае ошибки
      if (isFavorite) {
        addFavorite(notice);
      } else {
        removeFavorite(notice._id);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <li className={css.noticeItem}>
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
            {showRemoveBtn ? (
              <button
                className={css.favoriteBtn}
                onClick={handleFavorite}
                disabled={isLoading}
                title="Remove from favorites"
              >
                <svg className={css.trashIcon}>
                  <use href="/sprite.svg#icon-trash"></use>
                </svg>
              </button>
            ) : !hideFavorite && (
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
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
