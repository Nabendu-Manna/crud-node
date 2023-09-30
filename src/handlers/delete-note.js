const connectDatabase = require('../database/db');
const NoteModel = require('../models/note');

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        await connectDatabase();
        const { id } = event.pathParameters;
        const result = await NoteModel.findByIdAndDelete(id);
        return {
            statusCode: 204,
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