const path  = require('path');
const express = require('express');
const app     = express();
// const serve   = require('http').createServer(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var fileUpload = require('express-fileupload');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');



const walletRouter = require("./routers/wallet.router");
const incomeRouter = require("./routers/income.router");
const expenseRouter = require("./routers/expense.router");
const debt_loanRouter = require("./routers/debt-loan.router");
const budgetRouter = require("./routers/budget.router");
const transactionRouter = require("./routers/transaction.router");
const userRouter = require("./routers/user.router");
const authRouter = require('./routers/auth.router');
const db = require('./database/database');
const savingRouter = require("./routers/saving.router");
const errorHandler = require('./middle-ware/error-handler');
//enabel CORS
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
    next();
});
// PORT ĐỂ TRUY CẬP APPLICATION
const port = process.env.PORT || 3000;

// SỬ DỤNG BUILT-IN MIDDLEWARE
app.use(express.static(path.join(__dirname, "../dist")));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());


// SỬ DỤNG ĐỂ CHỨNG THỰC PASSPORT
require('./config/passport')(passport);
app.use(cookieParser());
app.use(session({secret: 'meomeomeo',
				 saveUninitialized: true,
				 resave: true}));

app.use(passport.initialize());
app.use(passport.session());

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use("/api/wallet", walletRouter);
app.use("/api", incomeRouter);
app.use("/api", expenseRouter);
app.use("/api", debt_loanRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/budget", budgetRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/saving", savingRouter);
app.use(errorHandler.errorHandler());

app.listen(port, () =>{
    console.log(`serve hoạt động trên port ${port}`);
});