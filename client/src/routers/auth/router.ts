// Authentication middleware
export const authMiddleware = (request, env) => {
  const apiKey = request.headers.get('apikey')

  const validApiKey = env?.API_KEY || '';

  if (request.url.includes('/login')) {
    // Allow access to the login page without authentication
    return undefined
  }

  if (apiKey !== validApiKey) {
    // Construct the full URL for the redirect
    const loginUrl = new URL('/login', request.url).toString()
    return Response.redirect(loginUrl)
  }

  // Continue to the next handler if authenticated
  return undefined
}