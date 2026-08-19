import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const variationId = query.variationId;

  // Return empty if no ID was provided
  if (!variationId) return { entries: [] };

  // master-staging only: Plenty test-drive (do not merge to main)
  const apiEndpoint = process.env.API_ENDPOINT || 'https://162667ef47.plenty-test-drive.eu';
  const securityToken =
    process.env.API_SECURITY_TOKEN || 'MTYyNjZfS004aDV2blVpSjVIOWpsaVlHcTBpUkpMVThXZUJCY2JlZHhIbHZxQzlYTDI4bExpem4=';

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