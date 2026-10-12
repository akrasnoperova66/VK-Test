import { test, expect } from '@playwright/test';
import {WidgetPage} from "./widget.page";


test.describe('Uchi.ru widget', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({ page }) => {
    widgetPage = new WidgetPage(page);

    // open uchi.ru main page
    await page.goto('https://uchi.ru/');

    // close cookies popup
    await page.click('._UCHI_COOKIE__button');
  });

  test('opens', async ({ page }) => {
    await widgetPage.openWidget();

    expect(await widgetPage.getWidgetBody()).toBeVisible();
  });

  test('has correct title', async ({ page }) => {
    await widgetPage.openWidget();

    const articles = await widgetPage.getPopularArticles();

    await articles[0].click();

    await widgetPage.clickWriteToUs();

    expect(await widgetPage.getTitle()).toEqual('Связь с поддержкой');
  });
});
