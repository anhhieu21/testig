const { find, findLock, displayPr, findById, findType1, findType2, create, update, updateLockPr, deletePr, getAllReport, reportPr } = require('../service/product.service');
const { loginUser, findUser, findUserById, createUser, updateUser, deleteUser } = require('../service/user.service');
const { favoriteCr, getFavorites } = require('../service/favorite.service');
const pool = require('../config/db');
module.exports = {

    // tin 
    find: async (req, res) => {
        try {
            const product = await find();
            return res.status(200).json({product});
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    findLock: async (req, res) => {
        try {
            var idUser = req.query.idUser;
            const result = await findLock(idUser);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    displayPr: async (req, res) => {
        try {
            var idUser = req.query.idUser;
            const result = await displayPr(idUser);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    findById: async (req, res) => {
        try {
            var productId = req.query.productId;
            const result = await findById(productId);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    findType1: async (req, res) => {
        try {
            var type1 = req.query.type1;
            const result = await findType1(type1);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    findType2: async (req, res) => {
        try {
            var type2 = req.query.type2;
            const result = await findType2(type2);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    create: async (req, res) => {
        try {
            var data = req.body;
            // if (req.files["image_1"])
            //     data["image_1"] = req.files["image_1"][0].filename;

            // if (req.files["image_2"])
            //     data["image_2"] = req.files["image_2"][0].filename;

            const result = await create(data);
            return res.status(200).json({ result });
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    update: async (req, res) => {
        try {
            var data = req.body;
            if (req.files["image_1"])
                data["image_1"] = req.files["image_1"][0].filename;

            if (req.files["image_2"])
                data["image_2"] = req.files["image_2"][0].filename;

            const result = await update(data);
            return res.status(201).json(result);
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    updateLockPr: async (req, res) => {
        try {
            var data = req.query;
            const result = await updateLockPr(data);
            return res.status(201).json(result);
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    deletePr: async (req, res) => {
        try {
            var productId = req.query.productId;
            const result = await deletePr(productId);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    getAllReport: async (req, res) => {
        try {
            var productId = req.query.productId;
            const result = await getAllReport(productId);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    reportPr: async (req, res) => {
        try {
            var data = req.query;
            const result = await reportPr(data);
            console.log(result.list_idUser + data.list_idUser);
            // if(result.list_idUser===data.list_idUser){
            //     return res.status(500).send({ error: 'Report không thành công' });
            // }else{
            return res.status(201).json(result);
            // }
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    //user
    loginUser: async (req, res) => {
        try {
            // var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
            // var valid = emailRegex.test(email);
            var email = req.query.email;
            var password = req.query.password;
            console.log(email, password);
            const result = await loginUser(email, password);
            if (email.length > 0 && password.length >= 6) {
                return res.status(200).json({ result });
            } else {
                return res.status(500).send({ error: 'Login Failed 1' });
            }
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    findUser: async (req, res) => {
        try {
            const result = await findUser();
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    findUserById: async (req, res) => {
        try {
            var idUser = req.query.idUser;
            const result = await findUserById(idUser);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    createUser: async (req, res) => {
        try {
            var data = req.body;
            // if (req.files["image_1"])
            //     data["image_1"] = req.files["image_1"][0].filename;

            // if (req.files["image_2"])
            //     data["image_2"] = req.files["image_2"][0].filename;

            const result = await createUser(data);
            return res.status(200).json({ result });
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    updateUser: async (req, res) => {
        try {
            var data = req.query;

            // if (req.files["image_1"])
            //     data["image_1"] = req.files["image_1"][0].filename;

            // if (req.files["image_2"])
            //     data["image_2"] = req.files["image_2"][0].filename;
            const result = await updateUser(data);
            return res.status(201).json(result);
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    deleteUser: async (req, res) => {
        try {
            var idUser = req.query.idUser;
            const result = await deleteUser(idUser);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },

    //favorite
    favoriteCr: async (req, res) => {
        try {
            var data = req.query;
            const result = await favoriteCr(data);
            return res.status(201).json(result);
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    getFavorites: async (req, res) => {
        try {
            var idUser = req.query.idUser;
            const result = await getFavorites(idUser);
            return res.status(200).json(result);
        } catch (e) {
            return res.status(500).json({
                "message": "Internal Server Error"
            });
        }
    },
    //view
    
};