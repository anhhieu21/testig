const pool = require('../config/db');
//get time now
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let seconds = date_ob.getSeconds();
module.exports = {
    findUser: async () => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const fetchResult = await connection.query(`SELECT idUser,user_name,email,phone,address,password,avatar,status, date FROM users`,);
            await connection.commit();
            return fetchResult[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    findUserById: async (idUser) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const fetchResult = await connection.query(`SELECT idUser,user_name,email,phone,address,password,avatar,status, date FROM users WHERE idUser = (?)`, [idUser]);
            await connection.commit();
            return fetchResult[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },

    createUser: async (data) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const queryResult = await connection.query(
                `insert into users
                (user_name,email,phone,address,password,avatar,status, date)
                values(?,?,?,?,?,?,?,?)`, [
                data.user_name,
                data.email,
                data.phone,
                data.address,
                data.password,
                data.avatar,
                data.status,
                year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
            ]
            );
            const fetchResult = await connection.query(
                `SELECT idUser,user_name,email,phone,address,password,avatar,status, date FROM users WHERE idUser = ?`, [queryResult[0].insertId]
            );
            await connection.commit();
            return fetchResult[0][0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    updateUser: async (data) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const queryResult = await connection.query(
                `UPDATE users SET user_name=?,email=?,phone=?,address=?,password=?,avatar=?,status=?,date=? WHERE idUser=?`, [
                data.user_name,
                data.email,
                data.phone,
                data.address,
                data.password,
                data.avatar,
                data.status,
                year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds,
                data.idUser
            ]
            );
            await connection.commit();
            return queryResult[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    deleteUser: async (idUser) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const fetchResult = await connection.query(`DELETE FROM users WHERE idUser = (?)`, [idUser]);
            await connection.commit();
            return fetchResult[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    loginUser: async (email,password) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const fetchResult = await connection.query(`SELECT idUser,user_name,email,phone,address,password,avatar,status, date FROM users WHERE email =(?) AND password =(?) `, [email,password]);
            await connection.commit();
            return fetchResult[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
};