import { type NewsItem as NewsItemType } from "../../../services/api";
import NewsItem from "../NewsItem/NewsItem";
import css from "./NewsList.module.css";

interface NewsListProps {
  news: NewsItemType[];
}

function NewsList({ news }: NewsListProps) {
  if (!news || news.length === 0) {
    return (
      <div className={css.emptyState}>
        <p className={css.emptyText}>No news found</p>
      </div>
    );
  }

  return (
    <ul className={css.newsList}>
      {news.map((item) => (
        <NewsItem key={item._id} news={item} />
      ))}
    </ul>
  );
}

export default NewsList;
