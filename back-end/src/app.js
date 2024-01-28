const express = require('express');
const cors = require('cors')
const router = require('./router');

const app = express()

app.use(express.json())
app.use(cors(
    {headers: [
    {  key: "Access-Control-Allow-Origin", value: 'https://agenda-front-k8f9.onrender.com:10000' },
    {  key: "Access-Control-Allow-Methods", value: 'OPTIONS,PATCH,DELETE,PUT' },
]}
))
app.use(router)

module.exports = app