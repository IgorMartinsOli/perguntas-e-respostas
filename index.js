const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    var nome = "Igor";
    var lang = 'pt-br'
    res.render('index', {nome, lang})
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))