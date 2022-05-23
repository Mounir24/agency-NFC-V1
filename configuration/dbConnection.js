const mongoose = require('mongoose');
//const chalk = require('chalk');

// INITIATE DB CONNECTION
const dbConnection = (URI) => {
    const MONGO_CONFIG = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    };

    mongoose.connect(URI, MONGO_CONFIG, (err) => {
        try {
            if (err) {
                //console.log(chalk.red.inverse('Operation Faild: No DB Connection :('));
                return;
            } else {
                //console.log(chalk.green.inverse('DB Connectec Successfully 100% :)'))
            }
        } catch (err) {
            //console.log(chalk.red.inverse(err.message))
            console.log(err.message)
            process.exit(1)
        }
    });
}

module.exports = dbConnection;