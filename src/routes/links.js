const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', (req, res ) =>{
    res.render('links/add');
});

router.post('/add', async(req, res) =>{
    const {nombre, cantidad, mensaje} = req.body;
    const newPedido = {
        nombre,
        cantidad,
        mensaje
    };
    await pool.query('INSERT INTO pedidos set ?',[newPedido]);
    res.redirect('/links');
});

router.get('/', async(req, res) =>{
    const pedidos = await pool.query('SELECT * FROM pedidos');
    res.render('links/list.hbs', {pedidos});
});


module.exports = router;