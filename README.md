# MILLIE PMI Project (API)
#### Prerequisites
- `node v12.18.3+`
- `postgres v12.4`
- `yarn` (optional)

The scraper uses a bundled Chromium browser and was tested on Windows 10.

#### Setup
Clone the repo:

```bash
git clone https://github.com/judehunter/millie-pmi-api .
```

Download dependencies:

```bash
yarn
```

Log out and log in again to your LinkedIn profile. Retrieve the value of the `li_at` cookie.
This can be done by opening the Chrome DevTools, navigating to `Application > Cookies > https://www.linkedin.com/feed/` and finding the cookie in the list.

Create a `.env` file in project root and fill in the `postgres` connection URL and the cookie you just retrieved. Example:

```dotenv
DB_URL=postgres://postgres:postgres@localhost:5432/millie
COOKIE=ABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDEABCDE-123456789012345678901234567890
```

Run the app in development mode. This will migrate the database and start the API:

```bash
yarn dev
```

#### The available routes are:
##### POST /
Submits the user data to the DB. Fetches the LinkedIn profile.

Accepts a body of type:
```ts
{
  name: string,
  email: string,
  linkedInUrl: string,
  moreInfo: string,
  expertise: string[],
  graduationYear: string,
  internationalSchool: boolean
}
```
##### GET /users
Returns all users' data.
