import { useState, useEffect } from "react";
import {fetchNews} from "../../../services/api";
import  type {NewsItem, NewsResponse} from "../../../services/types";
import PageTitle from "../../components/PageTitle/PageTitle";
import SearchField from "../../components/SearchField/SearchField";
import NewsList from "../../components/NewsList/NewsList";
import Pagination from "../../components/Pagination/Pagination";
import Loader from "../../components/Loader/Loader";
import { useLoader } from "../../../context/useLoader";
import css from "./News.module.css";

function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { isLoading, setIsLoading } = useLoader();

  const itemsPerPage = 6;

  useEffect(() => {
    const loadNews = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data: NewsResponse = await fetchNews({
          keyword,
          page: currentPage,
          limit: itemsPerPage,
        });

        setNews(data.results);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError("Failed to load news. Please try again later.");
        console.error("Error fetching news:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, [currentPage, keyword, setIsLoading]);

  const handleSearch = (searchKeyword: string) => {
    setKeyword(searchKeyword);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={css.newsPage}>
      <div className={css.container}>
        <div className={css.newTileWrapper}>
          <PageTitle>News</PageTitle>
          <SearchField onSearch={handleSearch} placeholder="Search" />
        </div>

        {isLoading && <Loader />}

        {error && !isLoading && (
          <div className={css.error}>
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            <NewsList news={news} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default News;
