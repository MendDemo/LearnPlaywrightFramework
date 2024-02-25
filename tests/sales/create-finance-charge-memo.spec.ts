import test, { expect } from "@playwright/test";
import { HomePage } from "../../pages/home";
import { FinanceChargeMemos } from "../../pages/finance-charge-memos";

test.skip(`Create New Finance Charge Memo in Dynamics 360`,async()=>{

    test.use({storageState:"d360.json" })

    test(`Create New Finance Charge Memo`,async({page})=>{  

        const home = new HomePage(page);
        await home.clickMenu("Sales");
        await home.clickSubMenu("Finance Charge Memos");

        const financeChargeMemos = new FinanceChargeMemos(page);
        await financeChargeMemos.clickNew();

        // Click and fill in the "Customer No."
        await financeChargeMemos.typeControl("Customer No.", "10000");

        // Click and fill in the "Address 2" field
        await financeChargeMemos.typeControl("Address 2", "Kingston Avenue");

        // Click the Posting header
        await financeChargeMemos.click("//span[text()='Posting']", "Posting", "Header");
    
        // Scroll down, click and fill in the "Fin. Charge Terms Code"
        await financeChargeMemos.typeControl("Fin. Charge Terms Code", "1.5 DOM.");

        // Click and fill in the "Department Code"
        await financeChargeMemos.typeControl("Shortcut Dimension 1 Code", "PROD");

        // Click and fill in the "Currency Code"
        await financeChargeMemos.typeControl("Currency Code", "AUS");

        // Get the FinanceChargeMemo number of the newly created Finance Charge Memo
        const financeChargeMemosNumber = await financeChargeMemos.getFinanceChargeMemoNumber();
        console.log(`Finance Charge Memo Number : ${financeChargeMemosNumber}`);

        // Click the back button(left arrow) at the top left of the popup window.
        await financeChargeMemos.click("//i[@data-icon-name='Back']","Back","Arrow");

        // Locate the search icon and fill in No. (Number) of the newly created Finance Charge Memo
        await financeChargeMemos.clickSearch();
        await financeChargeMemos.typeFinanceChargeMemoNumber(financeChargeMemosNumber);

        // Verify the newly created Finance Charge Memo by the matching count which must be 1.
        await financeChargeMemos.assertFinanceChargeMemo();
    })
})