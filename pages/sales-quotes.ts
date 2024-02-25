import { Page, Locator, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwright";

export class SalesQuotes extends PlaywrightWrapper {

    constructor(page: Page) {
        super(page);
    }

    public async clickNew() {
        await this.click("(//span[text()='New'])[2]","New","Button");
    }

    public async typeControl(controlname: string, data: string) {
        await this.click("[controlname=\'"+controlname+"\'] input", controlname,"Textbox");
        await this.type("[controlname=\'"+controlname+"\'] input", controlname, data);
    }

    public async clickOk() {
        await this.click("//span[text()='OK']","OK","Button");
    }

    public async getSalesQuoteNumber(): Promise<string> {
       return (await this.getInnerText("//div[@role='heading' and contains(text(),'Selangorian Ltd.')]")).substring(0,4);
    }

    public async clickSearch(){
        await this.click("//i[@data-icon-name='Search']","Search","Button");
    }

    public async typeSalesQuoteNumber(salesQuoteNumber: string) {
        await this.type("//input[@aria-label='Search Sales Quotes']","Search Sales Quotes", salesQuoteNumber);
    }

    public async assertSalesQuote(){
        const salesQuoteCount = await this.getCount(" //table[contains(@id,'BusinessGrid_')]//tbody/tr");
        await this.verifyMatches(salesQuoteCount,1);
    }

    public async editSalesQuote() {
        await this.click("//a[@title='Show more options']", "Show more options", "Button");
        await this.click("//li[@title='Open the selected row in edit mode.']", "Edit", "Button");
        await this.typeControl("External Document No.", "1217");
    }

}