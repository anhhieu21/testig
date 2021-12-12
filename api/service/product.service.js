const pool = require('../config/db');
//get time now

var id_lockPr, productId, list_idUser;
module.exports = {
    find: async () => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const fetchResult = await connection.query(`SELECT productId,name,price,type1,type2,detail,status,lockPr,idUser,CONCAT('http://192.168.0.106:6000/upload/',image_2) as image_1,
            CONCAT('http://192.168.0.106:6000/upload/',image_1) as image_2 ,date
            FROM products WHERE lockPr = "1" OR lockPr = "2" OR lockPr = "0" `,);
            await connection.commit();
            return fetchResult[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    findLock: async (idUser) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const fetchResult = await connection.query(`SELECT productId,name,price,type1,type2,detail,status,lockPr,idUser,CONCAT('http://192.168.0.106:6000/upload/',image_2) as image_1,
            CONCAT('http://192.168.0.106:6000/upload/',image_1) as image_2 ,date
            FROM products WHERE lockPr = "3" AND idUser=(?)`, [idUser]);
            await connection.commit();
            return fetchResult[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    displayPr: async (idUser) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const fetchResult = await connection.query(`SELECT productId,name,price,type1,type2,detail,status,lockPr,idUser,CONCAT('http://192.168.0.106:6000/upload/',image_2) as image_1,
            CONCAT('http://192.168.0.106:6000/upload/',image_1) as image_2 ,date
            FROM products WHERE idUser=(?) AND (lockPr = "1" OR lockPr = "2" OR lockPr = "0") `, [idUser]);
            await connection.commit();
            return fetchResult[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    findById: async (productId) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const fetchResult = await connection.query(`SELECT productId,name,price,type1,type2,detail,status,lockPr,idUser,CONCAT('http://192.168.0.106:6000/upload/',image_2) as image_1,
            CONCAT('http://192.168.0.106:6000/upload/',image_1) as image_2, date FROM products WHERE productId = (?)`, [productId]);
            await connection.commit();
            return fetchResult[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    findType1: async (type1) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const fetchResult = await connection.query(`SELECT productId,name,price,type1,type2,detail,status,lockPr,idUser,CONCAT('http://192.168.0.106:6000/upload/',image_2) as image_1,
            CONCAT('http://192.168.0.106:6000/upload/',image_1) as image_2, date FROM products WHERE type1 = (?)`, [type1]);
            await connection.commit();
            return fetchResult[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    findType2: async (type2) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const fetchResult = await connection.query(`SELECT productId,name,price,type1,type2,detail,status,lockPr,idUser,CONCAT('http://192.168.0.106:6000/upload/',image_2) as image_1,
            CONCAT('http://192.168.0.106:6000/upload/',image_1) as image_2, date FROM products WHERE type2 = (?)`, [type2]);
            await connection.commit();
            return fetchResult[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    create: async (data) => {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const queryResult = await connection.query(
                `insert into products
                (name,price,type1,type2,detail,status,lockPr,idUser,image_1,image_2,date)
                values(?,?,?,?,?,?,?,?,?,?,?)`, [
                data.name,
                data.price,
                data.type1,
                data.type2,
                data.detail,
                data.status,
                data.lockPr,
                data.idUser,
                data.image_1,
                data.image_2,
                year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
            ]
            );
            const fetchResult = await connection.query(
                `SELECT productId,name,price,type1,type2,detail,status,lockPr,idUser,CONCAT('http://192.168.0.106:6000/upload/',image_1) as image_1,
                CONCAT('http://192.168.0.106:6000/upload/',image_2) as image_2 , date
                FROM products WHERE productId = ?`, [queryResult[0].insertId]
            );
            await connection.commit();
            return fetchResult[0][0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    update: async (data) => {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const queryResult = await connection.query(
                `UPDATE products SET name=?,price=?,type1=?,type2=?,detail=?,image_1=?,image_2=?,date=? WHERE productId=?`, [
                data.name,
                data.price,
                data.type1,
                data.type2,
                data.detail,
                data.image_1,
                data.image_2,
                year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds,
                data.productId
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
    updateLockPr: async (data) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const queryResult = await connection.query(
                `UPDATE products SET lockPr=? WHERE productId=?`, [
                data.lockPr,
                data.productId
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
    deletePr: async (productId) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const fetchResult = await connection.query(`DELETE FROM products WHERE productId = (?)`, [productId]);
            await connection.commit();
            return fetchResult[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    getAllReport: async (productId) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const fetchResult = await connection.query(`SELECT id_lockPr,productId,list_idUser,dateRP FROM lock_products WHERE productId = ?`, [productId]);
            await connection.commit();
            return fetchResult[0];
        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    reportPr: async (data) => {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();
        let seconds = date_ob.getSeconds();
        const connection = await pool.getConnection();
        try {

            await connection.beginTransaction();
            const queryResult = await connection.query(
                `insert into lock_products 
                (productId,list_idUser,dateRP)
                values(?,?,?)`, [
                data.productId,
                data.list_idUser,
                year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
            ]
            );
            const fetchResult = await connection.query(
                `SELECT id_lockPr,productId,list_idUser,dateRP FROM lock_products WHERE id_lockPr = ?`, [queryResult[0].insertId]
            );
            await connection.commit();
            return fetchResult[0][0];


        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    }
};
