const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const bodyparser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')

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

app.get('/', (req, res) => {
    Pergunta.findAll({ raw: true, order: [
        ['id', 'DESC']
    ]}).then((perguntas) => {
        res.render("index", { perguntas });
    });
})

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.post('/pergunta/salvar', (req, res) => {
    const {titulo, descricao} = req.body;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => res.redirect('/'))
})

app.get('/pergunta/:id', (req, res) => {
    var id = req.params.id;

    Pergunta
    .findOne({where: {id: id}})
    .then(pergunta => {
        if(pergunta != undefined) {
            Resposta.findAll({
                where: {
                    perguntaId: pergunta.id
                },
                order: [['id', 'DESC']]
            }).then(respostas => {
                res.render('pergunta', {pergunta, respostas})
            })
        }else{
            res.redirect('/')
        }
    })
})

app.post('/responder', (req, res) => {
    const {corpo, perguntaId} = req.body;

    Resposta
    .create({corpo, perguntaId})
    .then(() => res.redirect(`/pergunta/${perguntaId}`));
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))