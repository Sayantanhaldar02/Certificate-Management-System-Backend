const { handelRegisterController, handelLoginController, handelGetAllUsers } = require("../controller/user.controller");

const router = require("express").Router();


router.post('/register',handelRegisterController);
router.post('/login',handelLoginController);
router.get('/login',handelGetAllUsers);


module.exports = {
    authRouter: router
}