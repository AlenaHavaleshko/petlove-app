import { API_BASE_URL } from "../apiBase";   
import type { Friend } from "../types/friends";

export async function fetchFriends(): Promise<Friend[]> {
const response = await fetch (`${API_BASE_URL}/friends`);

if (!response.ok) {
  throw new Error("Failed to fetch friends");
}
return response.json();
}
