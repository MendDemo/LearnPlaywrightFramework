import test, { expect } from "@playwright/test";
import { HomePage } from "../../pages/home";
import { faker } from "@faker-js/faker";
import { SalesQuotes } from "../../pages/sales-quotes";
import { createCustomer } from "../../api/create-customer-api";
import { updateJiraIssue } from "../../utils/jira-integration";
import { createSalesQuote } from "../../api/create-sales-quote-api";

test.describe(`Edit Sales Quote Using API and Confirm in Dynamics 360`, async () => {

    test.use({ storageState: "d360.json" })

    test(`Edit Sales Quote`, async ({ page }) => {

        const salesQuoteId = await createSalesQuote();
        if (salesQuoteId == 'undefined') {
            console.log("Failed to create the sales quote")
            throw Error("");
        } else {
            console.log(salesQuoteId);

            // Choose the menu
            await new HomePage(page).chooseMenu("Sales", "Sales Quotes");

            // Search the Sales Quote
            const salesQuotes = new SalesQuotes(page);
            await salesQuotes.clickSearch();
            await salesQuotes.typeSalesQuoteNumber("" + salesQuoteId);


            // Edit the Sales Quote
            await salesQuotes.editSalesQuote();
            // Click the back button(left arrow) at the top left of the popup window.
            await salesQuotes.click("//i[@data-icon-name='Back']", "Back", "Arrow");

        }
    })
})