const express = require('express');
const router = express.Router();
const pool = require('../database');
const authorize = require('../middleware/authMiddleware');

// Ruta para crear un nuevo admin (sólo Javier puede hacerlo)
router.post('/admin', authorize('create'), async (req, res) => {
  const { usuario, contrasena, rol } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO admin (usuario, contrasena, rol) VALUES (?, ?, ?)',
      [usuario, contrasena, rol]
    );
    res.status(201).json({ admin_id: result.insertId, usuario, rol });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para leer admins (sólo Javier puede hacerlo)
router.get('/admin', authorize('read'), async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM admin');
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
