import { Locator, Page } from '@playwright/test';


export class PDPPage {
    private addToCartButton: Locator;
    private withoutWarrantyButton: Locator;
    private goToCartButton: Locator;
    private buyNowButton: Locator;
    private addOneMoreUnitButton: Locator;
    private goToMiniCartButton: Locator;
    private acceptCookiesButton: Locator;
    private goToPayButton: Locator;

    constructor(private page: Page) {
        this.addToCartButton = this.page.locator('//div[@data-fs-container-buybutton]//span[contains(text(),"Agregar")]//parent::button');
        this.withoutWarrantyButton = this.page.locator('//button/label[@for="modalUI_empty"]');
        this.goToCartButton = this.page.locator('//button/span[contains(text(),"Ir al carrito")]');
        this.buyNowButton = this.page.getByRole('button', { name: 'Comprar Ahora' });
        this.addOneMoreUnitButton = this.page.locator('//*[@id="container-buybutton"]/div[1]/button[2]');
        this.goToMiniCartButton = this.page.getByTestId('cart-toggle');
        this.acceptCookiesButton = this.page.getByRole('button', { name: 'Acepto' });
        this.goToPayButton = this.page.getByRole('button', { name: 'Ver carrito/ Ir a pagar' });
    }

    goToPDP(productLink: string) {
        return this.page.goto(productLink);
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async selectWithoutWarranty() {
        await this.page.waitForTimeout(5000); // Esperar a que el botón esté habilitado
        await this.withoutWarrantyButton.click();
        await this.goToCartButton.click();
    }

    async refreshPage() {
        await this.page.reload();
    }

    async buyNow() {
        await this.buyNowButton.click();
    }

    async addOneMoreUnit() {
        await this.addOneMoreUnitButton.click();
    }

    /**
     * Adds multiple units of the product to the cart.
     * It clicks the 'add one more unit' button 'quantity' times.
     * Includes a timeout after each addition to allow the UI to update.
     * @param quantity The number of additional units to add.
     */
    async addMultipleUnits(quantity: number) {
        for (let i = 0; i < quantity; i++) {
            await this.addOneMoreUnit();
            // Wait for a short period to ensure the UI updates after adding a unit.
            // This helps prevent issues where clicks happen too fast for the backend or frontend to process.
            await this.page.waitForTimeout(3000);
        }
    }

    async goToMiniCart() {
        await this.goToMiniCartButton.click();
    }

    async goToPay() {
        await this.acceptCookiesButton.click();
        await this.goToPayButton.click();
    }
}
