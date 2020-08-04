const express = require('express'); // invoca do express

//importando o arquivo de rotas do usuário
const userRoute = require('./routes/userRoute')

const app = express(); //Cria a aplicação
const port = 3000 //Configura a porta

userRoute(app) //injeção de dependencia para a rota

app.get('/', (req, res) => res.send('Olá mundo pelo Express!'))

app.listen(port, () => console.log('Api rodando na porta 3000'))