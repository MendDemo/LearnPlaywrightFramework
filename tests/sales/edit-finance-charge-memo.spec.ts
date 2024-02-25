import test, { expect } from "@playwright/test";
import { HomePage } from "../../pages/home";
import { FinanceChargeMemos } from "../../pages/finance-charge-memos";

test.skip(`Create Finance Charge Memo Using API and Confirm in Dynamics 360`,async()=>{

    test.use({storageState:"d360.json" })

    test(`Search and Edit Finance Charge Memo`,async({page})=>{  

        // Choose the menu
        await new HomePage(page).chooseMenu("Sales","Finance Charge Memos");

        // Search the Finance charge memo
        const finance = new FinanceChargeMemos(page);
        await finance.clickSearch();
        await finance.typeFinanceChargeMemoNumber("1001");

        //Edit the Finance charge memo
        await finance.editFinanceChargeMemo();
   
         // Click the back button(left arrow) at the top left of the popup window.
         await finance.click("//i[@data-icon-name='Back']", "Back", "Arrow");

    })
})