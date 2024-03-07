const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // strictQuery to true forces only schema fields to be saved into database


// // Remote Database(requires internet connection)
// const connectToDB = async () => {
//     try {
//         const con = await mongoose.connect(process.env.MONGODB_URI);
//         console.log(`Database connected: ${con.connection.host}`);
//     } catch (err) {
//         console.log(err);
//     }
// }

// Local Connection(in case of no internet connection)
const connectToDB = async () => {
    try {
        const con = await mongoose.connect('mongodb://localhost:27017/crud-app');
        console.log(`Database connected: ${con.connection.host}`)
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    connectToDB
}