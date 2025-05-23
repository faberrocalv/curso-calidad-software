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
*   `.github/workflows/`: Contiene los archivos de configuración para GitHub Actions.
    *   `playwright-tests.yml`: Configuración del pipeline de CI para pruebas de Playwright.

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

## Ejecución de Pruebas con GitHub Actions

Este proyecto incluye un pipeline de CI configurado en GitHub Actions que permite ejecutar los casos de prueba de manera automatizada. El pipeline está configurado para ejecutar cada caso de prueba en un navegador diferente, siguiendo una estrategia de matriz.

### Configuración del Pipeline

El archivo `playwright-tests.yml` define un workflow que:

- Ejecuta 6 casos de prueba (CP1 a CP6) en diferentes navegadores (chromium, firefox, webkit)
- Utiliza contenedores Docker con la imagen oficial de Playwright
- Genera y almacena reportes HTML como artefactos para cada ejecución
- Se ejecuta de manera manual a través de la interfaz de GitHub

### Cómo Ejecutar el GitHub Action Manualmente

Para ejecutar el pipeline de pruebas de Playwright manualmente:

1. Ve a la pestaña **Actions** en tu repositorio de GitHub.

2. En la lista de workflows del lado izquierdo, selecciona **Playwright Tests**.

3. Haz clic en el botón **Run workflow** que aparece a la derecha.

4. En el diálogo emergente:
   - Asegúrate de seleccionar la rama correcta desde donde quieres ejecutar las pruebas (debe ser la rama por defecto para poder realizar la ejecución manual)
   - Haz clic en el botón **Run workflow** para iniciar la ejecución

5. Una vez iniciado, podrás ver en tiempo real el progreso de la ejecución:
   - Se crearán 6 jobs independientes, uno para cada combinación de caso de prueba y navegador
   - Puedes hacer clic en cada job para ver los detalles de su ejecución
   - Cada job incluye pasos para checkout del código, instalación de dependencias, ejecución del test y guardado del reporte

6. Cuando la ejecución haya finalizado (exitosamente o con errores), podrás descargar los reportes HTML:
   - Ve a la página del workflow que acabas de ejecutar
   - En la parte inferior, encontrarás una sección llamada **Artifacts**
   - Cada artefacto estará nombrado como `playwright-report-CP{número}-{navegador}`
   - Haz clic en cualquiera de ellos para descargar el reporte HTML correspondiente

### Estructura de la Matriz

El pipeline utiliza una estrategia de matriz para distribuir la ejecución de los casos de prueba:

- CP1: WebKit
- CP2: Firefox
- CP3: Chromium
- CP4: WebKit
- CP5: Firefox
- CP6: Chromium

Esto permite ejecutar todas las pruebas en paralelo y verificar la compatibilidad con diferentes navegadores al mismo tiempo.

## Ver Reportes de Pruebas

Después de ejecutar las pruebas localmente, Playwright genera un reporte HTML. Puedes abrirlo con el siguiente comando:

```bash
npx playwright show-report
```
Esto abrirá el reporte en tu navegador por defecto, usualmente ubicado en la carpeta `playwright-report/`.

Para los reportes generados por GitHub Actions, puedes descargarlos como artefactos desde la interfaz de GitHub según se describió anteriormente.

## Debugging

Playwright ofrece varias herramientas para depurar:

*   **Playwright Inspector:**
    ```bash
    PWDEBUG=1 npx playwright test
    ```
*   **VS Code Debugger:** Configura el debugger de VS Code para Playwright.
*   **Playwright UI Mode:** Como se mencionó antes, el modo UI es excelente para depurar.

Consulta la [documentación oficial de Playwright](https://playwright.dev/docs/intro) para más detalles.
