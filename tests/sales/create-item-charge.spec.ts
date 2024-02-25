import test, { expect } from "@playwright/test";
import { HomePage } from "../../pages/home";
import { ItemCharges } from "../../pages/item-charges";
import { faker } from "@faker-js/faker";
test.describe(`Create Item Charge in Dynamics 360`,async()=>{

    test.use({storageState:"d360.json" })
    const accountName = faker.commerce.productName();
    const length =  accountName.length>10?10:accountName.length;
    const stockNo = accountName.substring(0,length);
    
    test(`Create Item Charge`,async({page})=>{  

        await new HomePage(page).chooseMenu("Sales","Item Charges");
        const itemCharges = new ItemCharges(page);
        await itemCharges.clickNew();
        await itemCharges.typeControl("No.",stockNo);
        await itemCharges.typeControl("Description","New Stocks at Market");
        await itemCharges.typeControl("Gen. Prod. Posting Group","RETAIL");
        await itemCharges.typeControl("VAT Prod. Posting Group","REDUCED");
        await itemCharges.typeControl("Search Description",accountName);
        await itemCharges.click("//i[@data-icon-name='Back']","Back","Arrow");
        await itemCharges.clickSearch();
        await itemCharges.typeStock(stockNo);
        await itemCharges.assertStock();
    })
})