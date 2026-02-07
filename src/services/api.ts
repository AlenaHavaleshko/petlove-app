const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://petlove.b.goit.study/api';

export interface NewsItem {
  _id: string;
  imgUrl: string;
  title: string;
  text: string;
  date: string;
  url: string;
  id: string;
}

export interface NewsResponse {
  results: NewsItem[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface FetchNewsParams {
  keyword?: string;
  page?: number;
  limit?: number;
}

export async function fetchNews({
  keyword = '',
  page = 1,
  limit = 6,
}: FetchNewsParams = {}): Promise<NewsResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (keyword) {
    params.append('keyword', keyword);
  }

  const response = await fetch(`${API_BASE_URL}/news?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }

  return response.json();
}
