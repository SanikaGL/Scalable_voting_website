const express = require("express");
const voter_route = require("./routes/register.voter.routes.js")
const app = express();
const connectDB = require("./config/db")
const login = require("./routes/login.voter.routes.js")
const candidate_approval = require("./routes/candidate.approval.routes.js")
const admin_preload = require("./routes/admin-preload.routes.js")
const admin_logout = require("./routes/admin-logout.routes.js");
const admin_login = require("./routes/admin-login.routes.js");
const { admin_token_verify, admin_Only} = require("./middleware/admin.token.verify.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

app.use(cors({
    origin: true, // your frontend
    credentials: true
}));
app.use(cookieParser());


const {preload_data} = require("./controllers/preload-data.js")
connectDB();
// preload_data();
// Middleware to parse JSON
app.use(express.json());




app.use(express.static(path.join(__dirname,"../../frontend")))
// app.use(express.static(path.join(__dirname, "../../frontend")));
console.log(preload_data);
// Simple test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});
app.get("/admin-page", admin_token_verify, admin_Only, (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/admin-page.html"));
});
app.use("/admin-login",admin_login);
app.use("/register",voter_route);//router for voting
app.use("/login",login);
app.use("/candidate-approval",candidate_approval);
app.use("/admin-preload",admin_preload);
app.use("/admin-logout",admin_logout);
module.exports = app;

             