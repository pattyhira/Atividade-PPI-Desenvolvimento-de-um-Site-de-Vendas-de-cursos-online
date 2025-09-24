import express from 'express';
import verificarAutenticacao from './seguranca/autenticar.js';
import session from 'express-session';

const app = express ();
const porta = 3000;
const host = '0.0.0.0';

app.use(session({
    secret: 'meus3gr3d0',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 15
    }
}));

app.use(express.urlencoded({extended: true}));

app.post('/login', (requisicao, resposta) => {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;

    if (usuario === 'admin' && senha === 'admin'){
        requisicao.session.autenticado = true;
        resposta.redirect('/index.html');
    }
    else {
        resposta.send("<span>Usuário ou senha inválidos!</span> <a href='/login.html'>Tentar novamente</a>");
    }
});

app.use(express.static('publico'));
app.use(verificarAutenticacao, express.static('privado'));

app.listen(porta, host, () => {
    console.log(`Servidor em execução em http://${host}:${porta}`);
});