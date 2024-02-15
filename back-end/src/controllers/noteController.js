const noteModel = require('../models/noteModel');

const getAll = async (req,res) => {
    
    const notes = await noteModel.getAll()

    return res.status(200).json(notes)
}

const createNote = async (req, res) => {
    
    const createdNote = await noteModel.createNote(req.body);

    return res.status(201).json(createdNote);
}

const deleteNote = async (req,res) => {
    const { id } = req.params

    await noteModel.deleteNote(id)
    return res.status(204).json()
}

const updateNote = async (req, res) => {
    const { id } = req.params

    await noteModel.updateNote(id,req.body);
    return res.status(204).json();
}

console.log('acessou o controller')

module.exports = {
    getAll,
    createNote,
    deleteNote,
    updateNote
}