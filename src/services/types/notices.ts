
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
    }

    export interface NoticesResponse {
     pages: number;
     perPage: number;
     total: number;
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
      sortBy?: "popular" | "price";
    }