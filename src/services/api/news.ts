import { API_BASE_URL } from '../apiBase';
import type { FetchNewsParams, NewsResponse } from '../types/news';

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
