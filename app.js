const express = require('express');
const app = express();

const morgan = require('morgan');

const rotaProdutos = require('./routes/produtos');

const rotaPedidos = require('./routes/pedidos');

const rotaUsuarios = require('./routes/usuarios');


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header('Access-Control-Alow-Origin', '*');
    res.header('Access-Control-Alow-Header',
        'Origin, X-Requested-With, Content-Type, Accepted, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Alow-Methods',
            'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).send({});
    }

    next();
});

app.use('/usuarios', rotaUsuarios);
app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos);

app.use((req, res, next) => {
    const erro = new Error('Nao Encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;