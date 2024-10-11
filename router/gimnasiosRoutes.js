const express = require('express');
const router = express.Router();
const BD = require('../database');
var database = BD.pool;

// Crear nuevo gimnasio
router.post('/gimnasios', (req, res) => {
  const { nombre_gimnasio, ubicacion, telefono, imagen_url, admin_id } = req.body;

  database.query(
    'INSERT INTO gimnasios (nombre_gimnasio, ubicacion, telefono, imagen_url, admin_id) VALUES (?, ?, ?, ?, ?)',
    [nombre_gimnasio, ubicacion, telefono, imagen_url, admin_id],
    (err, result) => {
      if (err) {
        console.error("Error al insertar nuevo gimnasio:", err);
        res.status(500).json({ error: "Error al añadir un nuevo gimnasio" });
      } else {
        res.status(201).json({ id_gimnasio: result.insertId, nombre_gimnasio, ubicacion, telefono, imagen_url, admin_id });
      }
    }
  );
});

// Obtener todos los gimnasios
router.get('/gimnasios', (req, res) => {
  database.query('SELECT * FROM gimnasios;', (err, rows) => {
    if (err) {
      console.error("Error al obtener gimnasios:", err);
      res.status(500).json({ error: "Error al obtener gimnasios" });
    } else {
      res.json(rows);
    }
  });
});

// Actualizar un gimnasio por ID
router.put('/gimnasios/:id', (req, res) => {
  const { id } = req.params;
  const { nombre_gimnasio, ubicacion, telefono, imagen_url, admin_id } = req.body;

  database.query(
    'UPDATE gimnasios SET nombre_gimnasio = ?, ubicacion = ?, telefono = ?, imagen_url = ?, admin_id = ? WHERE id_gimnasio = ?',
    [nombre_gimnasio, ubicacion, telefono, imagen_url, admin_id, id],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar gimnasio:", err);
        res.status(500).json({ error: "Error al actualizar gimnasio" });
      } else {
        // Seleccionar el gimnasio actualizado para devolverlo en la respuesta
        database.query('SELECT * FROM gimnasios WHERE id_gimnasio = ?', [id], (err, rows) => {
          if (err) {
            console.error("Error al obtener el gimnasio actualizado:", err);
            res.status(500).json({ error: "Error al obtener el gimnasio actualizado" });
          } else {
            res.json(rows[0]);
          }
        });
      }
    }
  );
});

// Eliminar un gimnasio por ID
router.delete('/gimnasios/:id', (req, res) => {
  const { id } = req.params;

  database.query('DELETE FROM gimnasios WHERE id_gimnasio = ?', [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar gimnasio:", err);
      res.status(500).json({ error: "Error al eliminar gimnasio" });
    } else {
      res.json({ message: "Gimnasio eliminado exitosamente" });
    }
  });
});

module.exports = router;
