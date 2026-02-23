import { useState } from "react";
import css from "./MyNotices.module.css";
import NoticesItem from "../NoticesItem/NoticesItem";
import type { Notice } from "../../../services/types/notices";
import { useFavorites } from "../../../context/useFavorites";
import { getViewedNotices } from "../../../services/viewedNotices";

export default function MyNotices() {
  const [activeTab, setActiveTab] = useState<"favorites" | "viewed">(
    "favorites",
  );

  const { favorites } = useFavorites();
  const [viewed] = useState<Notice[]>(() => getViewedNotices());

  const notices: Notice[] = activeTab === "favorites" ? favorites : viewed;

  return (
    <div className={css.myNotices}>
      <div className={css.tabs}>
        <button
          className={`${css.tab} ${
            activeTab === "favorites" ? css.tabActive : ""
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          My favorites pets
        </button>

        <button
          className={`${css.tab} ${
            activeTab === "viewed" ? css.tabActive : ""
          }`}
          onClick={() => setActiveTab("viewed")}
        >
          Viewed
        </button>
      </div>

      {notices.length === 0 ? (
        <p className={css.empty}>No notices yet</p>
      ) : (
        <ul className={css.list}>
          {notices.map((notice) => (
            <NoticesItem
              key={notice._id}
              notice={notice}
              onAuthAction={() => true}
              onLearnMore={() => {}}
              hideFavorite={activeTab === "viewed"}
              showRemoveBtn={activeTab === "favorites"}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
