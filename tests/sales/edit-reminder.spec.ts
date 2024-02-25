import test, { expect } from "@playwright/test";
import { HomePage } from "../../pages/home";
import { faker } from "@faker-js/faker";
import { Reminders } from "../../pages/reminders";
import { createCustomer } from "../../api/create-customer-api";
import { updateJiraIssue } from "../../utils/jira-integration";

test.describe(`Edit Reminder Using API and Confirm in Dynamics 360`, async () => {

    test.use({ storageState: "d360.json" })

    test(`Edit Reminder`, async ({ page }) => {

        // Choose the menu
        await new HomePage(page).chooseMenu("Sales", "Reminders");

        // Search the reminder
        const reminders = new Reminders(page);
        await reminders.clickSearch();
        await reminders.typeReminderNumber("1001");

        // Edit reminder
        await reminders.editReminder();

        // Click the back button(left arrow) at the top left of the popup window.
        await reminders.click("//i[@data-icon-name='Back']", "Back", "Arrow");

    })
})