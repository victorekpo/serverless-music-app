# Serverless React App

Domain: `cf.neweradesign.net`

## Client Hosted on Cloudflare Workers

- uses Wrangler for orchestration
- uses itty-router for Express-like routing
- uses React for client side framework
- uses custom webpack config for build
- 100,000 free requests per day

## Server Hosted on AWS Lambda

- uses AWS CDK for orchestration
- uses node engine
- best for database operations (i.e. working with MongoDB)
- 10,000 free requests per day

To run locally

- `export MONGODB_URI=...` for MongoDB connection
- `export API_KEY=...` for Spotify connection
- `npm run develop` will start client and server