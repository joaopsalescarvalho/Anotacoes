const express = require('express');
const cors = require('cors')
const router = require('./router');

const app = express()

app.use(express.json())
app.use((req, res, next) => {
    res.header( "Access-Control-Allow-Origin", 'https://agenda-front-k8f9.onrender.com:10000' )
    res.header("Access-Control-Allow-Methods", 'OPTIONS,PATCH,DELETE,PUT')
    app.use(cors())
    next()
});
app.use(router)

console.log('acessou o app')

module.exports = app