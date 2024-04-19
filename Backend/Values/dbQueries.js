const USERS_TABLE_NAME = "Users";
const PASSWORDS_TABLE_NAME = "Passwords";
const EMAILS_TABLE_NAME = "Emails";
const TOKENS_TABLE_NAME = "Tokens"
const TOILETS_TABLE_NAME = "Toilets";
const TOILET_CODES_TABLE_NAME = "Codes";
const TOILET_PRICE_TABLE_NAME = "Prices";

// table types consts
const TOILET_TYPE_FREE = 0;
const TOILET_TYPE_CODE = 1;
const TOILET_TYPE_PAID = 2;


// users
const INSERT_USER_QUERY = `INSERT INTO ${USERS_TABLE_NAME} (uID, username) VALUES (?, ?)`;
const GET_USER_QUERY = `SELECT username FROM ${USERS_TABLE_NAME} WHERE uID = ?`;
const DELETE_USER_QUERY = `DELETE FROM ${USERS_TABLE_NAME} WHERE uID = ?`;

// passwords
const INSERT_PASSWORD_QUERY = `INSERT INTO ${PASSWORDS_TABLE_NAME} (uID, password) VALUES (?, ?)}`
const GET_PASSWORD_QUERY = `SELECT password FROM ${PASSWORDS_TABLE_NAME} WHERE uID = ?`;
const UPDATE_PASSWORD_QUERY = `UPDATE ${PASSWORDS_TABLE_NAME} SET email = ? WHERE uID = ?`;
const  DELETE_PASSWORD_QUERY = `DELETE FROM ${PASSWORDS_TABLE_NAME} WHERE uID = ?`;

// emails
const INSERT_EMAIL_QUERY = `INSERT INTO ${EMAILS_TABLE_NAME} (uID, email) VALUES (?, ?)`;
const  GET_EMAIL_QUERY = `SELECT email FROM ${EMAILS_TABLE_NAME} WHERE uID = ?`;
const  UPDATE_EMAIL_QUERY = `UPDATE ${EMAILS_TABLE_NAME} SET email = ? WHERE uID = ?`;
const  DELETE_EMAIL_QUERY =`DELETE FROM ${EMAILS_TABLE_NAME} WHERE uID = ?`;
const GET_UID_BY_EMAIL_QUERY = `SELECT uID FROM ${EMAILS_TABLE_NAME} WHERE email = ?`;

// tokens
const  DELETE_USER_TOKEN_QUERY = `DELETE FROM ${TOKENS_TABLE_NAME} WHERE uID = ?`;
const  DELETE_TOKEN_QUERY = `DELETE FROM ${TOKENS_TABLE_NAME} WHERE token = ?`;
const  GET_TOKEN_QUERY = `SELECT token FROM ${TOKENS_TABLE_NAME} WHERE uID = ?`;
const INSERT_TOKEN_QUERY = `INSERT INTO ${TOKENS_TABLE_NAME} (uID, token) VALUES (?, ?)`;
const GET_UID_FROM_TOKEN = `SELECT uID FROM ${TOKENS_TABLE_NAME} WHERE token = ?`;

// toilets
const INSERT_TOILET_QUERY = `INSERT INTO ${TOILETS_TABLE_NAME} (tID, name, type, description, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)`;
const SELECT_TOILETS_IN_RADIUS_QUERY = `SELECT 
    t.tID,
    t.name,
    t.type,
    t.description,
    t.latitude,
    t.longitude,
    CASE 
        WHEN t.type = ${TOILET_TYPE_FREE} THEN NULL  -- Typ zdarma, žádný extra parametr
        WHEN t.type = ${TOILET_TYPE_CODE} THEN c.code -- Typ s kódem
        WHEN t.type = ${TOILET_TYPE_PAID} THEN CONCAT(p.amount, ' ', p.currency) -- Typ placený
    END AS extra_info
FROM 
    Toilets t
LEFT JOIN 
    Codes c ON t.tID = c.tID AND t.type = ${TOILET_TYPE_CODE}
LEFT JOIN 
    Prices p ON t.tID = p.tID AND t.type = ${TOILET_TYPE_PAID}
WHERE 
    ST_Distance_Sphere(POINT(t.longitude, t.latitude), POINT(?, ?)) <= ?;
`;

// toilet codes
const INSERT_TOILET_CODE_QUERY = `INSERT INTO ${TOILET_CODES_TABLE_NAME} (tID, code) VALUES (?, ?)`;

// toilet price
const INSERT_TOILET_PRICE_QUERY = `INSERT INTO ${TOILET_PRICE_TABLE_NAME} (tID, amount, currency) VALUES (?, ?, ?)`;

module.exports = {
    INSERT_USER_QUERY,
    GET_USER_QUERY,
    DELETE_USER_QUERY,
    INSERT_PASSWORD_QUERY,
    GET_PASSWORD_QUERY,
    UPDATE_PASSWORD_QUERY,
    INSERT_EMAIL_QUERY,
    GET_EMAIL_QUERY,
    GET_UID_BY_EMAIL_QUERY,
    UPDATE_EMAIL_QUERY,
    DELETE_EMAIL_QUERY,
    DELETE_TOKEN_QUERY,
    DELETE_USER_TOKEN_QUERY,
    GET_TOKEN_QUERY,
    INSERT_TOKEN_QUERY,
    GET_UID_FROM_TOKEN,
    INSERT_TOILET_QUERY,
    SELECT_TOILETS_IN_RADIUS_QUERY,
    INSERT_TOILET_CODE_QUERY,
    INSERT_TOILET_PRICE_QUERY
}

