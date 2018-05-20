const http = require('http');
let home_url  = '/iTracker/';
const path = require('path');
const fs = require('fs');
const express = require('express');
const routes = require('./routes/index');
const hub = require('./hub');
const app = express();
const apiVersion = require('./ap1.js');
app.use(express.json());
app.use(express.static('public'));
app.get(home_url, (req,res) =>{
    fs.readFile('./index.html', null, (err, data) => {
        if(err){
            res.status(404).send('error loading page')
        }
        else{ 
            routes.index(req,res,data);
           // hub.testing();
        }
    });
});
app.use('/v1', apiVersion);
//app.get(home_url + 'api/v1/users', (req,res) => hub.getusers(req,res));
/*
app.get(home_url + 'api/v1/users/:id/requests', (req,res) => hub.getUserRequest(req,res));
app.get(home_url + 'api/v1/users/requests/:id', (req,res) => hub.getUserByRequestId(req,res));
app.post(home_url + 'api/v1/users/requests',(req,res)=>hub.postUserRequest(req,res));
app.put(home_url + 'api/v1/users/requests/:id', (req,res) => hub.updateRequest(req,res));
app.delete(home_url + 'api/v1/users/requests/:id',(req,res)=>hub.deleteRequest(req,res));*/
const port = process.env.PORT || 7400;
if(!module.parent){
    app.listen(port, () => console.log(`Listening on ${port}`));
}

module.exports = app;