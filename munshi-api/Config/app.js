"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const pg_1 = __importDefault(require("pg"));
const cors_1 = __importDefault(require("cors"));
const user_1 = require("../Models/user");
const user = new user_1.User;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.set('views', path_1.default.join(__dirname, '../Views'));
app.set('view engine', 'ejs');
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../node_modules')));
exports.db = new pg_1.default.Client({
    host: "127.0.0.1",
    user: "patelp",
    port: 5432,
    password: "password",
    database: "munshidb"
});
exports.db.connect();
app.post("/login", (req, res) => {
    user.EmailAddress = req.body.user_email_address;
    user.Password = req.body.user_password;
    user.UserBusinessID = req.body.user_business_id;
    const loginSql = `SELECT * FROM users WHERE user_email_address = '${user.EmailAddress}' AND user_password = '${user.Password}'`;
    const businessCheck = `SELECT * FROM businesses WHERE business_id = ${user.UserBusinessID}`;
    exports.db.query(businessCheck, (err, result) => {
        if (result.rowCount == 1) {
            exports.db.query(loginSql, (err, result) => {
                if (err) {
                    console.log(err.message);
                }
                else {
                    if (result.rowCount > 0) {
                        res.send(result.rows);
                    }
                    else {
                        res.send({ message: "User credentials does not match!" });
                    }
                }
            });
        }
        else {
            res.send({ message: "Business does not exists in database!" });
        }
    });
});
app.post("/register", (req, res) => {
    user.EmailAddress = req.body.user_email_address;
    user.Password = req.body.user_password;
    user.FirstName = req.body.user_fname;
    user.LastName = req.body.user_lname;
    user.Phone = req.body.user_phone;
    user.Address = req.body.user_address;
    user.TypeID = req.body.user_type_id;
    user.UserBusinessID = req.body.user_business_id;
    const insertSql = `INSERT INTO users (user_email_address, user_password, user_fname, user_lname, user_phone, user_address, user_type_id) VALUES ('${user.EmailAddress}', '${user.Password}', '${user.FirstName}', '${user.LastName}', '${user.Phone}', '${user.Address}', '${user.TypeID}')`;
    const businessCheck = `SELECT * FROM businesses WHERE business_id = ${user.UserBusinessID}`;
    exports.db.query(businessCheck, (err, result) => {
        if (result.rowCount == 1) {
            exports.db.query(insertSql, (err, result) => {
                if (result) {
                    res.send(result);
                }
                else {
                    res.send({ message: "Some required data does not match parameters!" });
                }
            });
        }
        else {
            res.send({ message: "Business does not exists in database!" });
        }
    });
});
app.get("/", async (req, res) => {
    res.send("Hello!");
});
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
exports.default = app;
//# sourceMappingURL=app.js.map