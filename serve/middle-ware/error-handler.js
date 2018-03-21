exports.errorHandler = function () {
    return function (err, req, res, next) {
      if (err) {
        console.log(err);
        
        res.status(err.statusCode || 500).send({
          statusCode: err.statusCode || 500,
          message: err.message
        });
      }
    };
  };
  