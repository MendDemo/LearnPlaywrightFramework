import { Page, Locator, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwright";

export class FinanceChargeMemos extends PlaywrightWrapper {

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

    public async getFinanceChargeMemoNumber(): Promise<string> {
       return (await this.getInnerText("//div[@role='heading' and contains(text(),'The Cannon Group PLC')]")).substring(0,4);
    }

    public async clickSearch(){
        await this.click("//i[@data-icon-name='Search']","Search","Button");
    }

    public async typeFinanceChargeMemoNumber(financeChargeMemoNumber: string) {
        await this.type("//input[@aria-label='Search Finance Charge Memos']","Search Finance Charge Memos", financeChargeMemoNumber);
    }

    public async assertFinanceChargeMemo(){
        const financeChargeMemoCount = await this.getCount(" //table[contains(@id,'BusinessGrid_')]//tbody/tr");
        await this.verifyMatches(financeChargeMemoCount,1);
    }

    public async editFinanceChargeMemo() {

        await this.click("a[title='Show more options']", "Show More", "Button");
        await this.click("li[title='Open the selected row in edit mode.']", "Edit", "Link");
        await this.typeControl("Address", "11, Taylor Brown Lane");
        await this.typeControl("Address 2", "Bridgetown");
    }
}