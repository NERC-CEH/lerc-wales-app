import { test as base, type Page } from '@playwright/test';

type Fixtures = {
  /** A page that has already completed onboarding and landed on the home screen. */
  homePage: Page;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    await page.goto('/');

    // onboarding is shown by default on a fresh session
    await page.waitForSelector('#welcome-page');

    await page.locator('#welcome-page ion-footer ion-button').click();

    // wait for the main tab bar to confirm we reached the home screen
    await page.waitForSelector('ion-tab-bar');

    await use(page);
  },
});

export { expect } from '@playwright/test';
