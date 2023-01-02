const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const bodyparser = require('body-parser')
const connection = require('./database/database')
const perguntaModel = require('./database/Pergunta')

connection
    .authenticate()
    .then(() => {
        console.log('Conexão com o bd sucesso')
    })
    .catch(err => {
        console.log(`Erro ao conectar com o bd ${err}`)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

app.get('/', (req, res) => res.render('index'))

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.post('/pergunta/salvar', (req, res) => {
    const {titulo, descricao} = req.body;
    res.send(`Formulario recebido!
    Titulo: ${titulo} 
    Descricao: ${descricao}`)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))