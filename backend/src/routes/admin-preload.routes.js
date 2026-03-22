const express = require("express");
// const admin_verify = require("../middleware/admin.token.verify");
const {preload_data} = require("../controllers/preload-data")
const router = express.Router();
router.get("/preload-candidate",preload_data);
module.exports=router;
 //  ,admin_verify.admin_token_verify,admin_verify.admin_Onl
 //add the above after testing 