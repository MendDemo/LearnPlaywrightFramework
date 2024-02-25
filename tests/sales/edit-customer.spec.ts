import test, { expect } from "@playwright/test";
import { HomePage } from "../../pages/home";
import { faker } from "@faker-js/faker";
import { Customers } from "../../pages/customers";
import { createCustomer } from "../../api/create-customer-api";
import { updateJiraIssue } from "../../utils/jira-integration";


test.describe(`Create New Customer`, async () => {

    test.use({ storageState: "d360.json" })
    const cName = faker.company.name();


    test(`Search and Edit Customer`, async ({ page }) => {

        const companyName = await createCustomer(cName);
        if (companyName == 'undefined') {
            console.log("Failed to create the customer")
        }
        console.log(companyName);

        // Choose the menu
        await new HomePage(page).chooseMenu("Sales", "Customers");

        // Search the customer
        const customers = new Customers(page);
        await customers.clickSearch();
        await customers.typeCustomer(cName);

        //Edit the customer
        await customers.editCustomer();

        // Click the back button(left arrow) at the top left of the popup window.
        await customers.click("//i[@data-icon-name='Back']", "Back", "Arrow");

    })

    test.afterAll(async () => {
        await updateJiraIssue('D365-6', 'test-results/sales-edit-customer-Create-New-Customer-Search-and-Edit-Customer-chrome/')
    })
})