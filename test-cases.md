# Casos de prueba para HU 1

## CP1: Verificar cantidad de producto en checkout desde PDP

*Given* el usuario está en el PDP del producto "Televisor SAMSUNG 60 pulgadas LED Uhd4K Smart TV UN60DU7000KXZL"

*When* agrega 1 unidad al carrito

*And* viaja hasta el checkout

*Then* la cantidad que se ve en el summary es igual a la que se ve en el orderForm

## CP2: Verificar carrito vacío en checkout desde PLP

*Given* el usuario está en el PLP
*And* no tiene ítems agregados al carrito

*When* viaja hasta el summary del checkout

*Then* no debe visualizarse nada en el arreglo de ítems del orderForm

## CP3: Verificar eliminación de producto desde minicart y su ausencia en checkout

*Given* el usuario está en el PLP
*And* tiene un producto en el minicart

*When* lo elimina del minicart
*And* viaja hasta el checkout

*Then* el producto no debe estar en el summary
*And* no debe estar en el arreglo de ítems en el orderForm

## CP4: Verificar adición y modificación de cantidad desde PLP y su reflejo en checkout

*Given* el usuario está en el PLP

*When* agrega el producto "Portatil HP AMD Ryzen 7 7730U RAM 16 GB 1 TB SSD 15fc0030la" al carrito

*And* incrementa la cantidad de dicho producto a "2" desde el minicart
*And* viaja hasta el checkout

*Then* el nombre del producto "Portatil HP AMD Ryzen 7 7730U RAM 16 GB 1 TB SSD 15fc0030la" se visualiza en el orderForm
*And* la cantidad del producto "2" se visualiza en el orderForm

## CP5: Verificar persistencia de producto agregado desde PDP y su reflejo en checkout

*Given* el usuario está en el PDP del producto "Consola PS5 Slim de Disco 1 TB Blanca"

*When* agrega el producto al carrito
*And* refresca la página
*And* hace clic en "Comprar ahora"
*And* viaja hasta el checkout

*Then* el nombre del producto "Consola PS5 Slim de Disco 1 TB Blanca" se visualiza en el orderForm
*And* la cantidad del producto "1" se visualiza en el orderForm

## CP6: Verificar adición de múltiples unidades de dos productos diferentes y su reflejo en checkout

*Given* el usuario está en el PDP del producto "Audifonos Inalambricos JBL Tune 520BT"

*When* agrega 1 unidad del producto al carrito
*And* adiciona 1 unidad más del mismo producto
*And* navega al PDP del producto "PS5 Grand Theft Auto V Latam PLAYSTATION SIN REF"
*And* agrega 1 unidad de este segundo producto al carrito
*And* adiciona 1 unidad más de este segundo producto
*And* viaja al checkout desde el minicart

*Then* la cantidad del primer producto en el summary es "2"
*And* la cantidad del segundo producto en el summary es "2"