# Plan de Backups para el proyecto de API Express con PostgreSQL 
## 1. Objetivo 

Establecer un procedimiento para proteger la información almacenada en la base de datos PostgreSQL utilizada por la API y permitir su recuperación ante errores, pérdida de información o fallos de infraestructura.
---
## 2. Información respaldada

Se respaldará la información almacenada en la base de datos PostgreSQL de la aplicación, incluyendo principalmente:

- Tabla "productos".
- Registros de productos.
- Estructura de las tablas y sus relaciones.
- Esquema de la base de datos necesario para restaurar la aplicación.

No se almacenarán contraseñas, archivos ".env" ni credenciales dentro de los respaldos del código fuente.
--- 

## 3. Frecuencia de los respaldos

Se establece la siguiente política:

- Backup automático: utilizar los mecanismos de respaldo disponibles en el proveedor de PostgreSQL/Neon.
- Backup lógico adicional: realizar una copia de la base de datos de forma periódica, como mínimo una vez por semana.
- Antes de cambios importantes: realizar un respaldo antes de modificaciones importantes de la estructura de la base de datos.

## 4. Lugar de almacenamiento

Los respaldos deberán mantenerse fuera del entorno de ejecución de la API.

Se utilizará el almacenamiento proporcionado por el proveedor de base de datos para los respaldos automáticos y un almacenamiento externo seguro para las copias lógicas adicionales.

Los archivos de respaldo no deberán publicarse en GitHub ni incluirse dentro del repositorio público.

## 5. Procedimiento de recuperación

En caso de pérdida o corrupción de información:

1. Identificar el problema y detener temporalmente las operaciones que puedan modificar la información afectada.
2. Seleccionar el respaldo más reciente disponible.
3. Crear o seleccionar una instancia de PostgreSQL de recuperación.
4. Restaurar la estructura y los datos desde el respaldo.
5. Verificar que la tabla "productos" y sus registros estén disponibles.
6. Actualizar la configuración de conexión de la aplicación mediante la variable "DATABASE_URL", si fuera necesario.
7. Ejecutar el endpoint "/health" para comprobar la conexión entre la API y PostgreSQL.
8. Probar los endpoints "/api/productos".
9. Una vez confirmada la recuperación, volver a habilitar el servicio.

## 6. Retención

Se recomienda conservar:

- Los respaldos automáticos según la política de retención disponible en el proveedor.
- Las copias lógicas semanales durante un período mínimo de 4 semanas.
- Un respaldo adicional antes de cambios importantes en la base de datos.

## 7. Seguridad

Los respaldos deberán mantenerse protegidos mediante controles de acceso adecuados.

La cadena de conexión "DATABASE_URL" y cualquier otra credencial relacionada con PostgreSQL se manejarán exclusivamente mediante variables de entorno o secretos.

Nunca se deberán publicar credenciales en GitHub, archivos ".env", documentación pública ni archivos de respaldo accesibles públicamente.

## 8. Prueba de recuperación

El procedimiento de recuperación deberá probarse periódicamente para verificar que los respaldos pueden restaurarse correctamente.

Una prueba satisfactoria deberá comprobar que:

- La base de datos puede restaurarse.
- Los registros de "productos" están disponibles.
- La API puede conectarse nuevamente a PostgreSQL.
- El endpoint "/health" devuelve "database: "connected"".
- Los endpoints de consulta y creación de productos funcionan correctamente.

## 9. Responsables

El mantenimiento de los respaldos y la verificación de recuperación forman parte de las tareas de mantenimiento del proyecto. La revisión del estado de los respaldos deberá realizarse periódicamente para garantizar que exista una copia reciente y recuperable de la información.
