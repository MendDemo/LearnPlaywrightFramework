import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/login";

test.skip(`Login Once - generate storage state`,async()=>{
    test(`Login to Dynamics 365`,async({browser, context, page})=>{
        const loginPage = new LoginPage(page);
        await loginPage.doLogin("radhakrishnan.rangarajan@playwrightins.onmicrosoft.com", "Signature@123");
    })
})
