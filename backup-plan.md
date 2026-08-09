Plan de Backups de la Base de Datos

1. Objetivo

El objetivo de este plan es establecer un procedimiento para proteger la información almacenada en la base de datos PostgreSQL utilizada por la API, permitiendo recuperar los datos ante errores, pérdida de información o fallos del servicio.

2. Información que será respaldada

Se respaldará la información almacenada en la base de datos PostgreSQL, principalmente:

- Tabla "productos".
- Registros de productos.
- Estructura de las tablas y columnas.
- Información necesaria para reconstruir la base de datos.

Las credenciales y variables de entorno no forman parte del respaldo de la base de datos y no deben almacenarse en repositorios públicos.

3. Frecuencia de los respaldos

Se establece la siguiente política:

- Respaldo diario: realizar un respaldo de la base de datos una vez al día.
- Respaldo previo a cambios importantes: realizar un respaldo antes de modificaciones importantes en la estructura de la base de datos.
- Respaldo bajo demanda: realizar un respaldo adicional cuando sea necesario, por ejemplo antes de una actualización importante de la aplicación.

4. Lugar de almacenamiento

La base de datos PostgreSQL utilizada por el proyecto está alojada en Neon.

Los respaldos deberán almacenarse en un medio independiente de la aplicación y de la base de datos principal, para evitar que un fallo de la base de datos provoque también la pérdida del respaldo.

Como almacenamiento externo se puede utilizar un servicio de almacenamiento seguro, manteniendo los archivos de respaldo protegidos y con acceso restringido.

5. Retención

Se recomienda conservar:

- Los respaldos diarios de los últimos 7 días.
- Los respaldos correspondientes a cambios importantes durante un período mayor cuando sean necesarios para recuperación.

Los respaldos antiguos pueden eliminarse cuando hayan superado el período de retención establecido.

6. Seguridad de los respaldos

Los archivos de respaldo deben mantenerse protegidos y no deben publicarse en GitHub ni incluir credenciales de acceso.

El acceso a los respaldos debe estar limitado únicamente a las personas autorizadas.

Las cadenas de conexión, contraseñas y otras variables sensibles deben mantenerse fuera de los archivos públicos del proyecto.

7. Procedimiento de recuperación

En caso de pérdida o corrupción de información, se seguirá el siguiente procedimiento:

1. Identificar el problema y detener temporalmente las operaciones que puedan modificar los datos afectados.
2. Seleccionar el respaldo más reciente que se encuentre disponible y sea válido.
3. Crear o seleccionar una instancia de PostgreSQL para la recuperación.
4. Restaurar la estructura de la base de datos utilizando el archivo "database.sql" cuando sea necesario.
5. Restaurar los datos desde el respaldo.
6. Verificar que los registros se hayan recuperado correctamente.
7. Comprobar la conexión de la API con la base de datos.
8. Ejecutar el endpoint "/health" para verificar que la aplicación continúa operativa.
9. Realizar una prueba de consulta de productos para confirmar el funcionamiento de la aplicación.
10. Registrar el incidente y las acciones realizadas.

8. Verificación de los backups

Los respaldos deben comprobarse periódicamente para confirmar que pueden utilizarse en una recuperación.

La prueba consiste en restaurar un respaldo en una base de datos independiente y comprobar:

- Que la estructura de las tablas sea correcta.
- Que los registros estén disponibles.
- Que la API pueda conectarse correctamente.
- Que las operaciones de consulta funcionen.

9. Plan ante fallos

Si la base de datos principal deja de estar disponible:

1. Identificar la causa del fallo.
2. Verificar la disponibilidad de los respaldos.
3. Seleccionar el respaldo válido más reciente.
4. Restaurar la información en una instancia disponible.
5. Actualizar la configuración de la aplicación mediante la variable "DATABASE_URL".
6. Reiniciar o volver a desplegar la aplicación si es necesario.
7. Comprobar el endpoint "/health".
8. Verificar las operaciones de consulta y registro de productos.

10. Responsabilidades

La persona encargada del proyecto debe:

- Verificar que los respaldos se realicen según la frecuencia establecida.
- Mantener los respaldos protegidos.
- Comprobar periódicamente que los respaldos puedan restaurarse.
- Mantener actualizada la documentación.
- Registrar cualquier incidente relacionado con pérdida o recuperación de datos.

11. Resumen

Elemento| Política
Información respaldada| Base de datos PostgreSQL y tabla "productos"
Frecuencia| Diaria
Respaldo adicional| Antes de cambios importantes
Base de datos| PostgreSQL en Neon
Almacenamiento| Medio externo seguro
Retención recomendada| 7 días para respaldos diarios
Verificación| Pruebas periódicas de restauración
Recuperación| Restauración del respaldo y verificación de la API
Credenciales| Nunca incluirlas en backups públicos o repositorios