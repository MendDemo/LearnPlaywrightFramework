import { Page, Locator } from "@playwright/test";
import { PlaywrightWrapper } from "../utils/playwright";
import { URLConstants } from "../constants/urlConstants";

export class HomePage extends PlaywrightWrapper {

    static pageUrl = URLConstants.homeURL;
    constructor(page: Page) {
        super(page);
        this.init();
    }

    public async init() {
        await this.loadApp(HomePage.pageUrl);
    }

    public async clickMenu(menuName: string) {
        await this.click("(//span[@aria-label=\'"+menuName+"\'])[2]", menuName,"Menu");
    }

    public async clickSubMenu(menuName: string) {
        await this.click("//span[text()=\'"+menuName+"\']", menuName,"Sub Menu");
    }
    

    public async chooseMenu(menuName: string, subMenu: string){
        await this.clickMenu(menuName);
        await this.clickSubMenu(subMenu);
    }

}