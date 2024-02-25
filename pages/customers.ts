import { Page, Locator, expect } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwright";

export class Customers extends PlaywrightWrapper {

    constructor(page: Page) {
        super(page);
    }

    public async clickNew() {
        await this.click("(//span[text()='New'])[2]","New","Button");
    }

    public async clickOk() {
        await this.click("//span[text()='OK']","OK","Button");
    }

    public async getCustomerNumber(): Promise<string>{
        return await this.getText("[controlName='No.'] input");
    }

    public async typeControl(controlname: string, data: string) {
        await this.click("[controlname=\'"+controlname+"\'] input", controlname,"Textbox");
        await this.type("[controlname=\'"+controlname+"\'] input", controlname, data);
    }

    public async typeName(data: string) {
        await this.click("a[title='Review or update the value for Name'] ~ input", "Name", "Textbox");
        await this.type("a[title='Review or update the value for Name'] ~ input", "Value" , data);
        
    }

    public async chooseContactName() {
        await this.click("//a[@aria-label='Choose a value for Contact Name']","Value" ,"Icon");
        await this.click("//div[@class='content-header']//span[@aria-label='New']","New", "Link");  

    }
    public async clicBackArrow() {
        await this.click("(//i[@data-icon-name='Back'])[2]","Back","Arrow");
    }

    public async clickInvoicing() {
        await this.click("//span[text()='Invoicing']", "Invoice", "button");
    }

    public async clickPayments() {
        await this.click("//div[@id='b1cc']//span[text()='Payments']", "Payments", "button");
    }

    public async clickShipping() {
        await this.click("//span[text()='Shipping']", "Shipping", "button");
    }

    public async customerPosting() {
        await this.typeAndEnter("[controlname='Customer Posting Group'] input", "Dropdown", "FOREIGN")
    }

    public async clickPaymentShowMore() {
        await this.click("button[aria-label='Payments, Show more']", "Show More", "Button")
    }

    public async payment() {
        await this.click("a[title='Choose a value for Payment Terms Code']", "Payment Code", "Dropdown");
        await this.click("//table//tr[@class='thm-bgcolor--palette--1726194350']//a[text()='30 DAYS']", "Value", "Link")
    }
    
    public async paymentMethod() {
        await this.click("[controlname='Payment Method Code'] input", "Payment Method", "Textbox")
        await this.typeAndEnter("[controlname='Payment Method Code'] input", "MULTIPLE", "Dropdown")
    }

    public async clickShippingShowMore() {
        await this.click("button[aria-label='Shipping, Show more']", "Show More", "Button")
    }

    public async shipToCode() {
        await this.click("a[title='Choose a value for Ship-to Code']", "Dropdown", "Link");
        await this.click("a[title='New']", "New", "Button");
    }

    public async customerPrice() {
        await this.typeAndEnter("a[title='Choose a value for Customer Price Group'] ~ input", "Textbox", "1289");
    }
    public async customerDisc() {
        await this.typeAndEnter("a[title='Choose a value for Customer Disc. Group'] ~ input ", "Textbox", "RETAIL");
    }

    public async clickSearch(){
        await this.click("//i[@data-icon-name='Search']","Search","Button");
    }

    public async typeCustomer(customerName: string){
        await this.type("//input[@aria-label='Search Customers']","Search Customers", customerName);
    }

    public async assertCustomer(){
        const customerCount = await this.getCount(" //table[contains(@id,'BusinessGrid_')]//tbody/tr");
        await this.verifyMatches(customerCount,1);
    }

    public async editCustomer() {

        await this.click("a[title='Show more options']", "Show More", "Button");
        await this.click("li[title='Open the selected row in edit mode.']", "Edit", "Link");
        await this.typeControl("Address", "11, Downtown Lane");
        await this.typeControl("E-Mail", "robin@gmail.com");
    }
}