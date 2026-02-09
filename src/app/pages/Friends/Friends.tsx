import { useState, useEffect } from "react";
import { fetchFriends } from "../../../services/api";
import type { Friend } from "../../../services/types/friends";
import FriendsList from "../../components/FriendsList/FriendsList";
import Title from "../../components/PageTitle/PageTitle";
import Loader from "../../components/Loader/Loader";
//import { useLoader } from "../../../context/useLoader";
import css from "./Friends.module.css";

function FriendsPage() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFriends()
      .then(setFriends)
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={css.friendsPage}>
      <div className={css.container}>
        <div className={css.friendsWrapper}>
          <Title>Our friends</Title>

          {isLoading && <Loader />}

          {error && !isLoading && (
            <div className={css.error}>
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && <FriendsList friends={friends} />}
        </div>
        
      </div>
    </div>
  );
}

export default FriendsPage;
