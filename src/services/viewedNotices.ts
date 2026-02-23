import type { Notice } from "./types/notices";

const STORAGE_KEY = "viewedNotices";

export function getViewedNotices(): Notice[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addViewedNotice(notice: Notice): void {
  const current = getViewedNotices();
  if (current.some((n) => n._id === notice._id)) return;
  const updated = [notice, ...current].slice(0, 100); // keep last 100
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
