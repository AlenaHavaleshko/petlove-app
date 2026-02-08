import { type Friend } from "../../../services/types/friends";
import css from "./FriendsItem.module.css";

interface FriendsItemProps {
  friend: Friend;
}

export default function FriendsItem({ friend }: FriendsItemProps) {
  const workTime = friend.workDays?.find((day) => day.isOpen);

  return (
    <li className={css.friendsItem}>
      <div className={css.timeBadge}>
        {workTime ? `${workTime.from} - ${workTime.to}` : "Day and night"}
      </div>
      <div className={css.imageWrapper}>
        <img
          src={friend.imageUrl}
          alt={friend.title}
          className={css.friendPhoto}
        />
      </div>

      <div className={css.contentWrapper}>
        <h3 className={css.title}>{friend.title}</h3>
        <p className={css.info}>
          <span className={css.label}>Email:</span>
          <a href={`mailto:${friend.email}`} className={css.link}>
            {friend.email}
          </a>
        </p>

        <p className={css.info}>
          <span className={css.label}>Address:</span>
          <a
            href={friend.addressUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={css.link}
          >
            {friend.address || "website only"}
          </a>
        </p>
        <p className={css.info}>
          <span className={css.label}>Phone:</span>
          <a href={`tel:${friend.phone}`} className={css.link}>
            {friend.phone || "email only"}
          </a>
        </p>
      </div>
    </li>
  );
}
