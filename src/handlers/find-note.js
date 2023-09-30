const connectDatabase = require('../database/db');
const NoteModel = require('../models/note');

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    try {
        await connectDatabase();
        const { id } = event.pathParameters;
        const note = await NoteModel.findById(id);
        if (!note) {
            return {
                statusCode: 404,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        error: "Data not found!",
                    }
                ),
            }
        }
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    message: "Successful!",
                    result: note
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