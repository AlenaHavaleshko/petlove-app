import { useState, type FormEvent, type ChangeEvent } from "react";
import css from "./SearchField.module.css";

interface SearchFieldProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
}

function SearchField({ onSearch, placeholder = "Search" }: SearchFieldProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    onSearch("");
  };

  const handleSearchClick = () => {
    onSearch(value.trim());
  };

  return (
    <form className={css.searchForm} onSubmit={handleSubmit}>
      <div className={css.searchWrapper}>
        <input
          type="text"
          className={css.searchInput}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
        <div className={css.searchIcons}>
          {value && (
            <button
              type="button"
              className={css.clearButton}
              onClick={handleClear}
              aria-label="Clear search"
            >
              <svg
                className={css.icon}
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          <button
            type="button"
            className={css.searchButton}
            onClick={handleSearchClick}
            aria-label="Search"
          >
            <svg
              className={css.icon}
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M15.75 15.75L12.4875 12.4875"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}

export default SearchField;
