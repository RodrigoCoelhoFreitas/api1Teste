const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'usando get dentro da rota de produtos'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando post dentro da rota de produtos'
    });
});

router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto

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


router.patch('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando patch dentro da rota de produtos'
    });
});

router.delete('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'usando delete dentro da rota de produtos'
    });
});

module.exports = router;