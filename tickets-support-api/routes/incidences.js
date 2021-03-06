const express = require('express');
const connection = require('../connection');

const router = express.Router();

router.post('/create', (req, res) => {
  const { subject, description, user_id } = req.body;
  const data = {
    success: false,
    message: null,
  };
  if (subject !== undefined && description !== undefined && user_id !== undefined) {
    connection.query('INSERT INTO tickets (subject, description, status, comment, user_id) VALUES (?,?,?,?,?)', [subject, description, 0, 'Ticket abierto', user_id], (err) => {
      if (err) {
        console.log(err);
        data.message = 'ERROR EN EL SERVIDOR';
        res.send(data);
      } else {
        data.message = 'TICKET CREADO CORRECTAMENTE';
        data.success = true;
        res.status(200);
        res.send(data);
      }
    });
  } else {
    data.message = 'FALTAN DATOS POR RECIBIR';
    res.status(500);
    res.send(data);
  }
});

router.post('/get', (req, res) => {
  const { user_id } = req.body;
  const data = {
    message: null,
    success: false,
  };
  if (user_id !== undefined) {
    connection.query('SELECT * FROM tickets WHERE user_id = ?', [user_id], (err, rows) => {
      if (err) {
        data.message = 'ERROR EN EL SERVIDOR';
        res.status(500);
        res.send(data);
      } else {
        data.message = 'RESPUESTA OK';
        data.success = true;
        data.data = rows.reverse();
        res.status(200);
        res.send(data);
      }
    });
  }
});

router.post('/allin', (req, res) => {
  const { role } = req.body;
  let data;
  if (role === 1) {
    connection.query('SELECT * FROM tickets', (err, rows) => {
      if (err) {
        res.status(500);
        res.send('ERROR AL EJECUTAR CONSULTA');
      } else {
        data = rows.reverse();
        res.status(200);
        res.send(data);
      }
    });
  }
});

router.get('/all', (req, res) => {
  const data = {
    message: null,
    success: false,
  };
  connection.query('SELECT T.id, T.subject, T.description, T.status, T.comment, T.user_id, U.user, U.name FROM tickets AS T, users AS U WHERE U.id = T.user_id', (err, rows) => {
    if (err) {
      data.message = 'ERROR EN EL SERVIDOR';
      res.status(500);
      res.send(data);
    } else {
      data.message = 'RESPUESTA OK';
      data.success = true;
      data.data = rows.reverse();
      res.status(200);
      res.send(data);
    }
  });
});

router.post('/delete', (req, res) => {
  const { id } = req.body;
  const data = {
    success: false,
    message: null,
  };
  if (id !== undefined) {
    connection.query('DELETE FROM tickets WHERE id = ?', [id], (err) => {
      if (err) {
        data.message = 'ERROR EN EL SERVIDOR';
        res.status(500);
        res.send(data);
      } else {
        data.success = true;
        data.message = 'RESPUESTA OK';
        res.status(200);
        res.send(data);
      }
    });
  } else {
    data.message = 'TICKET UNDEFINED';
    res.status(500);
    res.send(data);
  }
});

module.exports = router;
