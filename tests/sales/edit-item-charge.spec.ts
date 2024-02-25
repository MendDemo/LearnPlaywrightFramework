import test, { expect } from "@playwright/test";
import { HomePage } from "../../pages/home";
import { ItemCharges } from "../../pages/item-charges";
import { faker } from "@faker-js/faker";

test.skip(`Create Item Charge Using API and Confirm in Dynamics 360`,async()=>{

    test.use({storageState:"d360.json" })
    
    test(`Search and Edit Item Charge`,async({page})=>{  

        // Choose the menu
        await new HomePage(page).chooseMenu("Sales","Item Charges");

        // Search the Item charge
        const item = new ItemCharges(page);
        await item.clickSearch();
        await item.typeStock("1001");

        //Edit the Item charge
        await item.editItemCharges();

         // Click the back button(left arrow) at the top left of the popup window.
         await item.click("//i[@data-icon-name='Back']", "Back", "Arrow");

    })
})