import { Page, Locator, test, expect } from "@playwright/test";

export abstract class PlaywrightWrapper {

    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    /*
    This function types on the given element textbox after clearing the existing text
    @page: The page object to be passed
    @locator: The element locator
    @name: Name of the element
    @data: Data to be typed
    */
    async type(locator: string, name: string, data: string) {
        await test.step(`Textbox ${name} filled with data: ${data}`, async () => {
            const frameCount = 1;
            if (frameCount > 0) {
                await this.page.frameLocator(".designer-client-frame").locator(locator).clear();
                await this.page.frameLocator(".designer-client-frame").locator(locator).fill(data);
            } else {
                await this.page.locator(locator).clear();
                await this.page.locator(locator).fill(data);
            }
        });
    }

    /*
    This function types on the given element textbox and press <ENTER> after clearing the existing text
    @page: The page object to be passed
    @locator: The element locator
    @name: Name of the element
    @data: Data to be typed
    */
    async typeAndEnter(locator: string, name: string, data: string) {
        await test.step(`Textbox ${name} filled with data: ${data}`, async () => {
            const frameCount = 1;
            if (frameCount > 0) {
                await this.page.frameLocator(".designer-client-frame").locator(locator).clear();
                await this.page.frameLocator(".designer-client-frame").locator(locator).fill(data);
                await this.page.keyboard.press("Enter");
            } else {
                await this.page.locator(locator).clear();
                await this.page.locator(locator).fill(data);
                await this.page.keyboard.press("Enter");
            }
        });
    }

    /*
    This function clicks on the given element textbox
    @page: The page object to be passed
    @locator: The element locator
    @name: Name of the element
    */
    async click(locator: string, name: string, type: string) {
        await test.step(`The ${type} ${name} clicked`, async () => {
            const frameCount = 1; //await this.page.locator(".designer-client-frame").count();
            if (frameCount > 0) {
                await this.page.frameLocator(".designer-client-frame").locator(locator).nth(0).click();
            } else {
                await this.page.locator(locator).click();
            }
        });
    }

    async storeState(path: string) {
        await this.page.context().storageState({ path: path })
    }

    async loadApp(url: string) {
        try {
            await test.step(`The URL ${url} loaded`, async () => {
                await this.page.goto(url, { timeout: 60000 }); // Increased timeout
            });
        } catch (error) {
            console.error('Error loading the page:', error);
        }
    }

    async verifyMatches(expectedCount: Number, actualCount: Number) {
        await test.step(`The actual count ${actualCount} vs expected count ${expectedCount}.`, async () => {
            expect(expectedCount).toBe(actualCount);
        });
    }

    async getCount(locator: string): Promise<number> {
        await this.page.waitForTimeout(2000);
        const stockCount = await this.page.frameLocator(".designer-client-frame").locator(locator).count();
        return stockCount;
    }

    async getInnerText(locator: string): Promise<string>{
       return await this.page.frameLocator(".designer-client-frame").locator(locator).innerText();
    }

    async getText(locator: string): Promise<string>{
        return await this.page.frameLocator(".designer-client-frame").locator(locator).inputValue();
     }
}