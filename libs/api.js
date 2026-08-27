const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050/api';

/**
 * Standard API fetch wrapper with cookie credentials and JSON handling
 * @param {string} endpoint 
 * @param {RequestInit} [options={}] 
 */
export async function fetchApi(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
  
  const headers = {
    ...(options.headers || {})
  };

  // If body is not FormData, default to JSON Content-Type
  if (options.body && !(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const config = {
    ...options,
    headers,
    credentials: 'include', // Ensures HTTP-only cookies are sent/received
  };

  try {
    const response = await fetch(url, config);
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(result.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = result;
      throw error;
    }

    return result;
  } catch (err) {
    if (!err.status) {
      console.error('[API Network Error]:', err);
    }
    throw err;
  }
}

/**
 * Helper to resolve image URLs (handles relative uploads and static SVG fallbacks)
 * @param {string} path 
 * @param {string} [slug]
 * @returns {string}
 */
export function getImageUrl(path, slug) {
  if (!path || path === 'null' || path === 'undefined') {
    if (slug) return `/images/products/${slug}.svg`;
    return '/images/placeholder.svg';
  }
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/uploads/')) {
    const serverOrigin = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050/api').replace('/api', '');
    return `${serverOrigin}${path}`;
  }
  return path;
}

