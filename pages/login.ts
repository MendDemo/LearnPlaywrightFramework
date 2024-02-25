import { Page, Locator } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwright";
import { URLConstants } from "../constants/urlConstants";

export class LoginPage extends PlaywrightWrapper {

    static pageUrl = URLConstants.baseURL;
    constructor(page: Page) {
        super(page);
        this.loadApp(LoginPage.pageUrl);
    }

    public async doLogin(username: string, password: string) {
        await this.type("//input[@name='loginfmt']","Email",username);
        await this.click("//input[@data-report-event='Signin_Submit']","Email Submit","Button");
        await this.page.waitForTimeout(2000);

        await this.type("//input[@name='passwd']","Password",password);
        await this.click("//input[@data-report-event='Signin_Submit']","Submit","Button");
        await this.click("//input[@data-report-event='Signin_Submit']","Submit","Button");
        await this.page.waitForTimeout(25000);
        // if condition to check if this need to be stored !
        await this.storeState("d360.json");
    }

}