const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
   
    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({
                error: error
            });
        }
        conn.query(
            'SELECT pedidos.id_pedido, pedidos.quantidade, produtos.id_produto, produtos.nome, produtos.preco FROM pedidos INNER JOIN produtos ON produtos.id_produto = pedidos.id_produto;',
            (error, resultado, field) => {
                conn.release();
                if(error){
                    return res.status(500).send({
                        error: error,
                    });
                }
                res.status(200).send({
                    pedidos: resultado.map(pedido => {
                        return {
                            id_pedido: pedido.id_pedido,
                            quantidade: pedido.quantidade,
                            produto: {
                                id_produto: pedido.id_produto,
                                nome: pedido.nome,
                                preco: pedido.preco
                            }
                        }
                    })
                });
            }
        )
    }) 
});

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({
                error: error
            });
        }
        conn.query(
            'SELECT * FROM produtos WHERE id_produto = ?',
            [req.body.id_produto],
            (error, resultado, field) => {
                if(error){
                    return res.status(500).send({
                        error: error
                    });
                }
                if(resultado.length == 0 ){
                    return res.status(404).send({
                        mensagem: 'Produto nao encontrado'
                    });
                }
                               
                conn.query(
                    'INSERT INTO pedidos (id_produto, quantidade) VALUES (?,?)',
                    [req.body.id_produto, req.body.quantidade],
                    (error, resultado, field) => {
                        conn.release();
                        if(error){
                            return res.status(500).send({
                                error: error,
                                response: null
                            });
                        }
                        res.status(201).send({
                            mensagem: 'Pedido inserido com sucesso',
                            id_pedido: resultado.insertId
                        });
                    }
                )
            }
        )    
    })  
});

router.get('/:id_pedido', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({
                error: error
            });
        }
        conn.query(
            'SELECT * FROM pedidos WHERE id_pedido = ? ',
            [req.params.id_pedido],
            (error, resultado, field) => {
                conn.release();
                if(error){
                    return res.status(500).send({
                        error: error,
                    });
                }
                res.status(200).send({
                    response: resultado
                });
            }
        )
    }) 
});


router.delete('/:id_pedido', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){
            return res.status(500).send({
                error: error
            });
        }
        conn.query(
            'DELETE FROM pedidos WHERE id_pedido = ?  ',
            [req.params.id_pedido],
            (error, resultado, field) => {
                conn.release();
                if(error){
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(202).send({
                    mensagem: 'Pedido deletado com sucesso',
                    id_pedido: req.params.id_pedido
                });
            }
        )
    }) 
});

module.exports = router;