import { useState, useEffect } from "react";
import { fetchNotices } from "../../../services/api/notices";
import type {
  Notice,
  FetchNoticesParams,
  NoticesResponse,
} from "../../../services/types/notices";
import PageTitle from "../../components/PageTitle/PageTitle";
import NoticesFilters from "../../components/NoticesFilters/NoticesFilters";
import NoticesList from "../../components/NoticesList/NoticesList";
import Pagination from "../../components/Pagination/Pagination";
import Loader from "../../components/Loader/Loader";
import css from "./Notices.module.css";
  
function Notices() {
  const [filters, setFilters] = useState<FetchNoticesParams>({
    page: 1,
    limit: 6,
  });
  const [notices, setNotices] = useState<Notice[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNotices = async () => {
      try {
        setError(null);
        const data: NoticesResponse = await fetchNotices(filters);
        setNotices(data.results);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError("Failed to load notices. Please try again later.");
        console.error("Error fetching notices:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadNotices();
  }, [filters]);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={css.noticesPage}>
      <div className={css.container}>
        <PageTitle>Find your favorite pet</PageTitle>

        <NoticesFilters
          filters={filters}
          onChange={(newFilters) =>
            setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
          }
          onReset={() => setFilters({ page: 1, limit: 6 })}
        />

        {isLoading && <Loader />}

        {error && !isLoading && (
          <div className={css.error}>
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <>
            <NoticesList notices={notices} />
            <Pagination
              currentPage={filters.page || 1}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Notices;
