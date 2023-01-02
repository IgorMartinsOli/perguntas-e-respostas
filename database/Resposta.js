const Sequelize = require('sequelize')
const connection = require('./database')

const Resposta = connection.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        AllowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        AllowNull: false
    }
});

Resposta.sync({force: false}).then(() => {});

module.exports = Resposta;