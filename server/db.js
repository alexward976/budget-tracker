const mongoose = require('mongoose');

const dbUri = "mongodb+srv://admin:passw0rd@cluster0.uf0ufko.mongodb.net/budget_db?retryWrites=true&w=majority&appName=Cluster0"

module.exports = () => {
    return mongoose.connect(dbUri);
}