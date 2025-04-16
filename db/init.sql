CREATE TABLE dim_cliente (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    segmento VARCHAR(50)
);

CREATE TABLE dim_producto (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    categoria VARCHAR(50)
);

CREATE TABLE dim_tiempo (
    id SERIAL PRIMARY KEY,
    fecha DATE,
    mes INT,
    año INT
);

CREATE TABLE fact_ventas (
    id SERIAL PRIMARY KEY,
    cliente_id INT REFERENCES dim_cliente(id),
    producto_id INT REFERENCES dim_producto(id),
    tiempo_id INT REFERENCES dim_tiempo(id),
    cantidad INT,
    total NUMERIC
);

INSERT INTO dim_cliente (nombre, segmento) VALUES ('Banco A', 'Corporativo');
INSERT INTO dim_producto (nombre, categoria) VALUES ('Crédito Hipotecario', 'Financiero');
INSERT INTO dim_tiempo (fecha, mes, año) VALUES ('2025-04-10', 4, 2025);
INSERT INTO fact_ventas (cliente_id, producto_id, tiempo_id, cantidad, total) VALUES (1, 1, 1, 2, 100000);
