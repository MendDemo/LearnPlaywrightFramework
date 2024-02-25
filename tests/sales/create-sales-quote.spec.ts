import test, { expect } from "@playwright/test";
import { HomePage } from "../../pages/home";
import { SalesQuotes } from "../../pages/sales-quotes";

test.describe(`Create New Sales Quote in Dynamics 360`,async()=>{

    test.use({storageState:"d360.json" })

    test(`Create New Sales Quote`,async({page})=>{  

        const home = new HomePage(page);
        await home.clickMenu("Sales");
        await home.clickSubMenu("Sales Quotes");

        const salesQuotes = new SalesQuotes(page);
        await salesQuotes.clickNew();

        // Click and fill in the "Customer Name"
        await salesQuotes.typeControl("Sell-to Customer Name", "Selangorian Ltd.");

        // Click and fill in the "External Document No."
        await salesQuotes.typeControl("External Document No.", "1007");

        // Click and fill in the "Description"
        await salesQuotes.typeControl("Description", "1003");

        // Get the SalesQuote number of the newly created Sales Quote
        const salesQuoteNumber = await salesQuotes.getSalesQuoteNumber();
        console.log(`Sales Quote Number : ${salesQuoteNumber}`);

        // Click the back button(left arrow) at the top left of the popup window.
        await salesQuotes.click("//i[@data-icon-name='Back']","Back","Arrow");

        // Locate the search icon and fill in No. (Number) of the newly created Sales Quote
        await salesQuotes.clickSearch();
        await salesQuotes.typeSalesQuoteNumber(salesQuoteNumber);

    })
})