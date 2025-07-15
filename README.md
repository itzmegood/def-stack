

# Def Stack

A modern web application stack featuring React Router v7, Convex, and Better Auth. Build robust, scalable, and secure apps with a focus on developer experience and modern best practices.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features


## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```
# Def Stack

A modern web application stack featuring React Router v7, Convex, and Better Auth. This project is designed for building robust, scalable, and secure web applications with a focus on developer experience and modern best practices.

## Features

- **React Router v7**: Advanced routing for React applications.
- **Convex**: Powerful backend-as-a-service for real-time data and serverless functions.
- **Better Auth**: Secure authentication with social provider support (Google included by default).
- **TypeScript**: Type-safe codebase for reliability and maintainability.
- **Vite**: Fast development and build tooling.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Modern UI Components**: Includes a set of reusable, accessible UI components.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
npm install
# or

```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Start (Production)

```bash
npm run start
```

### Type Checking

```bash
npm run typecheck
```

## Environment Variables

Create a `.env` or `.env.production` file in the project root. Example:

```env
ENVIRONMENT=production
CONVEX_SELF_HOSTED_URL=your_convex_url
CONVEX_SELF_HOSTED_ADMIN_KEY=your_admin_key
VITE_CONVEX_URL=your_convex_url
CONVEX_SITE_URL=your_site_url
SITE_URL=your_site_url
BETTER_AUTH_SECRET=your_secret
```

## Social Authentication

Google authentication is enabled by default. To add more providers, update the `SOCIAL_PROVIDER_CONFIGS` in `app/lib/config.ts` and synchronize with your auth server configuration.

## Scripts

- `dev`: Start the development server
- `build`: Build the app for production
- `start`: Serve the production build
- `typecheck`: Run type checking
- `dev:db`: Start Convex in development mode

## Tech Stack

- React 19
- React Router v7
- Convex
- Better Auth
- TypeScript
- Vite
- Tailwind CSS
- Zod (validation)
- Radix UI, Lucide, Tabler Icons, and more

## License

This project is licensed under the MIT License.
### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
