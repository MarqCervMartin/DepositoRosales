const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');


router.get('/add', isLoggedIn, (req, res ) =>{
    res.render('links/add');
});

router.post('/add', isLoggedIn, async(req, res) =>{
    const {nombre, cantidad, mensaje} = req.body;
    const newPedido = {
        nombre,
        cantidad,
        mensaje,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO pedidos set ?',[newPedido]);
    req.flash('success', 'Guardado correctamente');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async(req, res) =>{
    const pedidos = await pool.query('SELECT * FROM pedidos WHERE user_id = ?',[req.user.id]);
    res.render('links/list.hbs', {pedidos});
});

router.get('/delete/:id', isLoggedIn, async(req, res) =>{
    const {id} = req.params;
    await pool.query('DELETE FROM pedidos WHERE ID = ?', [id]);
    req.flash('success','Pedido eliminado satisfactoriamente');
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async(req, res) =>{
    const {id} = req.params;
    const pedido = await pool.query('SELECT * FROM pedidos WHERE ID = ?', [id]);
    res.render('links/edit',{pedido: pedido[0]});
});

router.post('/edit/:id', isLoggedIn, async(req, res) =>{
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