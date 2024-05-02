const mysql = require('mysql');
const {INSERT_USER_QUERY, INSERT_EMAIL_QUERY, INSERT_PASSWORD_QUERY, INSERT_TOILET_QUERY, INSERT_TOILET_CODE_QUERY,
    INSERT_TOILET_PRICE_QUERY, INSERT_TOKEN_QUERY
} = require("../Values/dbQueries");
const {ToiletType} = require("../Enums/toiletType");

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

async function performDbQuery(query, params = []) {

    try {
        const connection = await connectDatabase(dbConfig);
        const results = await execQuery(connection, query, params);
        connection.end();
        return results;
    } catch (error) {
        console.error('Database query failed:', error);
        return undefined;
    }
}

async function createUserAccount(uID,username, email, passwordHash, userToken){
    const connection = await  connectDatabase(dbConfig);
    try{
        await  connection.beginTransaction();
        // save account
        await connection.query(INSERT_USER_QUERY,[uID,username]);

        // save email
        await  connection.query(INSERT_EMAIL_QUERY,[uID, email]);

        // save hashed password
        await  connection.query(INSERT_PASSWORD_QUERY,[uID, passwordHash]);

        // save token
        await connection.query(INSERT_TOKEN_QUERY,[uID,userToken]);

        await  connection.commit();
        return true;
    }catch(err){
        await  connection.rollback();
        return  false
    }finally {
        connection.end();
    }
}

async function saveToilet(tID, toilet){
    const connection = await connectDatabase(dbConfig);
    try{
        await connection.beginTransaction();
        // save toilet
        await  connection.performDbQuery(INSERT_TOILET_QUERY,[tID, toilet.name, toilet.type, toilet.description, toilet.latitude, toilet.longitude]);

        if(toilet.type === ToiletType.code){
            await  connection.performDbQuery(INSERT_TOILET_CODE_QUERY,[tID, toilet.code]);
        }

        if(toilet.type === ToiletType.paid){
            await connection.performDbQuery(INSERT_TOILET_PRICE_QUERY,[tID, toilet.price.amount, toilet.price.currency]);
        }
        await  connection.commit();
        return true;
    }catch (e){
        await connection.rollback();
        return  false
    }finally {
        connection.end();
    }
}


module.exports = {
    performDbQuery,
    createUserAccount,
    saveToilet
}