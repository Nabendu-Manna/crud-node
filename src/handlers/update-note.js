const connectDatabase = require('../database/db');
const NoteModel = require('../models/note');

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        await connectDatabase();
        const { id } = event.pathParameters;
        const { author, type, content } = JSON.parse(event.body);
        const result = await NoteModel.findByIdAndUpdate(id, {
            author: author,
            type: type,
            content: content,
            updated_at: new Date()
        });
        return {
            statusCode: 202,
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