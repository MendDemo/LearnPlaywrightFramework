import { Page, Locator, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwright";

export class ItemCharges extends PlaywrightWrapper {

    constructor(page: Page) {
        super(page);
    }

    public async clickNew() {
        await this.click("(//span[text()='New'])[2]","New","Button");
    }

    public async typeControl(controlname: string, data: string) {
        await this.click("(//td[@controlname='"+controlname+"'])[2]", controlname,"Textbox");
        await this.type("(//td[@controlname=\'"+controlname+"\'])[2]/input", controlname, data);
    }

    public async clickSearch(){
        await this.click("//i[@data-icon-name='Search']","Search","Button");
    }

    public async typeStock(stockName: string){
        await this.type("//input[@aria-label='Search Item Charges']","Search Item Charges", stockName);
    }

    public async assertStock(){
        const stockCount = await this.getCount(" //table[contains(@id,'BusinessGrid_')]//tbody/tr");
        await this.verifyMatches(stockCount,1);
    }

    public async editItemCharges(){
        await this.click("button[title='Make changes on the page.']","Edit List","Button")
        await this.typeControl("Description","Out of stock");
        await this.typeControl("Gen. Prod. Posting Group","SERVICES");
    }
}