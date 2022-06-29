const router = require("express").Router();
const { find, findLock, displayPr, findById, findType1, findType2, create, update, updateLockPr, deletePr, getAllReport, reportPr, loginUser, findUser, findUserById, createUser, updateUser, deleteUser, favoriteCr, getFavorites } = require("../controller/pu.controller");
const multer = require("multer");
const webapp = require("../controller/webapp.controller");
const path = require("path");

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({
    storage: storage,
}).fields([{
    name: 'image_1',
    maxCount: 1
}, {
    name: 'image_2',
    maxCount: 1
}]);

//------------- PRODUCT-------------
// getAll 
router.get("/findAll", find);
//get Pr Lock
router.get("/findLock", findLock);
router.get("/getDisplay", displayPr);
//get theo id
router.get("/getById", findById);
// get theo type
router.get("/type1", findType1);
router.get("/type2", findType2);
// insert
router.post("/insert", create);
//update update
router.put("/update", upload, update);
router.put("/updateLock", updateLockPr);
//delêt
router.delete("/delete", deletePr);
//report
router.post("/report", reportPr);
//
router.get("/getAllReport", getAllReport);
// favorite
router.post("/favorite", favoriteCr);
router.get("/getfavorite", getFavorites)
//------------- USER---------------
//login user
router.post("/login", loginUser);
//
router.get("/findAllUser", findUser);
//get theo id
router.get("/findUserById", findUserById);
// insert
router.post("/register", createUser);
//update update
router.put("/updateUser", updateUser);
//delêt
router.delete("/deleteUser", deleteUser);

//------------- WEB APP---------------
//tin 
router.get("/login", (req, res) => {
    res.render("login-admin");
});
router.get('/post-page', webapp.view);
router.get('/home', (req, res, next) => {
    res.render('home');
});
//lock post
router.post('/lock-productU/:productId', webapp.update);
//lockout post
router.get('/lockout-productU/:productId', webapp.lockoutPost);
//showdata pót detail
router.get('/lock-product/:productId', webapp.edit);
//delete
router.get('/delete-pr/:productId', webapp.delete);
//user
router.get('/user-mng', webapp.viewUser);
//lockUser
router.get('/lock-user/:idUser', webapp.lockUser);
//mở
router.get('/lockout-user/:idUser', webapp.lockoutUser);
//
module.exports = router;