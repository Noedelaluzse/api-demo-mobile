const mongoose = require('mongoose');
const dbConnect = async () => {
    const DB_URI = process.env.DB_URI;
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('***** DB Connected *****');
    }).catch((err) => {
        console.log('***** Error de conexión *****');
    });
};

module.exports = dbConnect;