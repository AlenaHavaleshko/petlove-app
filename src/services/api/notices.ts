// Получить избранные объявления пользователя
export async function fetchFavorites(): Promise<import("../types/notices").Notice[]> {
  const token = localStorage.getItem('petlove_token');
  if (!token) throw new Error('No authentication token found. Please login first.');
  const response = await fetch(`${API_BASE_URL}/notices/favorites`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch favorites');
  return response.json();
}
import { API_BASE_URL } from "../apiBase";
import type { NoticesResponse, FetchNoticesParams, Location } from "../types/notices";

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
    if (sortBy === 'popular') {
      params.append('byPopularity', 'false');
    } else if (sortBy === 'unpopular') {
      params.append('byPopularity', 'true');
    } else if (sortBy === 'price') {
      // byPrice only boolean supported by API
      params.append('byPrice', 'true');
    }
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
    
    // 409 Conflict means already in favorites - treat as success
    if (response.status === 409) {
      // Можно добавить notification
      if (typeof window !== 'undefined') {
        // Используем react-toastify если подключен
        try {
          const { toast } = await import('react-toastify');
          toast.info('This notice is already in favorites');
        } catch {}
      }
      return;
    }
    
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
    
    // 404 Not Found means not in favorites - treat as success
    if (response.status === 404) {
      return;
    }
    
    throw new Error('Failed to remove from favorites');
  }
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/notices/categories`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
}

export async function fetchSexOptions(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/notices/sex`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch sex options');
  }

  return response.json();
}

export async function fetchSpecies(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/notices/species`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch species');
  }

  return response.json();
}

export async function fetchLocations(keyword?: string): Promise<Location[]> {
  const params = keyword ? `?keyword=${encodeURIComponent(keyword)}` : '';
  const response = await fetch(`${API_BASE_URL}/cities${params}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch locations');
  }

  return response.json();
}
 