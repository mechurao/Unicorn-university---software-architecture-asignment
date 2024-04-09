const mysql = require('mysql2');

const  DB_HOST = "localhost";
const DB_NAME = "Unicorn";
const  DB_USERNAME = "client";
const DB_PASSWORD = "Uthd@jQRMk!TuwV)";
const DB_PORT = 3306;


const  dbConfig = {
    host:DB_HOST,
    user:DB_USERNAME,
    password:DB_PASSWORD,
    database:DB_NAME,
    port:DB_PORT,
}

function connectDatabase(config){
    const  conn = mysql.createConnection(config);
    return new Promise((resolve, reject) => {
        conn.connect(err => {
            if(err){
                console.error('Error connecting to database server:',err);
                return reject(err);
            }
            resolve(conn);
        }) ;
    });
}

function execQuery(connection, query, params) {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, results) => {
            if (err) {
                console.error('Error executing the query:', err);
                return reject(err);
            }
            resolve(results);
        });
    });
}

async function performDbQuery(query, params = [], conn) {
    try {
        const connection = await connectDatabase(conn);
        const results = await execQuery(connection, query, params);
        connection.end();
        return results;
    } catch (error) {
        console.error('Database query failed:', error);
        return undefined;
    }
}

module.exports = {
    performDbQuery
}