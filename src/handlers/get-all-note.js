const connectDatabase = require('../database/db');
const NoteModel = require('../models/note');

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        await connectDatabase();
        const notes = await NoteModel.find();
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    message: "successful!",
                    result: notes
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