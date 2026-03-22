const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const admin_login_controller = require("../controllers/admin.login.controller");

router.post("/login",admin_login_controller.login);
    
module.exports = router;