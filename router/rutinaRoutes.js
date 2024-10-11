const express = require('express');
const router = express.Router();
const BD = require('../database');
var database = BD.pool;

// Crear nueva rutina
router.post('/rutinas', (req, res) => {
  const { id_rutina, nombre_rutina, enlace, descripcion, imagen_url, fecha_creacion, admin_id } = req.body;

  database.query(
    'INSERT INTO rutinas (nombre_rutina, enlace, descripcion, imagen_url, fecha_creacion, admin_id) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre_rutina, enlace, descripcion, imagen_url, fecha_creacion, admin_id],
    (err, result) => {
      if (err) {
        console.error("Error al insertar rutina:", err);
        res.status(500).json({ error: "Error al insertar rutina" });
      } else {
        res.status(201).json({ id_rutina: result.insertId, nombre_rutina, enlace, descripcion, imagen_url, fecha_creacion, admin_id });
      }
    }
  );
});

// Obtener todas las rutinas
router.get('/rutinas', (req, res) => {
  database.query('SELECT * FROM rutinas;', (err, rows) => {
    if (err) {
      console.error("Error al obtener rutinas:", err);
      res.status(500).json({ error: "Error al obtener rutinas" });
    } else {
      res.json(rows);
    }
  });
});

// Actualizar una rutina por ID
router.put('/rutinas/:id', (req, res) => {
  const { id } = req.params;
  const { nombre_rutina, enlace, descripcion, imagen_url, fecha_creacion, admin_id } = req.body;

  database.query(
    'UPDATE rutinas SET nombre_rutina = ?, enlace = ?, descripcion = ?, imagen_url = ?, fecha_creacion = ?, admin_id = ? WHERE id_rutina = ?',
    [nombre_rutina, enlace, descripcion, imagen_url, fecha_creacion, admin_id, id],
    (err, result) => {
      if (err) {
        console.error("Error al actualizar rutina:", err);
        res.status(500).json({ error: "Error al actualizar rutina" });
      } else {
        // Seleccionar la rutina actualizada para devolverla en la respuesta
        database.query('SELECT * FROM rutinas WHERE id_rutina = ?', [id], (err, rows) => {
          if (err) {
            console.error("Error al obtener la rutina actualizada:", err);
            res.status(500).json({ error: "Error al obtener la rutina actualizada" });
          } else {
            res.json(rows[0]);
          }
        });
      }
    }
  );
});

// Eliminar una rutina por ID
router.delete('/rutinas/:id', (req, res) => {
  const { id } = req.params;
  database.query('DELETE FROM rutinas WHERE id_rutina = ?', [id], (err, result) => {
    if (err) {
      console.error("Error al eliminar rutina:", err);
      res.status(500).json({ error: "Error al eliminar rutina" });
    } else {
      res.json({ message: "Rutina eliminada exitosamente" });
    }
  });
});

module.exports = router;
