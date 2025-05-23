import { test } from '@playwright/test';
import { PDPPage } from '../pages/pdp.page';
import { SummaryPage } from '../pages/summary.page';
import { PLPPage } from '../pages/plp.page';

test.describe('Ejercicio práctico # 1', () => {
    let pdpPage: PDPPage;
    let summaryPage: SummaryPage;
    let plpPage: PLPPage;

    // Hook to run before each test case
    test.beforeEach(async ({ page }) => {
        // Initialize Page Object Models
        pdpPage = new PDPPage(page);
        summaryPage = new SummaryPage(page);
        plpPage = new PLPPage(page);
    });

    test('CP1', async ({ page }) => {
        test.slow(); // Mark the test as slow
        // Define test data
        const productLink = 'https://www.exito.com/televisor-samsung-60-pulgadas-led-uhd-4k-smart-tv-un60du7000kxzl-3179356/p';
        const selectedProductName = 'Televisor SAMSUNG 60 pulgadas LED Uhd4K Smart TV UN60DU7000KXZL';
        const selectedProductQuantity = '1';

        // Navigate to Product Detail Page (PDP)
        await pdpPage.goToPDP(productLink);
        // Add product to cart
        await pdpPage.addToCart();
        // Select warranty option (without warranty)
        await pdpPage.selectWithoutWarranty();
        await page.waitForTimeout(5000); // Wait for product to be added to cart
        // Assertions on Summary Page
        await summaryPage.expectProductName(selectedProductName);
        await summaryPage.expectProductOneQuantity(selectedProductQuantity);
        // Get orderForm details
        await summaryPage.getOrderForm();
        // Assertions on orderForm
        await summaryPage.expectProductNameInOrderForm(selectedProductName);
        await summaryPage.expectProductQuantityInOrderForm(selectedProductQuantity);
    });

    test('CP2', async ({ page }) => {
        test.slow(); // Mark the test as slow
        // Define test data
        const plpLink = 'https://www.exito.com/tecnologia/computadores';
        const emptyMiniCartMessage = 'No tienes productos en tu carrito';
        const emptyCartMessageSummary = 'Tu carrito está vacío';
        const orderFormLength = 0;

        // Navigate to Product Listing Page (PLP)
        await plpPage.goToPLP(plpLink);
        await page.waitForTimeout(5000); // Wait for page to load completely
        // Close initial modal if present
        await plpPage.closeInitialModal();
        // Go to mini cart
        await plpPage.goToMiniCart();
        // Assert empty mini cart message
        await plpPage.expectEmptyMiniCartMessage(emptyMiniCartMessage);
        // Proceed to pay
        await plpPage.goToPay();
        await page.waitForTimeout(5000); // Wait for page to load completely
        // Assert empty cart message on Summary Page
        await summaryPage.expectEmptyCartMessage(emptyCartMessageSummary);
        // Get orderForm details
        await summaryPage.getOrderForm();
        // Assert orderForm length
        await summaryPage.expectOrderFormLength(orderFormLength);
    });

    test('CP3', async ({ page }) => {
        test.slow(); // Mark the test as slow
        // Define test data
        const plpLink = 'https://www.exito.com/tecnologia/computadores';
        const emptyMiniCartMessage = 'No tienes productos en tu carrito';
        const emptyCartMessageSummary = 'Tu carrito está vacío';
        const orderFormLength = 0;

        // Navigate to PLP
        await plpPage.goToPLP(plpLink);
        await page.waitForTimeout(5000); // Wait for page to load completely
        // Close initial modal if present
        await plpPage.closeInitialModal();
        // Add a product to cart
        await plpPage.addToCart();
        await page.waitForTimeout(5000); // Wait for product to be added
        // Go to mini cart
        await plpPage.goToMiniCart();
        // Delete product from mini cart
        await plpPage.deleteFromMiniCart();
        await page.waitForTimeout(5000); // Wait for product to be deleted
        // Assert empty mini cart message
        await plpPage.expectEmptyMiniCartMessage(emptyMiniCartMessage);
        // Proceed to pay
        await plpPage.goToPay();
        await page.waitForTimeout(5000); // Wait for page to load completely
        // Assert empty cart message on Summary Page
        await summaryPage.expectEmptyCartMessage(emptyCartMessageSummary);
        // Get orderForm details
        await summaryPage.getOrderForm();
        // Assert orderForm length
        await summaryPage.expectOrderFormLength(orderFormLength);
    });

    test('CP4', async ({ page }) => {
        test.slow(); // Mark the test as slow
        // Define test data
        const plpLink = 'https://www.exito.com/tecnologia/computadores';
        const selectedProductName = 'Portatil ASUS Vivobook 16 Intel Core i5 12500H RAM 16 GB 1 TB SSD X1605ZAMB712W';
        const selectedProductQuantity = '2';

        // Navigate to PLP
        await plpPage.goToPLP(plpLink);
        await page.waitForTimeout(5000); // Wait for page to load completely
        // Close initial modal if present
        await plpPage.closeInitialModal();
        // Add a product to cart
        await plpPage.addToCart();
        await page.waitForTimeout(5000); // Wait for product to be added
        // Go to mini cart
        await plpPage.goToMiniCart();
        // Add one more unit of the product
        await plpPage.addOneMoreUnit();
        // Proceed to pay
        await plpPage.goToPay();
        await page.waitForTimeout(5000); // Wait for page to load completely
        // Get orderForm details
        await summaryPage.getOrderForm();
        // Assertions on orderForm
        await summaryPage.expectProductNameInOrderForm(selectedProductName);
        await summaryPage.expectProductQuantityInOrderForm(selectedProductQuantity);
    });

    test('CP5', async ({ page }) => {
        test.slow(); // Mark the test as slow
        // Define test data
        const productLink = 'https://www.exito.com/consola-ps5-slim-1tb-lector-de-disco-blanca-102853788/p';
        const selectedProductName = 'Consola PS5 Slim de Disco 1 TB Blanca';
        const selectedProductQuantity = '1';

        // Navigate to PDP
        await pdpPage.goToPDP(productLink);
        // Add product to cart
        await pdpPage.addToCart();
        await page.waitForTimeout(5000); // Wait for product to be added to cart
        // Refresh the page
        await pdpPage.refreshPage();
        // Click on Buy Now button
        await pdpPage.buyNow();
        await page.waitForTimeout(5000); // Wait for navigation/processing
        // Get orderForm details
        await summaryPage.getOrderForm();
        // Assertions on orderForm
        await summaryPage.expectProductNameInOrderForm(selectedProductName);
        await summaryPage.expectProductQuantityInOrderForm(selectedProductQuantity);
    });

    test('CP6', async ({ page }) => {
        test.slow(); // Mark the test as slow
        // Define test data for two products
        const productLink_1 = 'https://www.exito.com/audifonos-inalambricos-jbl-tune-520bt-102786008-mp/p';
        const productLink_2 = 'https://www.exito.com/juego-juego-fisico-ps5-ps5-ea-sports-fc-25-3186664/p';
        const additionalUnits = 1; // Number of additional units to add for each product
        const expectedTotalQuantity = additionalUnits + 1; // Expected total quantity for each product

        // --- Product 1 ---
        // Navigate to PDP of product 1
        await pdpPage.goToPDP(productLink_1);
        // Add product 1 to cart
        await pdpPage.addToCart();
        // Add additional units of product 1
        await pdpPage.addMultipleUnits(additionalUnits);

        await page.waitForTimeout(5000); // Wait for operations to complete

        // --- Product 2 ---
        // Navigate to PDP of product 2
        await pdpPage.goToPDP(productLink_2);
        // Add product 2 to cart
        await pdpPage.addToCart();
        // Add additional units of product 2
        await pdpPage.addMultipleUnits(additionalUnits);

        await page.waitForTimeout(5000); // Wait for operations to complete

        // --- Checkout ---
        // Go to mini cart
        await pdpPage.goToMiniCart();
        // Proceed to pay
        await pdpPage.goToPay();

        await page.waitForTimeout(5000); // Wait for product to be added to cart and navigate to summary
        // Assertions on Summary Page for quantities of both products
        await summaryPage.expectProductOneQuantity(expectedTotalQuantity.toString());
        await summaryPage.expectProductTwoQuantity(expectedTotalQuantity.toString());

    });
});