const express = require('express');
const app = express();
const users = require('./res/users.json');
const user_path = './res/users.json';
const request_path = './res/reqests.json';
const request = require('./res/reqests.json');
const fs = require('fs');

module.exports = {
    testing: function(){
        fs.readFile(user_path,null,(err,data)=>{
            if(!err){
                console.log(JSON.parse(data));
    
            }
        })
    },
    getusers: function(req,res){
        fs.readFile(user_path, null, function(err,data){
            if(!err){
                res.writeHead(200,{'content-type':'text/plain'});
                res.end(data);
                // for sending objects user res.send()
    
            }
        });
    },
    getUserRequest: function(req,res){
        fs.readFile(request_path,function(err,data){
            if(!err){
                id = parseInt(req.params.id);
                //console.log(user_id);
                requests = JSON.parse(data);
                usr_request = [];
                request.forEach(element => {
                    if(element.user_id){
                        if(element.user_id === id){
                            usr_request.push(element);
                        }
                    }
                });
               // console.log(usr_request);
               res.writeHead(200,{'content-type':'text/plain'});
              // console.log(JSON.stringify(usr_request));
               res.end(JSON.stringify(usr_request));
            }
        })
    },
    getUserByRequestId:function(req,res){
        fs.readFile(request_path,function(err,data){
            if(!err){
                id = parseInt(req.params.id);
                requests = JSON.parse(data);
                user_request = '';
                requests.forEach(element => {
                    if(element.request_id === id){
                        user_request = JSON.stringify(element);
                        
                    }
                });
                if(user_request){
                    res.writeHead(200,{'content-type':'text/plain'});
                    res.end(user_request);
                }else{
                    res.status(404).send('request not found')
                }
                
               // console.log(user_request);
            }
        });
    },
    postUserRequest: function(req,res){
        //console.log('hi')
        currentRequests = [];user_request = [];
        userRequest = req.body;
        fs.readFile(request_path,'utf8',function(err,data){
            if(!err && req.body){
                //console.log('go', data);
                //console.log('current',currentRequests);
                currentRequests = JSON.parse(data);
                userRequest.forEach(element=>{
                    element.request_id = currentRequests.length + 1;
                    element.status = "";
                    element.DateCreated = "";
                    element.DateApproved = "";
                });
                for(i = 0 ; i < userRequest.length; i++){
                    currentRequests.push(userRequest[i]);
                }
                //console.log('new',currentRequests);
                updateFile = JSON.stringify(currentRequests);
                if(updateFile){
                    fs.writeFile(request_path,updateFile,'utf8', (err) =>{
                        if(err) 
                            res.status(404).send('error creating request');
                        else
                            res.send(200).send('request created');   
                    })
                }
                
            }
        });

    },
    updateRequest: function(req,res){
        requestFound = false;pos = -1;
        fs.readFile(request_path, 'utf8', (err,data) => {
            if(!err && req.body){
                update_on_request = req.body[0];
                requests = JSON.parse(data);
                req_id = parseInt(req.params.id);
                for(i = 0; i <requests.length; i++){
                    if(requests[i].request_id === req_id){
                        pos = i;
                        requestFound = true;
                        requestToUpdate = requests[i];
                        console.log('old', requestToUpdate);
                        break;
                    }
                }
                if(requestFound == true && pos != -1){
                    //remove element from array;
                    requests.splice(pos,1);
                    requestToUpdate.compliants = update_on_request.complaints;
                    requestToUpdate.item = update_on_request.item;
                    requestToUpdate.item_category = update_on_request.item_category;
                    requestToUpdate.request_category = update_on_request.request_catgeory;
                    //add elements back
                    requests.push(requestToUpdate);
                    console.log('new', requestToUpdate);
                    updateFile = JSON.stringify(requests);
                    if(updateFile){
                        fs.writeFile(request_path,updateFile,'utf8', (err) =>{
                            if(err) 
                                res.status(404).send('error creating request');
                            else
                                res.status(200).send('record updated');   
                        });
                    }
                    
                    
                }else{
                    res.status(404).send('error updating');
                }
            }else{
                res.status(404).send('error modifying requests');
            }
        })

    },
    deleteRequest: function(req,res){
        requestFound = false;pos = -1;
        fs.readFile(request_path, 'utf8', (err,data) => {
            if(!err && req.body){
                update_on_request = req.body[0];
                requests = JSON.parse(data);
                req_id = parseInt(req.params.id);
                for(i = 0; i <requests.length; i++){
                    if(requests[i].request_id === req_id){
                        pos = i;
                        requestFound = true;
                        break;
                    }
                }
                if(requestFound == true && pos != -1){
                    requests.splice(pos,1);
                    
                    updateFile = JSON.stringify(requests);
                }
            }
            if(updateFile){
                fs.writeFile(request_path,updateFile,'utf8',(err)=>{
                    if(!err){
                        res.status(200).send('request deleted');
    
                    }else{
                        res.status(404).send('error occurred');
                    }
                })
            }
           
        })        
    }
     
}