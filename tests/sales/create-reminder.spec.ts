import test, { expect } from "@playwright/test";
import { HomePage } from "../../pages/home";
import { Reminders } from "../../pages/reminders";

test.describe(`Create New Reminder in Dynamics 360`,async()=>{

    test.use({storageState:"d360.json" })

    test(`Create New Reminder`,async({page})=>{  

        const home = new HomePage(page);
        await home.clickMenu("Sales");
        await home.clickSubMenu("Reminders");

        const reminders = new Reminders(page);
        await reminders.clickNew();

        // Click and fill in the "Customer No."
        await reminders.typeControl("Customer No.", "50000");
    
        // Click the Posting header
        await reminders.click("//span[text()='Posting']", "Posting", "Header");

        // Click and fill in the "Reminder Terms Code" field
        await reminders.typeControl("Reminder Terms Code", "DOMESTIC");
    
        // Click and fill in the "Reminder Terms Code" field
        await reminders.typeControl("Company Bank Account Code", "NBL");
    
        // Click and fill in the "Reminder Terms Code" field
        await reminders.typeControl("Fin. Charge Terms Code", "1.5 DOM.");
    
        // Click and fill in the "Reminder Terms Code" field
        await reminders.typeControl("Shortcut Dimension 1 Code", "PROD");

        // Get the Reminder number of the newly created Reminder
        const reminderNumber = await reminders.getReminderNumber();
        console.log(`Reminder Number : ${reminderNumber}`);

        // Click the back button(left arrow) at the top left of the popup window.
        await reminders.click("//i[@data-icon-name='Back']","Back","Arrow");

        // Locate the search icon and fill in No. (Number) of the newly created Reminder
        await reminders.clickSearch();
        await reminders.typeReminderNumber(reminderNumber);

    })
})