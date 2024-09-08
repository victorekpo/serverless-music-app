// Logging middleware
export const loggerMiddleware = (request) => {
  console.log(`Request made to: ${request.url}`)
  return undefined
}