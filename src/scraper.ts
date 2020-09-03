import {LinkedInProfileScraper} from 'linkedin-profile-scraper';

let scraper: LinkedInProfileScraper = null;
export const prepare = async (cookie?: string) => {
  scraper = new LinkedInProfileScraper({
    sessionCookieValue: process.env.COOKIE,
    keepAlive: true
  });

  await scraper.setup();
}

export const scrapeProfile = async (url) => {
  return scraper.run(url);
};