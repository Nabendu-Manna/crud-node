const mongoose=require('mongoose');
let conn = null;
module.exports = connectDatabase = async () => {
    if (conn == null) {
        console.log("Creating new database connection...");
        conn = await mongoose.connect(process.env.DB, {
            serverSelectionTimeoutMS: 5000
        });
        return conn;
    }
    console.log("Connection already established, reusing the connection...");
}