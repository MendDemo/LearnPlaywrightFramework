import test, { expect } from "@playwright/test";
import { HomePage } from "../../pages/home";
import { faker } from "@faker-js/faker";
import { Customers } from "../../pages/customers";

test.describe(`Create New Customer in Dynamics 360`,async()=>{

    test.use({storageState:"d360.json" })
    const cName = faker.company.name();
    const address = faker.location.streetAddress();
    const email = faker.internet.email();
    const name = faker.person.firstName();
    const vaTReg = faker.commerce.isbn(10);
    

    test(`Create Customer`,async({page})=>{  
        await new HomePage(page).chooseMenu("Sales","Customers");

        const customers = new Customers(page);
        await customers.clickNew();
        await customers.clickOk();
        const customerNo = await customers.getCustomerNumber();
        await customers.typeControl("Name",cName);
        await customers.typeControl("Credit Limit (LCY)","300000");
        await customers.typeControl("Address",address);
        await customers.typeControl("Phone No.","9477377829");
        await customers.typeControl("E-Mail",email);
        await customers.chooseContactName();
        await customers.typeName(name);
        await customers.clicBackArrow();
        await customers.clickOk();
        await customers.clickInvoicing();
        await customers.typeControl("VAT Registration No.", vaTReg );
        await customers.customerPosting();
        await customers.customerPrice();
        await customers.customerDisc();
        await customers.payment();
        await customers.clickShipping();
        await customers.shipToCode();
        await customers.typeControl("Code","01456");
        await customers.clickOk();
        await customers.typeControl("Location Code","MAIN");
        await customers.click("//i[@data-icon-name='Back']","Back","Arrow");
        await customers.clickSearch();
        await customers.typeCustomer(cName);
        //await customers.assertCustomer();
    })
})