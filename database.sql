//Pegar en Neon
//1. Para poder crear la tabla
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

//2. Para insertar registros y probar la base de datos
INSERT INTO productos (nombre, precio) VALUES ('Camiseta ITCA', 12.50);
INSERT INTO productos (nombre, precio) VALUES ('Cuaderno de apuntes', 3.75);