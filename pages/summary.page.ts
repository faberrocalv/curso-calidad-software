import { expect, Locator, Page } from '@playwright/test';


export class SummaryPage {
    private productName: Locator;
    private productOneQuantity: Locator;
    private productTwoQuantity: Locator;
    private orderFormData: any;
    private emptyCartMessage: Locator;

    constructor(private page: Page) {
        this.productName = this.page.locator('//div[@data-molecule-product-detail-name]/span');
        this.productOneQuantity = this.page.locator('//span[@data-molecule-quantity-und-value]').nth(0);
        this.productTwoQuantity = this.page.locator('//span[@data-molecule-quantity-und-value]').nth(1);
        this.emptyCartMessage = this.page.locator('//h1[@class="exito-checkout-io-0-x-emptyCartPageTitle"]');
    }

    async expectProductName(expectedName: string) {
        await expect(this.productName).toHaveText(expectedName, { useInnerText: true });
    }

    async expectProductOneQuantity(expectedQuantity: string) {
        await expect(this.productOneQuantity).toHaveText(expectedQuantity, { useInnerText: true });
    }

    async expectProductTwoQuantity(expectedQuantity: string) {
        await expect(this.productTwoQuantity).toHaveText(expectedQuantity, { useInnerText: true });
    }

    /**
     * Retrieves the orderForm data from the browser's sessionStorage.
     * It evaluates a script in the page context to get all sessionStorage data,
     * then specifically extracts and parses the 'Checkout_IO-OrderForm' item.
     * The 'items' array from this order form is stored in the `OrderForm` property.
     * If the 'Checkout_IO-OrderForm' is not found, an error is logged to the console.
     */
    async getOrderForm() {
        // Evaluate a script in the page's context to get the stringified sessionStorage
        const sessionStorageData = await this.page.evaluate(() => JSON.stringify(sessionStorage));
        // Parse the stringified sessionStorage data
        const storageSession = JSON.parse(sessionStorageData);
        // Access the 'Checkout_IO-OrderForm' property from the parsed sessionStorage and parse its JSON content
        const orderForm = JSON.parse(storageSession['Checkout_IO-OrderForm']);

        // If the orderForm item is not found in sessionStorage, log an error and return
        if (!orderForm) {
            console.error('OrderForm not found in sessionStorage');
            return;
        }
        // Store the 'items' array from the orderForm in the class property
        this.orderFormData = orderForm.items;
    }

    async expectProductNameInOrderForm(expectedName: string) {
        const productName = this.orderFormData[0].name;
        await expect(productName).toEqual(expectedName);
    }

    async expectProductQuantityInOrderForm(expectedQuantity: string) {
        const productQuantity = this.orderFormData[0].quantity;
        await expect(productQuantity.toString()).toEqual(expectedQuantity);
    }

    async expectOrderFormLength(expectedLength: number) {
        const orderFormLength = this.orderFormData.length;
        await expect(orderFormLength).toEqual(expectedLength);
    }

    async expectEmptyCartMessage(expectedMessage: string) {
        await expect(this.emptyCartMessage).toHaveText(expectedMessage, { useInnerText: true });
    }
};