// const path  = require('path');
// const express = require('express');
// const app     = express();
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// var fileUpload = require('express-fileupload');
// const passport = require('passport');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');


// const walletRouter = require(path.join(__dirname, "/serve/routers/wallet.router"));
// const incomeRouter = require(path.join(__dirname, "/serve/routers/income.router"));
// const expenseRouter = require(path.join(__dirname, "/serve/routers/expense.router"));
// const debt_loanRouter = require(path.join(__dirname, "/serve/routers/debt-loan.router"));
// const budgetRouter = require(path.join(__dirname, "/serve/routers/budget.router"));
// const transactionRouter = require(path.join(__dirname, "/serve/routers/transaction.router"));
// const userRouter = require(path.join(__dirname, "/serve/routers/user.router"));
// const authRouter = require(path.join(__dirname, '/serve/routers/auth.router'));
// const db = require(path.join(__dirname, '/serve/database/database'));
// const savingRouter = require(path.join(__dirname, "/serve/routers/saving.router"));
// const errorHandler = require(path.join(__dirname, '/serve/middle-ware/error-handler'));

// PORT ĐỂ TRUY CẬP APPLICATION
//const port = process.env.port || 3000;

//SỬ DỤNG BUILT-IN MIDDLEWARE
// app.use(express.static(__dirname + '/dist'));
// app.use(bodyParser.urlencoded({ extended: false}));
// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(fileUpload());

// SỬ DỤNG ĐỂ CHỨNG THỰC PASSPORT
// require(path.join(__dirname, 'serve/config/passport'))(passport);
// app.use(cookieParser());
// app.use(session({secret: 'meomeomeo',
// 				 saveUninitialized: true,
// 				 resave: true}));

// app.use(passport.initialize());
// app.use(passport.session());

// app.all('*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

// app.use("/api/wallet", walletRouter);
// app.use("/api", incomeRouter);
// app.use("/api", expenseRouter);
// app.use("/api", debt_loanRouter);
// app.use("/api/transaction", transactionRouter);
// app.use("/api/budget", budgetRouter);
// app.use("/api/auth", authRouter);
// app.use("/api/user", userRouter);
// app.use("/api/saving", savingRouter);
// app.use(errorHandler.errorHandler());
//app.use(express.static(__dirname + '/dist'));



// app.listen(port, () =>{
//     console.log(`serve hoạt động trên port ${port}`);
// });

//Install express server
const express = require('express');
const app = express();

// // Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

// Start the app by listening on the default Heroku port
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> {
    console.log(`Server started in port: ${PORT}`);
});
