const connectDatabase = require('../database/db');
const NoteModel = require('../models/note');

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        await connectDatabase();
        const { author, type, content } = JSON.parse(event.body);
        const note = new NoteModel({
            author: author,
            type: type,
            content: content
        })
        const result = await note.save()
        return {
            statusCode: 201,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    message: "successful!",
                    result: result
                }
            ),
        };
    } catch (error) {
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({ error: error.message })
        }
    }
}