import { API_BASE_URL } from "../apiBase";
import type { NoticesResponse, FetchNoticesParams } from "../types/notices";

export async function fetchNotices({
  page = 1,
  limit = 6,
  keyword,
  category,
  sex,
  species,
  location,
  sortBy,
}: FetchNoticesParams = {}): Promise<NoticesResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (keyword) {
    params.append('keyword', keyword);
  }
  
  if (category) {
    params.append('category', category);
  }
  
  if (sex) {
    params.append('sex', sex);
  }
  
  if (species) {
    params.append('species', species);
  }
  
  if (location) {
    params.append('locationId', location);
  }
  
  if (sortBy) {
    params.append('byPopularity', sortBy === 'popular' ? 'true' : 'false');
  }

  const response = await fetch(`${API_BASE_URL}/notices?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch notices');
  }

  return response.json();
}

export async function addToFavorites(id: string): Promise<void> {
  const token = localStorage.getItem('petlove_token');
  console.log('addToFavorites called', { 
    id, 
    hasToken: !!token, 
    token: token,
    fullURL: `${API_BASE_URL}/notices/favorites/add/${id}`
  });
  
  if (!token) {
    throw new Error('No authentication token found. Please login first.');
  }
  
  const response = await fetch(`${API_BASE_URL}/notices/favorites/add/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  console.log('addToFavorites response', { status: response.status, ok: response.ok });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('addToFavorites failed', errorText);
    throw new Error('Failed to add to favorites');
  }
}

export async function removeFromFavorites(id: string): Promise<void> {
  const token = localStorage.getItem('petlove_token');
  console.log('removeFromFavorites called', { id, hasToken: !!token });
  
  const response = await fetch(`${API_BASE_URL}/notices/favorites/remove/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  console.log('removeFromFavorites response', { status: response.status, ok: response.ok });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('removeFromFavorites failed', errorText);
    throw new Error('Failed to remove from favorites');
  }
}
 