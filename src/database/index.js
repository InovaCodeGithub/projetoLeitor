const mongoose = require(`mongoose`)

class Database {
    constructor(){
        this.mongo()
    }
    mongo(){
    this.mongoConnection = mongoose.connect('mongodb://localhost:27017/mongodb', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
    }
}

module.exports = new Database()