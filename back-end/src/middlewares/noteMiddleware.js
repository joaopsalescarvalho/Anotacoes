
const validateNome = (req, res, next) => {
      
    const { body } = req
    
    if (body.nome === undefined) {
        return res.status(400).json({message: "the field 'nome' is required"})
    }

    if (body.nome === '') {
        return res.status(400).json({message: "nome cannot be empty"})
    }
    next()
}
const validateDescricao = (req, res, next) => {
      
    const { body } = req
    
    if (body.descricao === undefined) {
        return res.status(400).json({message: "the field 'descricao' is required"})
    }

    if (body.descricao === '') {
        return res.status(400).json({message: "descricao cannot be empty"})
    }
    next()
}
const validateValor = (req, res, next) => {
      
    const { body } = req
    
    if (body.valor === undefined) {
        return res.status(400).json({message: "the field 'valor' is required"})
    }

    if (body.valor === '') {
        return res.status(400).json({message: "valor cannot be empty"})
    }
    next()
}

module.exports = {
    validateNome,
    validateDescricao,
    validateValor,
}