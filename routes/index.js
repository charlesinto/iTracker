const fs = require('fs');
module.exports = {
    index: function(req,res,data){
        res.status(200);   
        res.writeHead(200,{'content-type':'text/html'});
        res.write(data);
    }
}