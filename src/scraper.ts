import {LinkedInProfileScraper} from 'linkedin-profile-scraper';

let scraper: LinkedInProfileScraper = null;
export const prepare = async (cookie?: string) => {
  scraper = new LinkedInProfileScraper({
    sessionCookieValue: 'AQEDASpyadUFKkHeAAABdFDQtJcAAAF0dN04l04AiQ5HHI7LGypTDHkBeINs-GjgMMMTvT_-zAIwCI9iS1JTAt9hbhiCdM8kS-Emwg7xpTfuElRGZ-nzGY7BPLMoh6ZSwZfFDjdVKphKwkp6AvxA8Jdz',
    keepAlive: true
  });

  await scraper.setup();
}

export const scrapeProfile = async (url) => {
  return scraper.run(url);
};