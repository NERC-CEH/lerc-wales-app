import { test, expect } from './fixtures';

test('Welsh settings and shared controls remain translated after reload', async ({
  homePage,
}) => {
  await homePage.getByRole('tab', { name: 'Menu' }).click();
  await homePage.getByRole('link', { name: 'Settings', exact: true }).click();
  await homePage.getByRole('link', { name: /Language/ }).click();
  await homePage.getByText('Cymraeg', { exact: true }).click();

  await expect(homePage.locator('#language-select ion-title')).toHaveText(
    'Iaith'
  );
  await homePage.getByRole('button', { name: 'Yn ôl' }).click();
  await expect(homePage.locator('#settings ion-title')).toHaveText(
    'Gosodiadau'
  );

  await homePage.reload();
  await expect(homePage.locator('#settings ion-title')).toHaveText(
    'Gosodiadau'
  );
  await homePage.getByRole('link', { name: /Iaith/ }).click();
  await expect(homePage.getByRole('radio', { name: 'Cymraeg' })).toBeChecked();
});
