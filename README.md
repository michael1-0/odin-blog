# odin-blog

This is a project submission for The Odin Project NodeJS Course, Project: Blog API.

This is a Vite + React SPA main client that consumes a restful blog API, where users can see uploaded blogs by admins and comment with their username input.

Links:

- Main Client: [Live](https://odin-blog-rho.vercel.app/) | [Repo](https://github.com/michael1-0/odin-blog)
- Admin Client: [Live](https://odin-blog-admin-eta.vercel.app/) | [Repo](https://github.com/michael1-0/odin-blog-admin)
- API: [Live](https://odin-blog-api-hwjb.onrender.com/api/) | [Repo](https://github.com/michael1-0/odin-blog-api)

## Features

- Browse blog posts published by administrators
- View individual blog post details
- Read and submit comments on blog posts
- Comment as a guest with a username
- Responsive design for mobile and desktop devices

## Tech Stack

- React 19 for frontend framework
- Vite for build tool
- TypeScript for main language
- React Router 7 Declarative Mode for routing
- Tailwind CSS 4 for styling
- Vercel for deployment

## Installation

1. Clone the repository

2. Install dependencies:

```bash
npm install
```

3. Create a .env with the corresponding API url:

```
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```
