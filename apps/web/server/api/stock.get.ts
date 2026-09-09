import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const variationId = query.variationId;

  // Return empty if no ID was provided
  if (!variationId) return { entries: [] };

  const apiEndpoint = process.env.API_ENDPOINT || 'https://www.komplett-konzept.de';
  const securityToken = process.env.API_SECURITY_TOKEN || '';

  if (!securityToken) {
    console.error('API_SECURITY_TOKEN is not set');
    return { entries: [] };
  }

  try {
    // 1. Use standard 'fetch' instead of '$fetch' to bypass the TypeScript error
    const response = await fetch(`${apiEndpoint}/rest/stockmanagement/stock?variationId=${variationId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${securityToken}`,
        Accept: 'application/json'
      }
    });

    // 2. Handle non-200 responses gracefully
    if (!response.ok) {
      console.error('API Error:', response.statusText);
      return { entries: [] };
    }

    // 3. Parse and return the JSON data
    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Plentymarkets Stock API Error:', error);
    // Return empty fallback array so the frontend doesn't crash
    return { entries: [] }; 
  }
});