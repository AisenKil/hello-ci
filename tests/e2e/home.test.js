const { Builder, By } = require('selenium-webdriver');

let driver;

beforeAll(async () => {
    driver = await new Builder()
        .forBrowser('chrome')
        .usingServer(process.env.SELENIUM_URL)
        .build();
});

afterAll(async () => {
    if (driver) {
        await driver.quit();
    }
});

test('homepage displays Hello DevOps', async () => {
    await driver.get(process.env.APP_URL);

    const header = await driver.findElement(By.css('h1'));
    const text = await header.getText();

    expect(text).toBe('Hello DevOps');
});