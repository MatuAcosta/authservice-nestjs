
const dotenv = require('dotenv')
dotenv.config();

const config = {
    development: {
        //dialect: process.env.dialect,
        host: process.env.HOST,
        port: 5432,
        username:process.env.USER,
        password: process.env.PASSWORD,
        database:process.env.DB
    },
    test:{
        dialect: 'postgres',
        host: process.env.HOST,
        port: +process.env.PORT,
        username:process.env.USER,
        password: process.env.PASSWORD,
        database:process.env.DB
    },
    prod: {
        dialect: 'postgres',
        host: process.env.HOST,
        port: +process.env.PORT,
        username:process.env.USER,
        password: process.env.PASSWORD,
        database:process.env.DB
    }
};
module.exports = config[process.env.ENV]