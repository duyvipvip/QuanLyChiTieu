const path  = require('path');
const express = require('express');
const app     = express();
// const serve   = require('http').createServer(app);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const walletRouter = require("./routers/wallet.router");
const incomeRouter = require("./routers/income.router");
const expenseRouter = require("./routers/expense.router");
const debt_loanRouter = require("./routers/debt-loan.router");
const userRouter = require("./routers/user.router");
const savingRouter = require("./routers/saving.router");
const walletTransactionRouter = require("./routers/walletTransaction.router");
const savingTransactionRouter = require("./routers/savingtransaction.router");
const db = require('./database/database');


// PORT ĐỂ TRUY CẬP APPLICATION
const port = process.env.port || 3000;

// SỬ DỤNG BUILT-IN MIDDLEWARE 
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use("/api", walletRouter);
app.use("/api", incomeRouter);
app.use("/api", expenseRouter);
app.use("/api", debt_loanRouter);
app.use("/api", userRouter);
app.use("/api", savingRouter);
app.use("/api", savingTransactionRouter);
app.use("/api", walletTransactionRouter);

app.listen(port, () =>{
    console.log(`serve hoạt động trên port ${port}`);
});