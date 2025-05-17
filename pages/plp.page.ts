import { Locator, Page, expect } from '@playwright/test';


export class PLPPage {
    private initialModalButton: Locator;
    private goToMiniCartButton: Locator;
    private emptyMiniCartMessage: Locator;
    private acceptCookiesButton: Locator;
    private goToPayButton: Locator;
    private addToCartButton: Locator;
    private deleteFromMiniCartButton: Locator;
    private miniCartAddOneMoreUnitButton: Locator;

    constructor(private page: Page) {
        this.initialModalButton = this.page.getByTestId('store-modal').getByTestId('store-button');
        this.goToMiniCartButton = this.page.getByTestId('cart-toggle');
        this.emptyMiniCartMessage = this.page.locator('//p[@data-fs-no-items="true"]');
        this.acceptCookiesButton = this.page.getByRole('button', { name: 'Acepto' });
        this.goToPayButton = this.page.getByRole('button', { name: 'Ver carrito/ Ir a pagar' });
        this.addToCartButton = this.page.locator('//article[contains(@class, "productCard_productCard")]//button[span[text()="Agregar"]]').nth(1);
        this.deleteFromMiniCartButton = this.page.locator('//div[@data-fs-content-button="true"]//button[1]');
        this.miniCartAddOneMoreUnitButton = this.page.locator('//div[@data-fs-content-button="true"]//button[2]');
    }

    goToPLP(plpLink: string) {
        return this.page.goto(plpLink);
    }

    async closeInitialModal() {
        if (await this.initialModalButton.isVisible()) {
            await this.initialModalButton.click();
        }
    }

    async goToMiniCart() {
        await this.goToMiniCartButton.click();
    }

    async expectEmptyMiniCartMessage(expectedMessage: string) {
        await this.page.waitForTimeout(5000);
        await expect(this.emptyMiniCartMessage).toHaveText(expectedMessage, { useInnerText: true });
    }

    async goToPay() {
        await this.acceptCookiesButton.click();
        await this.goToPayButton.click();
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async deleteFromMiniCart() {
        await this.deleteFromMiniCartButton.click();
    }

    async addOneMoreUnit() {
        await this.miniCartAddOneMoreUnitButton.click();
    }

}
