const express = require('express')
const noteController = require('./controllers/noteController')
const noteMiddleware = require('./middlewares/noteMiddleware')

const router = express.Router();

router.get('/notes', noteController.getAll)
router.post('/notes',
    noteMiddleware.validateNome,
    noteMiddleware.validateDescricao,
    noteMiddleware.validateValor,
    noteController.createNote
)
router.delete('/notes/:id', noteController.deleteNote)
router.put('/notes/:id',noteMiddleware.validateValor, noteController.updateNote)

console.log('acessou o router')

module.exports = router