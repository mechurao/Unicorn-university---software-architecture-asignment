const USERS_TABLE_NAME = "Users";
const PASSWORDS_TABLE_NAME = "Passwords";
const EMAILS_TABLE_NAME = "Emails";
const TOKENS_TABLE_NAME = "Tokens";
const TOILETS_TABLE_NAME = "Toilets";
const TOILET_CODES_TABLE_NAME = "Codes";
const TOILET_PRICE_TABLE_NAME = "Prices";
const RATINGS_TABLE_NAME = "Ratings";
const CURRENCY_TABLE_NAME = "Currency";

// Table types constants
const TOILET_TYPE_FREE = 0;
const TOILET_TYPE_CODE = 1;
const TOILET_TYPE_PAID = 2;

// Users queries
const INSERT_USER_QUERY = `INSERT INTO ${USERS_TABLE_NAME} (uID, username) VALUES (?, ?)`;
const GET_USER_QUERY = `SELECT username FROM ${USERS_TABLE_NAME} WHERE uID = ?`;
const DELETE_USER_QUERY = `DELETE FROM ${USERS_TABLE_NAME} WHERE uID = ?`;

// Passwords queries
const INSERT_PASSWORD_QUERY = `INSERT INTO ${PASSWORDS_TABLE_NAME} (uID, password) VALUES (?, ?)`;
const GET_PASSWORD_QUERY = `SELECT password FROM ${PASSWORDS_TABLE_NAME} WHERE uID = ?`;
const UPDATE_PASSWORD_QUERY = `UPDATE ${PASSWORDS_TABLE_NAME} SET password = ? WHERE uID = ?`;
const DELETE_PASSWORD_QUERY = `DELETE FROM ${PASSWORDS_TABLE_NAME} WHERE uID = ?`;

// Emails queries
const INSERT_EMAIL_QUERY = `INSERT INTO ${EMAILS_TABLE_NAME} (uID, email) VALUES (?, ?)`;
const GET_EMAIL_QUERY = `SELECT email FROM ${EMAILS_TABLE_NAME} WHERE uID = ?`;
const UPDATE_EMAIL_QUERY = `UPDATE ${EMAILS_TABLE_NAME} SET email = ? WHERE uID = ?`;
const DELETE_EMAIL_QUERY = `DELETE FROM ${EMAILS_TABLE_NAME} WHERE uID = ?`;
const GET_UID_BY_EMAIL_QUERY = `SELECT uID FROM ${EMAILS_TABLE_NAME} WHERE email = ?`;
const CHECK_EMAIL_QUERY = `SELECT * FROM ${EMAILS_TABLE_NAME} WHERE email = ?`;

// Tokens queries
const DELETE_USER_TOKEN_QUERY = `DELETE FROM ${TOKENS_TABLE_NAME} WHERE uID = ?`;
const DELETE_TOKEN_QUERY = `DELETE FROM ${TOKENS_TABLE_NAME} WHERE token = ?`;
const GET_TOKEN_QUERY = `SELECT token FROM ${TOKENS_TABLE_NAME} WHERE uID = ?`;
const INSERT_TOKEN_QUERY = `INSERT INTO ${TOKENS_TABLE_NAME} (uID, token) VALUES (?, ?)`;
const GET_UID_FROM_TOKEN = `SELECT uID FROM ${TOKENS_TABLE_NAME} WHERE token = ?`;

// Toilets queries
const INSERT_TOILET_QUERY = `INSERT INTO ${TOILETS_TABLE_NAME} (tID, name, type, description, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)`;
const SELECT_TOILET_QUERY = `SELECT name, type, description, latitude, longitude FROM ${TOILETS_TABLE_NAME} WHERE tID = ?`;
const SELECT_TOILETS_IN_RADIUS_QUERY = `
    SELECT
        t.tID,
        t.name,
        t.type,
        t.description,
        t.latitude,
        t.longitude,
        CASE
            WHEN t.type = ${TOILET_TYPE_FREE} THEN NULL
            WHEN t.type = ${TOILET_TYPE_CODE} THEN c.code
            WHEN t.type = ${TOILET_TYPE_PAID} THEN CONCAT(p.amount, ' ', curr.name)
            END AS extra_info
    FROM
        ${TOILETS_TABLE_NAME} t
            LEFT JOIN
        ${TOILET_CODES_TABLE_NAME} c ON t.tID = c.tID AND t.type = ${TOILET_TYPE_CODE}
            LEFT JOIN
        ${TOILET_PRICE_TABLE_NAME} p ON t.tID = p.tID AND t.type = ${TOILET_TYPE_PAID}
            LEFT JOIN
        ${CURRENCY_TABLE_NAME} curr ON curr.cID = p.cID
    WHERE
        ST_Distance_Sphere(POINT(t.longitude, t.latitude), POINT(?, ?)) <= ?
`;


const SELECT_NEAREST_TOILET_QUERY = `
    SELECT
        t.tID,
        t.name,
        t.type,
        t.description,
        t.latitude,
        t.longitude,
        CASE
            WHEN t.type = ${TOILET_TYPE_FREE} THEN NULL
            WHEN t.type = ${TOILET_TYPE_CODE} THEN c.code
            WHEN t.type = ${TOILET_TYPE_PAID} THEN CONCAT(p.amount, ' ', p.currency)
            END AS extra_info,
        ST_Distance_Sphere(POINT(t.longitude, t.latitude), POINT(?, ?)) as distance
    FROM
        ${TOILETS_TABLE_NAME} t
            LEFT JOIN
        ${TOILET_CODES_TABLE_NAME} c ON t.tID = c.tID AND t.type = ${TOILET_TYPE_CODE}
            LEFT JOIN
        ${TOILET_PRICE_TABLE_NAME} p ON t.tID = p.tID AND t.type = ${TOILET_TYPE_PAID}
    ORDER BY
        distance
        LIMIT 1;
`;

// Toilet codes queries
const INSERT_TOILET_CODE_QUERY = `INSERT INTO ${TOILET_CODES_TABLE_NAME} (tID, code) VALUES (?, ?)`;
const SELECT_TOILET_CODE_QUERY = `SELECT code FROM ${TOILET_CODES_TABLE_NAME} WHERE tID = ?`;

// Toilet price queries
const INSERT_TOILET_PRICE_QUERY = `INSERT INTO ${TOILET_PRICE_TABLE_NAME} (tID, amount, cID) VALUES (?, ?, ?)`;
const SELECT_TOILET_PRICE_QUERY = `
    SELECT
        ${TOILET_PRICE_TABLE_NAME}.amount,
        ${CURRENCY_TABLE_NAME}.name
    FROM
        ${TOILET_PRICE_TABLE_NAME}
            JOIN
        ${CURRENCY_TABLE_NAME}
        ON
            ${TOILET_PRICE_TABLE_NAME}.cID = ${CURRENCY_TABLE_NAME}.cID
    WHERE
        ${TOILET_PRICE_TABLE_NAME}.tID = ?
`;

// Toilet rating queries
const INSERT_TOILET_RATING_QUERY = `INSERT INTO ${RATINGS_TABLE_NAME} (tID, uID, rating, text) VALUES (?, ?, ?, ?)`;
const GET_TOILET_RATINGS_QUERY = `
    SELECT
        ${RATINGS_TABLE_NAME}.rating,
        ${RATINGS_TABLE_NAME}.text,
        ${USERS_TABLE_NAME}.username
    FROM
        ${RATINGS_TABLE_NAME}
            INNER JOIN
        ${USERS_TABLE_NAME}
        ON
            ${RATINGS_TABLE_NAME}.uID = ${USERS_TABLE_NAME}.uID
    WHERE
        ${RATINGS_TABLE_NAME}.tID = ?
`;

module.exports = {
    INSERT_USER_QUERY,
    GET_USER_QUERY,
    DELETE_USER_QUERY,
    INSERT_PASSWORD_QUERY,
    GET_PASSWORD_QUERY,
    UPDATE_PASSWORD_QUERY,
    DELETE_PASSWORD_QUERY,
    INSERT_EMAIL_QUERY,
    GET_EMAIL_QUERY,
    GET_UID_BY_EMAIL_QUERY,
    UPDATE_EMAIL_QUERY,
    DELETE_EMAIL_QUERY,
    CHECK_EMAIL_QUERY,
    DELETE_TOKEN_QUERY,
    DELETE_USER_TOKEN_QUERY,
    GET_TOKEN_QUERY,
    INSERT_TOKEN_QUERY,
    GET_UID_FROM_TOKEN,
    INSERT_TOILET_QUERY,
    SELECT_TOILET_QUERY,
    SELECT_TOILETS_IN_RADIUS_QUERY,
    INSERT_TOILET_CODE_QUERY,
    INSERT_TOILET_PRICE_QUERY,
    INSERT_TOILET_RATING_QUERY,
    GET_TOILET_RATINGS_QUERY,
    SELECT_TOILET_CODE_QUERY,
    SELECT_TOILET_PRICE_QUERY,
    SELECT_NEAREST_TOILET_QUERY
}
