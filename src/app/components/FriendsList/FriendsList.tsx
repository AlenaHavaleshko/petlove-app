import type { Friend } from "../../../services/types/friends";
import FriendsItem from "../FriendsItem/FriendsItem";

import css from "./FriendsList.module.css";

interface FriendsListProps {
  friends: Friend[];
}

export default function FriendsList({ friends }: FriendsListProps) {
  if (!friends || friends.length === 0) {
    return (
      <div className={css.emptyState}>
        <p className={css.emptyText}>No friends found</p>
      </div>
    );
  }

  return (
    <ul className={css.friendsList}>
      {friends.map((friend) => (
        <FriendsItem key={friend._id} friend={friend} />
      ))}
    </ul>
  );
}
