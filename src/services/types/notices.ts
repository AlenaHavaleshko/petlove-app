
export interface Notice {
      _id: string;
      species: string;
      category: string;
      price?: number;
      title: string;
      name: string;
      birthday: string;
      comment: string;
      sex: string;
      location: string;
      imgURL: string;
      user: string;
      popularity: number;
      createdAt: string;
      updatedAt?: string;
      isFavorite?: boolean;
      phone?: string;
    }

    export interface NoticesResponse {
     page: number;
     perPage: number;
     totalPages: number;
     results: Notice[];
    }

    export interface FetchNoticesParams {
      page?: number;
      limit?: number;
      keyword?: string;
      category?: string;
      sex?: string;
      species?: string;
      location?: string;
      sortBy?: "popular" | "unpopular" | "price";
      // priceOrder больше не используется, сортировка по цене только по возрастанию (byPrice: true)
      // priceOrder?: "asc" | "desc";
    }

    export interface Location {
      _id: string;
      cityEn: string;
      stateEn: string;
      countyEn?: string;
      useCounty?: boolean;
    }

    export interface NoticesFiltersProps {
      filters: FetchNoticesParams;
      onChange: (filters: Partial<FetchNoticesParams>) => void;
      onReset?: () => void;
    }