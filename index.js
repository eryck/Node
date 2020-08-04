//Importações
const express = require('express') // importa o express
const bodyParser = require('body-parser') //Realiza o post da requisição para o Parser

//importando o arquivo de rotas do usuário
const userRoute = require('./routes/userRoute')

//Inicializa do Express e configuração da Porta
const app = express() //Cria a aplicação
const port = 3000 //Configura a porta

app.use(bodyParser.urlencoded({extended: false}))//Configura o bodyParser no node

userRoute(app) //injeção de dependencia para a rota

app.get('/', (req, res) => res.send('Olá mundo pelo Express!'))

app.listen(port, () => console.log('Api rodando na porta 3000'))