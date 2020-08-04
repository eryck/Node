const fs = require('fs')
const {join} = require('path')

const filePath = join(__dirname, 'users.json') //Configura o arquivo com os usuários 

//Função para pegar os usuários
const getUsers = () => {
    const data = fs.existsSync(filePath) //Verifica se o arquivo de filePath existe
        ? fs.readFileSync(filePath)
        : []
    try{
        return JSON.parse(data)
    }catch(error){
        return []
    }
}

//Salva os usuários
const saveUsers = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

//Cria a rota dos usuários
const userRoute = (app) => {
    app.route('/users/:id?')
        .get((req, res) => {
            const users = getUsers()

            res.send({users})
        })
        .post((req, res) => { //Criação dos usuários
            const users = getUsers()

            users.push(req.body)
            saveUsers(users)

            res.status(201).send('OK')
        })
}

module.exports = userRoute