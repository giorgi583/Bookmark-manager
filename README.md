# Bookmark Manager

A full-stack bookmark manager built with Next.js, where users can save links, get automatic title/favicon/preview-image fetching, organize with tags, search, favorite, and keep their bookmarks private behind authentication.

Built as a learning project to get hands-on with the Next.js App Router, Server Components, and Server Actions.

## Features

- **Save a URL and get metadata automatically** — title, favicon, and Open Graph preview image are scraped server-side, no manual entry needed
- **Tags** — organize bookmarks with custom tags
- **Search & filter** — find bookmarks by title or tag
- **Favorites** — mark bookmarks you want to find quickly
- **Copy URL** — one-click copy to clipboard
- **Export** — download all your bookmarks as a JSON file
- **Authentication** — email/password login (with NextAuth + JWT sessions); each user only sees their own bookmarks
- **Edit & delete** — update a bookmark's title/tags, or remove it (with a toast confirmation instead of a browser `confirm()` dialog)
- **Graceful fallbacks** — if a site blocks scraping or has no metadata, bookmarks still save with sensible defaults

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | MongoDB (via Mongoose) |
| Auth | NextAuth.js (Credentials provider, JWT sessions) |
| Data mutations | Next.js Server Actions (no separate REST API layer) |
| Metadata scraping | `fetch` + `cheerio` |
| Notifications | Sonner (toasts) |

## Why Server Actions instead of API routes

Most of this app's reads and writes go through **Server Actions** rather than traditional API routes. Server Components fetch data directly via Mongoose (no `fetch`/`useEffect` round-trip needed), and forms call server functions directly through the `action` prop — cutting out a layer of client-side fetching, loading state, and JSON parsing that a typical React + REST API app would need.

## Getting started

### Prerequisites

- Node.js 18.18 or newer
- A MongoDB database (e.g. a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

### Setup

1. Clone the repo and install dependencies:
   ```bash
   git clone <your-repo-url>
   cd bookmark-manager
   npm install
   ```

2. Create a `.env.local` file in the project root:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
   ```

3. Run the dev server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Project structure

```
app/
  page.tsx                        # Home page — Server Component, fetches bookmarks directly
  actions.ts                      # Server Actions (add, edit, delete, favorite bookmarks)
  api/
    auth/[...nextauth]/route.ts   # NextAuth config + route handler
    export/route.ts               # JSON export download endpoint
  components/
    AddBookmarkForm.tsx
    BookmarkList.tsx
    SearchBar.tsx
lib/
  mongodb.ts                      # Mongoose connection singleton
models/
  Bookmark.ts
  User.ts
types/
  next-auth.d.ts                  # Session/JWT type augmentation
```

## Things I learned building this

- The Server vs. Client Component split, and pushing `"use client"` as far down the component tree as possible
- Server Actions as a replacement for hand-written API routes + client-side fetching
- Why server-side scraping needs a `User-Agent` header, timeouts, and fallback handling (some sites block bots or return interstitial pages)
- Resolving relative URLs (favicons, OG images) against their source page
- Why auth checks have to happen inside Server Actions themselves, not just hidden in the UI
- NextAuth's JWT session strategy, and extending the session/token types to carry custom fields

## Possible next steps

- OAuth login (Google/GitHub)
- Import bookmarks from a browser export file
- Per-bookmark "refresh metadata" retry button