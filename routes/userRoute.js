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
const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))

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
            saveUser(users)

            res.status(201).send('OK')
        })
        .put((req, res) => { //Criação da rota para alteração dos usuários 
            const users = getUsers()

            //Recuperação do usuário pelo id para alteração
            saveUser(users.map(user =>{
                if(user.id === req.params.id){
                    return{
                        ...user,
                        ...req.body
                    }
                }

                return user
            }))
            res.status(200).send('OK')
        })
        .delete((req, res) => { //Remoção dos usuários
            const user =getUsers()

            saveUser(user.filter(user => user.id !== req.params.id))

            res.status(200).send('OK')
        })
}

module.exports = userRoute