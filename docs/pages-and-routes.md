# Pages and Routes

This document covers every page, URL, and API endpoint in the project.

---

## Pages

### Home — `/`

**File**: `src/app/page.tsx`  
**Domain**: `src/domains/home/`

The landing page. Shows an animated hero section with a text reveal animation and a short summary of who Ramin is. This is the first thing visitors see.

**Key Components Used:**

- `HeroTextAnimator` — animates the main heading text letter by letter
- `Summary` — displays a short bio paragraph

---

### About Me — `/about-me`

**File**: `src/app/about-me/page.tsx`  
**Domain**: `src/domains/about-me/`

A personal introduction page with photos, background info, and a recommendations box.

**Key Components Used:**

- `RecommendationsBox` — shows a small preview of testimonials

---

### Blog / Posts — `/posts`

**File**: `src/app/posts/page.tsx`  
**Domain**: `src/domains/posts/`

Lists all blog posts. Supports text search and category filtering. Reads posts from the filesystem (the `posts/` folder).

**Key Components Used:**

- `PostCard` — shows a preview of each post
- `PostsSearch` — live search input
- `PostsCategoryFilter` — dropdown to filter by category
- `EmptyPostBlock` — shown when no posts match the filters

**URL Parameters:**

- `?q=search-term` — search query
- `?category=Engineering` — filter by category
- `?tag=React` — filter by tag

---

### Single Post — `/posts/:id`

**File**: `src/app/posts/[id]/page.tsx`  
**Domain**: `src/domains/posts/`

Shows the full content of a single blog post. The `:id` is the numeric ID from the post's front matter.

**Key Components Used:**

- `PostDate` — formatted publish date
- `PostTags` — list of tags
- `PostCategory` — category badge
- `PostAuthor` — author info
- `PostReadTime` — estimated reading time
- `PostShare` — social sharing buttons
- `BackToPostsButton` — link back to the posts list

---

### Journey — `/journey`

**File**: `src/app/journey/page.tsx`  
**Domain**: `src/domains/journey/`

A timeline of Ramin's career — jobs, education, and skills. Entries are sorted chronologically and displayed as cards.

**Key Components Used:**

- `JourneyCard` — one card per career event

---

### Projects — `/projects`

**File**: `src/app/projects/page.tsx`  
**Domain**: `src/domains/projects/`

A grid of personal and professional projects. Each card shows the project name, description, role, tech stack, and links.

**Key Components Used:**

- `ProjectCard` — one card per project

---

### Contact Me — `/contact-me`

**File**: `src/app/contact-me/page.tsx`  
**Domain**: `src/domains/contact-me/`

A contact form where visitors can send a message. Protected by Google reCAPTCHA v3.

**Key Components Used:**

- `ContactForm` — the full form with validation

---

### Lens (Photo Gallery) — `/lens`

**File**: `src/app/lens/page.tsx`  
**Domain**: `src/domains/lens/`

A photo gallery with a grid of images. Clicking an image opens it in a full-screen modal.

**Key Components Used:**

- `LensCard` — one card per photo
- `LensGalleryModal` — full-size image modal
- `LensEmptyBlock` — shown if no images exist

---

### Recommendations — `/recommendations`

**File**: `src/app/recommendations/page.tsx`  
**Domain**: `src/domains/recommendations/`

A page showing testimonials and recommendations from colleagues and collaborators.

---

### Error Page

**File**: `src/app/error.tsx`  
**Domain**: `src/domains/error/`

Shown automatically when an unhandled error occurs on any page. Has a button to try again.

---

### 404 Not Found

**File**: `src/app/not-found.tsx`  
**Domain**: `src/domains/not-found/`

Shown when the user visits a URL that does not exist.

---

## Redirects

These old URLs are automatically redirected to their new locations:

| Old URL   | New URL    |
| --------- | ---------- |
| `/skills` | `/journey` |
| `/blog`   | `/posts`   |

Configured in `next.config.ts`.

---

## API Routes

All API routes are inside `src/app/api/`.

---

### Health Check — `GET /api`

**File**: `src/app/api/route.ts`

A simple endpoint to confirm the API is running.

**Response:**

```json
{ "message": "API is ready :D" }
```

---

### Post Search — `GET /api/posts/search`

**File**: `src/app/api/posts/search/route.ts`

Searches blog posts by their title, description, tags, or category.

**Query Parameters:**

- `q` — the search string (required)

**Example Request:**

```
GET /api/posts/search?q=react
```

**Success Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Getting Started with React",
      "slug": "getting-started-with-react",
      "date": "2024-01-15",
      "category": "Engineering",
      "tags": ["React", "JavaScript"],
      "description": "...",
      "author": "Ramin Rezaei",
      "isActive": true
    }
  ],
  "message": "Results found"
}
```

**Error Response:**

```json
{
  "success": false,
  "data": [],
  "message": "No query provided"
}
```

---

### reCAPTCHA Verify — `POST /api/recaptcha-verify`

**File**: `src/app/api/recaptcha-verify/route.ts`

Verifies a Google reCAPTCHA v3 token. Used by the contact form before sending an email.

**Request Body:**

```json
{ "token": "reCAPTCHA_token_string" }
```

**Success Response (score ≥ 0.5):**

```json
{
  "success": true,
  "message": "Verification passed"
}
```

**Failure Response:**

```json
{
  "success": false,
  "message": "Verification failed",
  "details": { "...": "Google's response object" }
}
```

---

### React Sample API — `GET|POST /api/react-sample`

**File**: `src/app/api/react-sample/route.ts`

A demo API for learning and examples. Not used in production features.

**GET Response:** Returns a fake list of users.

**POST Request:**

```json
{ "username": "admin", "password": "admin" }
```

**POST Response (correct credentials):**

```json
{
  "success": true,
  "token": "fake-jwt-token",
  "user": { "id": 1, "name": "Admin" }
}
```

**POST Response (wrong credentials):**

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```
