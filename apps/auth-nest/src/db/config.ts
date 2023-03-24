
const dotenv = require('dotenv')
dotenv.config();

const config = {
    development: {
        //dialect: process.env.dialect,
        host: process.env.HOST,
        port: 25060,
        username:process.env.USER,
        password: process.env.PASSWORD,
        database:process.env.DB,
        dialectOptions:{
            ssl:{
                require:true,
                rejectUnauthorized:false
            }
        }
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