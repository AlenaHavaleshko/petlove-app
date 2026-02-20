import { useState, useEffect } from "react";
import Select, { components } from "react-select";
import type {
  SingleValue,
  MultiValue,
  DropdownIndicatorProps,
  ClearIndicatorProps,
} from "react-select";
import SearchField from "../SearchField/SearchField";
import {
  fetchCategories,
  fetchSexOptions,
  fetchSpecies,
  fetchLocations,
} from "../../../services/api/notices";
import type {
  NoticesFiltersProps,
  Location,
} from "../../../services/types/notices";
import css from "./NoticesFilters.module.css";

interface OptionType {
  value: string;
  label: string;
  __isShowAll__?: boolean;
}

// Custom Dropdown Indicator with SVG icon
const DropdownIndicator = (props: DropdownIndicatorProps<OptionType>) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        className={css.dropdownIcon}
        width={20}
        height={20}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: props.selectProps.menuIsOpen
            ? "rotate(180deg)"
            : "rotate(0deg)",
          transition: "transform 0.2s ease",
        }}
      >
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="#262626"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

// Custom Clear Indicator with X icon (same as SearchField)
const ClearIndicator = (props: ClearIndicatorProps<OptionType>) => {
  return (
    <components.ClearIndicator {...props}>
      <svg className={css.clearIcon} width="18" height="18" viewBox="0 0 18 18">
        <path
          d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
          stroke="#262626"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </components.ClearIndicator>
  );
};

export default function NoticesFilters({
  filters,
  onChange,
}: NoticesFiltersProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [sexOptions, setSexOptions] = useState<string[]>([]);
  const [speciesOptions, setSpeciesOptions] = useState<string[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);

  // Fetch filter options on mount
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const [categoriesData, sexData, speciesData] = await Promise.all([
          fetchCategories(),
          fetchSexOptions(),
          fetchSpecies(),
        ]);

        console.log("Loaded filter options:", {
          categories: categoriesData,
          sex: sexData,
          species: speciesData,
        });

        setCategories(categoriesData);
        setSexOptions(sexData);
        setSpeciesOptions(speciesData);
      } catch (error) {
        console.error("Error loading filter options:", error);
      }
    };

    loadFilterOptions();
  }, []);

  // Load locations based on search keyword
  const loadLocations = async (inputValue: string) => {
    if (!inputValue || inputValue.length < 2) {
      setLocations([]);
      return;
    }

    setIsLoadingLocations(true);
    try {
      const data = await fetchLocations(inputValue);
      setLocations(data);
    } catch (error) {
      console.error("Error loading locations:", error);
      setLocations([]);
    } finally {
      setIsLoadingLocations(false);
    }
  };

  // Handle search field change
  const handleSearch = (keyword: string) => {
    onChange({ keyword: keyword || undefined });
  };

  // Handle category change
  const handleCategoryChange = (
    newValue: SingleValue<OptionType> | MultiValue<OptionType>,
  ) => {
    if (Array.isArray(newValue)) {
      onChange({ category: newValue[0]?.value || undefined });
    } else {
      onChange({
        category: (newValue as OptionType | null)?.value || undefined,
      });
    }
  };

  // Handle sex change
  const handleSexChange = (
    newValue: SingleValue<OptionType> | MultiValue<OptionType>,
  ) => {
    if (Array.isArray(newValue)) {
      onChange({ sex: newValue[0]?.value || undefined });
    } else {
      onChange({ sex: (newValue as OptionType | null)?.value || undefined });
    }
  };

  // Handle species change
  const handleSpeciesChange = (
    newValue: SingleValue<OptionType> | MultiValue<OptionType>,
  ) => {
    if (Array.isArray(newValue)) {
      onChange({ species: newValue[0]?.value || undefined });
    } else {
      onChange({
        species: (newValue as OptionType | null)?.value || undefined,
      });
    }
  };

  // Handle location change
  const handleLocationChange = (
    newValue: SingleValue<OptionType> | MultiValue<OptionType>,
  ) => {
    if (Array.isArray(newValue)) {
      onChange({ location: newValue[0]?.value || undefined });
    } else {
      onChange({
        location: (newValue as OptionType | null)?.value || undefined,
      });
    }
  };

  // Prepare category options
  const categoryOptions: OptionType[] = categories.map((cat) => ({
    value: cat,
    label: cat.charAt(0).toUpperCase() + cat.slice(1),
  }));

  // Prepare sex options
  const sexSelectOptions: OptionType[] = sexOptions.map((sex) => ({
    value: sex,
    label: sex.charAt(0).toUpperCase() + sex.slice(1),
  }));

  // Prepare species options
  const speciesSelectOptions: OptionType[] = speciesOptions.map((species) => ({
    value: species,
    label: species.charAt(0).toUpperCase() + species.slice(1),
  }));

  // Prepare location options for react-select
  const locationOptions: OptionType[] = locations.map((loc) => ({
    value: loc._id,
    label: loc.useCounty
      ? `${loc.cityEn}, ${loc.countyEn}, ${loc.stateEn}`
      : `${loc.cityEn}, ${loc.stateEn}`,
  }));

  // Find selected options
  const selectedCategory =
    categoryOptions.find((opt) => opt.value === filters.category) || null;
  const selectedSex =
    sexSelectOptions.find((opt) => opt.value === filters.sex) || null;
  const selectedSpecies =
    speciesSelectOptions.find((opt) => opt.value === filters.species) || null;
  const selectedLocation =
    locationOptions.find((opt) => opt.value === filters.location) || null;

  // Custom format for "Show all" option
  const formatOptionLabel = (option: OptionType) => (
    <span
      style={option.__isShowAll__ ? { color: "#f6b83d", fontWeight: 500 } : {}}
    >
      {option.label}
    </span>
  );

  return (
    <div className={css.noticesFilters}>
      <div className={css.topRow}>
        {/* Search Field */}
        <div className={css.searchWrapper}>
          <SearchField onSearch={handleSearch} placeholder="Search" />
        </div>

        {/* Category Select */}
        <div className={css.selectWrapper}>
          <Select
            className={css.reactSelect}
            classNamePrefix="select"
            options={[
              { value: "", label: "Show all", __isShowAll__: true },
              ...categoryOptions,
            ]}
            value={selectedCategory}
            onChange={handleCategoryChange}
            isClearable
            placeholder="Category"
            formatOptionLabel={formatOptionLabel}
            components={{ DropdownIndicator, ClearIndicator }}
          />
        </div>

        {/* Sex Select */}
        <div className={css.selectWrapper}>
          <Select
            className={css.reactSelect}
            classNamePrefix="select"
            options={[
              { value: "", label: "Show all", __isShowAll__: true },
              ...sexSelectOptions,
            ]}
            value={selectedSex}
            onChange={handleSexChange}
            isClearable
            placeholder="By gender"
            formatOptionLabel={formatOptionLabel}
            components={{ DropdownIndicator, ClearIndicator }}
          />
        </div>

        {/* Species Select */}
        <div className={css.selectWrapper}>
          <Select
            className={css.reactSelect}
            classNamePrefix="select"
            options={[
              { value: "", label: "Show all", __isShowAll__: true },
              ...speciesSelectOptions,
            ]}
            value={selectedSpecies}
            onChange={handleSpeciesChange}
            isClearable
            placeholder="By type"
            formatOptionLabel={formatOptionLabel}
            components={{ DropdownIndicator, ClearIndicator }}
          />
        </div>

        {/* Location Autocomplete */}
        <div className={css.locationWrapper}>
          <Select
            className={css.reactSelect}
            classNamePrefix="select"
            options={[
              { value: "", label: "Show all", __isShowAll__: true },
              ...locationOptions,
            ]}
            value={selectedLocation}
            onChange={handleLocationChange}
            onInputChange={(value) => {
              loadLocations(value);
              return value;
            }}
            filterOption={() => true}
            isLoading={isLoadingLocations}
            isClearable
            placeholder="Location"
            noOptionsMessage={() => "No locations found"}
            formatOptionLabel={formatOptionLabel}
            components={{ DropdownIndicator, ClearIndicator }}
          />
        </div>
      </div>

      {/* Sort Buttons */}
      <div className={css.bottomRow}>
        <button
          type="button"
          className={`${css.sortButton} ${filters.sortBy === "popular" ? css.active : ""}`}
          onClick={() =>
            onChange({
              sortBy: filters.sortBy === "popular" ? undefined : "popular",
            })
          }
        >
          Popular
          {filters.sortBy === "popular" && (
            <span className={css.closeIcon}>✕</span>
          )}
        </button>
        <button
          type="button"
          className={`${css.sortButton} ${filters.sortBy === "unpopular" ? css.active : ""}`}
          onClick={() =>
            onChange({
              sortBy: filters.sortBy === "unpopular" ? undefined : "unpopular",
            })
          }
        >
          Unpopular
          {filters.sortBy === "unpopular" && (
            <span className={css.closeIcon}>✕</span>
          )}
        </button>
        <button
          type="button"
          className={`${css.sortButton} ${filters.sortBy === "price" ? css.active : ""}`}
          onClick={() => {
            const isActive = filters.sortBy === "price";
            onChange({
              sortBy: isActive ? undefined : "price",
            });
          }}
        >
          Cheap
          {filters.sortBy === "price" && (
            <span className={css.closeIcon}>✕</span>
          )}
        </button>
        <button
          type="button"
          className={`${css.sortButton} ${filters.sortBy === "price" ? css.active : ""}`}
          onClick={() => {
            const isActive = filters.sortBy === "price";
            onChange({
              sortBy: isActive ? undefined : "price",
            });
          }}
        >
          Expensive
          {filters.sortBy === "price" && (
            <span className={css.closeIcon}>✕</span>
          )}
        </button>
      </div>
    </div>
  );
}
