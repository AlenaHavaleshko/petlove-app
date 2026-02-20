import { useState } from "react";
import css from "./MyNotices.module.css";
import NoticesItem from "../NoticesItem/NoticesItem";
import type { Notice } from "../../../services/types/notices";
import { useFavorites } from "../../../context/FavoritesHooks";

// TODO: Реализовать получение viewed из backend или localStorage
const mockViewed: Notice[] = [
  {
    _id: "2",
    title: "Viewed Pet 2",
    name: "Bella",
    birthday: "2021-05-15",
    sex: "female",
    imgURL: "https://ftp.goit.study/img/pets/2.webp",
    popularity: 1,
    isFavorite: false,
    species: "dog",
    category: "sell",
    comment: "",
    location: "",
    user: "",
    createdAt: "2023-12-11T10:43:28.477Z",
  },
];

export default function MyNotices() {
  const [activeTab, setActiveTab] = useState<"favorites" | "viewed">(
    "favorites",
  );
  const { favorites, removeFavorite } = useFavorites();
  const [viewed] = useState(mockViewed); // TODO: заменить на реальные viewed

  const handleRemoveFavorite = (id: string) => {
    removeFavorite(id);
  };

  const notices: Notice[] = activeTab === "favorites" ? favorites : viewed;

  return (
    <div className={css.myNotices}>
      <div className={css.tabs}>
        <button
          className={`${css.tab} ${activeTab === "favorites" ? css.tabActive : ""}`}
          onClick={() => setActiveTab("favorites")}
        >
          My favorites pets
        </button>
        <button
          className={`${css.tab} ${activeTab === "viewed" ? css.tabActive : ""}`}
          onClick={() => setActiveTab("viewed")}
        >
          Viewed
        </button>
      </div>
      <ul className={css.list}>
        {notices.map((notice) => (
          <NoticesItem
            key={notice._id}
            notice={notice}
            onAuthAction={() => true}
            onLearnMore={() => {}}
            onFavoriteToggle={() => handleRemoveFavorite(notice._id)}
          />
        ))}
      </ul>
    </div>
  );
}
