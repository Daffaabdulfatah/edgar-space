const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://edgar-space-git-main-4nt.vercel.app/api';

/**
 * Standard API fetch wrapper with cookie credentials and JSON handling
 * @param {string} endpoint
 * @param {RequestInit} [options={}]
 */
export async function fetchApi(endpoint, options = {}) {
  const url = endpoint.startsWith('http')
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  const headers = {
    ...(options.headers || {})
  };

  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !headers['Content-Type']
  ) {
    headers['Content-Type'] = 'application/json';
  }

  const config = {
    ...options,
    headers,
    credentials: 'include'
  };

  try {
    const response = await fetch(url, config);

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(
        result.message ||
          `Request failed with status ${response.status}`
      );

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
 * Helper to resolve image URLs
 * @param {string} path
 * @param {string} [slug]
 * @returns {string}
 */
export function getImageUrl(path, slug) {
  if (!path || path === 'null' || path === 'undefined') {
    if (slug) {
      return `/images/products/${slug}.svg`;
    }

    return '/images/placeholder.svg';
  }

  // External image URL
  if (
    path.startsWith('http://') ||
    path.startsWith('https://')
  ) {
    return path;
  }

  // Uploaded image
  if (path.startsWith('/uploads/')) {
    const serverOrigin =
      (
        process.env.NEXT_PUBLIC_API_URL ||
        'https://edgar-space-git-main-4nt.vercel.app/api'
      ).replace(/\/api\/?$/, '');

    return `${serverOrigin}${path}`;
  }

  return path;
}
