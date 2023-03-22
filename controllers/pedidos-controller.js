const mysql = require('../mysql').pool;


exports.getPedidos = (req, res, next) => {
   
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
}