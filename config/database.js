const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // database password
    database: 'test' // database name
});

db.connect((err) => {
    if(err){
        console.error('Error connecting to MySql: ', err);
        return;
    }
    console.log('MySql Connected...');
});

module.exports = {db};
// to use db module in any other file use below
//const db = require('./db');