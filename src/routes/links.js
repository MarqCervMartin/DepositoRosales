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
    req.flash('success', 'Guardado correctamente');
    res.redirect('/links');
});

router.get('/', async(req, res) =>{
    const pedidos = await pool.query('SELECT * FROM pedidos');
    res.render('links/list.hbs', {pedidos});
});

router.get('/delete/:id', async(req, res) =>{
    const {id} = req.params;
    await pool.query('DELETE FROM pedidos WHERE ID = ?', [id]);
    req.flash('success','Pedido eliminado satisfactoriamente');
    res.redirect('/links');
});

router.get('/edit/:id', async(req, res) =>{
    const {id} = req.params;
    const pedido = await pool.query('SELECT * FROM pedidos WHERE ID = ?', [id]);
    res.render('links/edit',{pedido: pedido[0]});
});

router.post('/edit/:id', async(req, res) =>{
    const {id} = req.params;
    const {nombre, cantidad, mensaje} = req.body;
    const newPedido = {
        nombre,
        cantidad,
        mensaje
    };
    console.log(newPedido);
    await pool.query('UPDATE pedidos set ? WHERE ID = ?', [newPedido, id]);
    req.flash('success', 'Pedido actualizado satisfactoriamente');
    res.redirect('/links');
});


module.exports = router;