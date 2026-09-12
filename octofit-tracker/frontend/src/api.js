const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function recordsFrom(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

export async function fetchCollection(resourceOrUrl) {
  const endpoint = resourceOrUrl.startsWith('http')
    ? resourceOrUrl
    : `${apiBaseUrl}/api/${resourceOrUrl}/`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status})`);
  }

  return recordsFrom(await response.json());
}

export function displayValue(value) {
  if (value === null || value === undefined || value === '') return '-';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}