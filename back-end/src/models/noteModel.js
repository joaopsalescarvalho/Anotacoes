const connection = require('./connection')

const getAll = async () => {
    const [notes] = await connection.execute('SELECT * FROM notes')

    return notes
}

const createNote = async (note) => {
    
    const { nome, descricao , valor} = note
    
    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO notes(nome, descricao, valor, created_at) VALUES (?, ?, ?, ?)'

    const [createdNote] = await connection.execute(query, [nome, descricao, valor, dateUTC])
    
    return { insertId: createdNote.insertId };

}

const deleteNote = async (id) => {

    const deletedNote = await connection.execute('DELETE FROM notes WHERE id = ?',[id])
    return deletedNote
}

const updateNote = async (id, notes) => {
    const { descricao, valor } = notes
    
    const query = 'UPDATE notes SET descricao= ?, valor= ?  WHERE id = ?'

    const [updatedNote] = await connection.execute(query,[descricao, valor, id])
    return updatedNote
}

module.exports = {
    getAll,
    createNote,
    deleteNote,
    updateNote
}