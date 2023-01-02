const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('index'))

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.post('/pergunta/salvar', (req, res) => {
    res.send("Formulario recebido")
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))