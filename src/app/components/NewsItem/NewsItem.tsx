import { type NewsItem as NewsItemType } from "../../../services/types/news";
import css from "./NewsItem.module.css";

interface NewsItemProps {
  news: NewsItemType;
}

function NewsItem({ news }: NewsItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <li className={css.newsItem}>
      <div className={css.imageWrapper}>
        <img
          src={news.imgUrl}
          alt={news.title}
          className={css.newsImage}
          loading="lazy"
        />
      </div>
      <div className={css.newsContent}>
        <h3 className={css.newsTitle}>{news.title}</h3>
        <p className={css.newsText}>{news.text}</p>
        <div className={css.newsFooter}>
          <time className={css.newsDate} dateTime={news.date}>
            {formatDate(news.date)}
          </time>
          <a
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className={css.newsLink}
          >
            Read more
          </a>
        </div>
      </div>
    </li>
  );
}

export default NewsItem;
