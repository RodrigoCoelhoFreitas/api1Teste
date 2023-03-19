const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'usando get dentro da rota de pedidos'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando post dentro da rota de pedidos'
    });
});

router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido

    if (id === 'especial') {
        res.status(200).send({
            mensagem: 'voce descobriu o id especial',
            id: id
        });
    } else {
        res.status(200).send({
            mensagem: 'voce passou um id'
        });
    }
});


router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando delete dentro da rota de pedidos'
    });
});

module.exports = router;