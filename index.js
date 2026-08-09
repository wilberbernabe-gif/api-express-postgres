const express = require('express');
const pool = require('./db');
require('dotenv').config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'OK', database: 'connected', timestamp: new Date() });
  } catch (err) {
    res.status(500).json({ status: 'ERROR', database: 'disconnected', error: err.message });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'API REST funcional y operativa' });
});

app.get('/api/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/productos', async (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({ error: 'Faltan campos obligatorios: nombre y precio' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO productos (nombre, precio) VALUES ($1, $2) RETURNING *',
      [nombre, precio]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, function () {
  console.log('Servidor corriendo en el puerto 3000');
});