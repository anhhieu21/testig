const pool = require('../config/db');


module.exports = {
    favoriteCr: async (data) => {
        const connection = await pool.getConnection();
        try {

            await connection.beginTransaction();
            const queryResult = await connection.query(
                `insert into favorites 
                (productId,name,price,image,idUser)
                values(?,?,?,?,?)`, [
                data.productId,
                data.name,
                data.price,
                data.image,
                data.idUser,
            ]
            );
            const fetchResult = await connection.query(
                `SELECT idFavorites ,productId,name,price,image, idUser FROM favorites WHERE idFavorites = ?`, [queryResult[0].insertId]
            );
            await connection.commit();
            return fetchResult[0][0];


        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
    getFavorites: async (idUser) => {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();
            const fetchResult = await connection.query(
                `SELECT idFavorites ,productId,name,price,image, idUser FROM favorites WHERE idUser = ?`, [idUser]
            );
            await connection.commit();
            return fetchResult[0];


        } catch (error) {
            return error;
        } finally {
            connection.release();
        }
    },
};