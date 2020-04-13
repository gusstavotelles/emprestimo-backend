const express = require('express');
const EmprestimoController = require('./app/controllers/EmprestimoController');

const router = new express.Router();

router.get('/api', EmprestimoController.index);

router.post('/api', EmprestimoController.create);

router.put('/api/:id', EmprestimoController.update);

router.delete('/api/:id', EmprestimoController.destroy);

module.exports = router;