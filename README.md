#  Proyecto de API Express usando postgre SQL

Este proyecto es una API REST básica desarrollada con Node.js y Express, conectada a una base de datos PostgreSQL mediante el paquete "pg".

El proyecto permite consultar y agregar productos y cuenta con un endpoint de salud para verificar que la API se encuentra operativa.

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- Neon con PostgreSQL
- Node PostgreSQL ("pg")
- dotenv
- Git y GitHub

## Requisitos

Antes de ejecutar el proyecto se necesita tener instalado:

- Node.js
- npm
- Acceso a una base de datos PostgreSQL
- La base de datos utilizada durante el desarrollo está alojada en Neon.
  
## Para instalarla

### Para Clonar el repositorio pega este link en el CMD o el terminal:
```bash
git clone https://github.com/wilberbernabe-gif/api-express-postgres
```

### Ingresar a la carpeta del proyecto:
```bash
cd api-express-postgres
```

### Instalar las dependencias:
```bash
npm install
```
## Configuración de variables de entorno

### Crear un archivo ".env" en la raíz del proyecto.

El proyecto utiliza las siguientes variables:

- PORT=3000
- DATABASE_URL=tu_cadena_de_conexion_postgresql

La variable "DATABASE_URL" debe contener la cadena de conexión de la base de datos PostgreSQL.

No se deben almacenar credenciales reales directamente en el código fuente. Entonces, para facilitar la configuración del proyecto se incluye el archivo ".env.example".

### Base de datos

La estructura de la base de datos se encuentra documentada en el archivo:

- database.sql

### La tabla principal utilizada por la API es "productos"y contiene los siguientes campos:

Campo| Tipo| Descripción
"id"| SERIAL| Identificador único del producto
"nombre"| VARCHAR(100)| Nombre del producto
"precio"| NUMERIC(10,2)| Precio del producto
"created_at"| TIMESTAMP| Fecha de creación

### Ejecución local

Para iniciar la API pega en el terminal:

```bash
npm start
```

Una vez iniciada, estará disponible en:

http://localhost:3000

## Endpoints
Nota: Puedes auxiliarte de Postman para esta parte.
### GET "/"

Endpoint básico para comprobar que la API está funcionando.

Ejemplo:

- GET http://localhost:3000/

### GET "/health"

Endpoint utilizado para comprobar el estado de la aplicación.

Ejemplo:

GET http://localhost:3000/health

Respuesta esperada:

{
  "status": "ok"
}

### GET "/api/productos"

Obtiene la lista de productos almacenados en PostgreSQL.

Ejemplo:

GET http://localhost:3000/api/productos

### POST "/api/productos"

Agrega un nuevo producto a la base de datos.

Ejemplo de solicitud:

{
  "nombre": "Laptop",
  "precio": 799.99
}

## Estructura del proyecto
```text
api-express-postgres/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── .env.example
├── .gitignore
├── BACKUP.md
├── database.sql
├── db.js
├── index.js
├── package.json
├── package-lock.json
└── README.md
```

Nota: La carpeta "node_modules" se genera automáticamente al ejecutar "npm install" y no debe subirse al repositorio Githud.

## Base de datos en Neon

Durante el desarrollo se utiliza Neon como proveedor de PostgreSQL. La aplicación se conecta a la base de datos mediante la variable de entorno "DATABASE_URL". La cadena de conexión no se incluye directamente en el código ni en el repositorio Githud.

## Estado del proyecto
Actualmente este proyecto cuenta con:

- API REST desarrollada con Express.
- Conexión a PostgreSQL.
- Operaciones para consultar y agregar productos.
- Variables de entorno.
- Archivo ".env.example".
- Endpoint "/health".
- Script SQL para crear la tabla "productos".
- Despliegue de la API en la nube.
- Pipeline CI/CD mediante GitHub Actions.
- URL pública de la API.
