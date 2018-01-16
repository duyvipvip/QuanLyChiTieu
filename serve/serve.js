const path  = require('path');
var express = require('express');
var app     = express();
var serve   = require('http').createServer(app);

// ĐƯỜNG DẪN ĐẾN THƯ MỤC PUBLIC
const publicPath = path.join(__dirname, "../src", );

// PORT ĐỂ TRUY CẬP APPLICATION
const port = process.env.port || 3000;

// SỬ DỤNG BUILT-IN MIDDLEWARE 
app.use(express.static(publicPath));

serve.listen(port, () =>{
    console.log(`serve hoạt động trên port ${port}`);
});
  
