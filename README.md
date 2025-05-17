# Proyecto de Automatización de Pruebas con Playwright

Este proyecto contiene pruebas automatizadas para una aplicación web utilizando Playwright con TypeScript.

## Prerrequisitos

Asegúrate de tener instalado lo siguiente:

*   [Node.js](https://nodejs.org/) (que incluye npm)
*   Navegadores web para Playwright (se pueden instalar con el comando de Playwright)

## Instalación

1.  **Clona el repositorio (si aplica):**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd <NOMBRE_DEL_DIRECTORIO_DEL_PROYECTO>
    ```

2.  **Instala las dependencias del proyecto:**
    Abre una terminal en la raíz del proyecto y ejecuta:
    ```bash
    npm install
    ```
    o si usas yarn:
    ```bash
    yarn install
    ```

3.  **Instala los navegadores de Playwright:**
    Playwright necesita que los navegadores (Chromium, Firefox, WebKit) estén instalados. Ejecuta el siguiente comando para instalarlos:
    ```bash
    npx playwright install
    ```
    Si solo necesitas un navegador específico, puedes añadir `--with-deps` para instalar también las dependencias del sistema operativo si es necesario (especialmente en CI o Linux):
    ```bash
    npx playwright install --with-deps chromium
    ```

## Estructura del Proyecto

*   `pages/`: Contiene las clases del Page Object Model (POM). Cada archivo `.page.ts` representa una página de la aplicación y encapsula los localizadores de elementos y los métodos para interactuar con dicha página.
    *   `pdp.page.ts`: Page Object para la Página de Detalles del Producto.
    *   `plp.page.ts`: Page Object para la Página de Listado de Productos.
    *   `summary.page.ts`: Page Object para la Página de Resumen del Carrito/Compra.
*   `tests/`: Contiene los archivos de especificación de pruebas (`.spec.ts`). Aquí se definen los casos de prueba utilizando los Page Objects.
    *   `ejercicio_practico.spec.ts`: Ejemplo de un archivo de pruebas.
*   `playwright.config.ts`: Archivo de configuración global para Playwright, donde se definen opciones como el navegador por defecto, timeouts, reporters, etc.
*   `package.json`: Define las dependencias del proyecto y los scripts de npm.
*   `playwright-report/`: Directorio donde se generan los reportes HTML de las ejecuciones de pruebas.
*   `test-results/`: Directorio donde Playwright guarda los resultados de las pruebas, como trazas y capturas de pantalla en caso de fallo.

## Ejecución de Pruebas

Puedes ejecutar las pruebas de Playwright utilizando los siguientes comandos desde la raíz del proyecto:

1.  **Ejecutar las pruebas del ejercicio práctico:**
    Para ejecutar específicamente los casos de prueba definidos en `ejercicio_practico.spec.ts`:
    ```bash
    npx playwright test tests/ejercicio_practico.spec.ts
    ```

2.  **Ejecutar todas las pruebas:**
    ```bash
    npx playwright test
    ```

3.  **Ejecutar un archivo de pruebas específico:**
    ```bash
    npx playwright test tests/nombre_del_archivo.spec.ts
    ```

4.  **Ejecutar pruebas en un navegador específico:**
    Puedes especificar el navegador usando la opción `--project`. Los proyectos suelen estar definidos en `playwright.config.ts` (por ejemplo, `chromium`, `firefox`, `webkit`).
    ```bash
    npx playwright test --project=chromium
    ```
    Para el ejercicio práctico en un navegador específico:
    ```bash
    npx playwright test tests/ejercicio_practico.spec.ts --project=chromium
    ```

5.  **Ejecutar pruebas en modo "headed" (con navegador visible):**
    Esto es útil para depurar y ver la ejecución en tiempo real.
    ```bash
    npx playwright test --headed
    ```
    Para el ejercicio práctico en modo "headed":
    ```bash
    npx playwright test tests/ejercicio_practico.spec.ts --headed
    ```

6.  **Ejecutar pruebas con la UI de Playwright (Playwright UI Mode):**
    Proporciona una interfaz gráfica para ejecutar, ver y depurar pruebas.
    ```bash
    npx playwright test --ui
    ```
    Para el ejercicio práctico con la UI de Playwright:
    ```bash
    npx playwright test tests/ejercicio_practico.spec.ts --ui
    ```

7.  **Ejecutar un test específico dentro de un archivo (por título):**
    Usa la opción `-g` (grep) para filtrar tests por su título.
    ```bash
    npx playwright test tests/ejercicio_practico.spec.ts -g "Título del test específico"
    ```

## Ver Reportes de Pruebas

Después de ejecutar las pruebas, Playwright genera un reporte HTML. Puedes abrirlo con el siguiente comando:

```bash
npx playwright show-report
```
Esto abrirá el reporte en tu navegador por defecto, usualmente ubicado en la carpeta `playwright-report/`.

## Debugging

Playwright ofrece varias herramientas para depurar:

*   **Playwright Inspector:**
    ```bash
    PWDEBUG=1 npx playwright test
    ```
*   **VS Code Debugger:** Configura el debugger de VS Code para Playwright.
*   **Playwright UI Mode:** Como se mencionó antes, el modo UI es excelente para depurar.

Consulta la [documentación oficial de Playwright](https://playwright.dev/docs/intro) para más detalles.
