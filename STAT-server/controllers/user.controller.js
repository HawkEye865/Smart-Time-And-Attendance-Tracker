const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const UserModel = mongoose.model("User");

const RoleHelper =require('../helpers/role.helper');
const TeamHelper =require('../helpers/team.helper');
//const request = require('request');

module.exports.login = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err,user,info)=>{
        //error from passport
        if(err)
            return res.status(500).json({message: 'Internal Server Error: ' + err});
        //registered user
        else if(user) 
        {
            return res.status(200).json({token: user.generateJWT(), message :"Sign in successful"});
        }
        //unknown user or wrong password
        else
        {
            if(info.message == 'Missing credentials')
                return res.status(400).json(info);

            return res.status(404).json(info);
        }
            
    })(req,res);

}

module.exports.register = (req, res, next) => {
    if(!( req.body.name &&  req.body.surname && req.body.email && req.body.password && req.body.passwordConf)) 
    {
        return res.status(400).send({message: "Missing credentials"});
    }
    else if (req.body.password !== req.body.passwordConf) { //pass=passconfirm
        return res.status(400).send({message: "Passwords do not match"});
    }
    else{
            UserModel.findOne({ Email: req.body.email }, function(err, cons) { //check email duplicates
                if (err) return res.status(500).send({message: 'Internal Server Error: ' + err});

                if (cons){
                    return res.status(409).send({message: 'User already exists'});
                }
                else{
                    var user = new UserModel();
                    user.Name = req.body.name;
                    user.Surname = req.body.surname;
                    user.Email = req.body.email.toLowerCase();
                    user.Password = req.body.password;
                    user.Role = [5]; 
                    user.Authenticate = false; 
                    user.save((err, doc) => {
                        if(!err)
                            return res.status(201).json({token: user.generateJWT(), message :"Sign up successful"});
                        else 
                        {
                            if (err.code == 11000)
                                res.status(409).send({message: 'User already exists'});
                            else
                                return res.status(500).send({message: 'Internal Server Error: ' + err});
                        }
                    });
    
                }
    
            });
    }
}

module.exports.changePass = (req, res, next) => {
    UserModel.updateOne({ _id: req.ID},{Password: req.body.pass},(err, result) => {
        if (err) 
            return res.status(500).send({message: 'Internal Server Error: ' + err});
        else if (!result)
            return res.status(404).json({ message: 'User not found' }); 
        else
            return res.status(200).json({message: 'Password changed'});
               
    });
   
}   

module.exports.getName = (req, res, next) => {
    UserModel.findOne({ _id: req.ID},(err, result) => {
        if (err) 
            return res.status(500).send({message: 'Internal Server Error: ' + err});
        else if (!result)
            return res.status(404).json({ message: 'User not found' });
        else
            return res.status(200).json({name : result.Name, surname : result.Surname});
        
    });
}


module.exports.getRoles = (req, res, next) => {
    UserModel.findOne({ _id: req.ID},(err, result) => {
        if (err) 
            return res.status(500).send({message: 'Internal Server Error: ' + err});
        else if (!result)
            return res.status(404).json({ message: 'User not found' });
        
        else
        {
            var rolesOfUser = [];
            var i=0, done = false;
            for(i=0; i<result.Role.length; i++)
            {
                
                 RoleHelper.getRole(result.Role[i],(err,val)=>
                 {
                     if(err)
                        return res.status(500).send({message: 'Internal Server Error: ' + err});

                    else if(val == false) 
                        return res.status(404).json({ message: 'Role not found' });
                    else 
                    {
                        rolesOfUser.push(val);
                        if(rolesOfUser.length == result.Role.length)
                        {
                            return res.status(200).json({roles : rolesOfUser});
                        }
                    }
                });
            }  
        }
    });
    
}


module.exports.getUnauthenticatedUsers = (req, res, next) => {
    UserModel.find({  Authenticate : false},(err, result) => {
        if (err) 
            return res.status(500).send({message: 'Internal Server Error: ' + err});
        else if (!result)
            return res.status(404).json({ message: 'No unauthenticated users found' }); 
        else
        {
            UnauthenticatedUsers=[];
            for(var a=0; a<result.length; a++){
                UnauthenticatedUsers.push({ID : result[a]._id, email : result[a].Email, name : result[a].Name, surname : result[a].Surname});
            }
            return res.status(200).json({UnauthenticatedUsers});
        }
    });
}
//Only a security admin can make this request
//Parameters - None
//Returns - Array with all authenticated users objects
module.exports.getAllUsers = (req, res, next) => {
    UserModel.find({  Authenticate : true},(err, result) => {
        if (err) 
            return res.status(500).send({message: 'Internal Server Error: ' + err});
        else if (!result)
            return res.status(404).json({ message: 'No users found' }); 
        else
        {
            users=[];
            for(var a=0; a<result.length; a++){
                users.push({ID : result[a]._id, email : result[a].Email, name : result[a].Name, surname : result[a].Surname});
            }
            return res.status(200).json({users});
        }
    });
}
//Only a security admin can make this request
//Request body - ID of user to authenticate
//Returns - Succes or error message
module.exports.authenticate = (req, res, next) => {
    UserModel.updateOne({ _id: req.body.UserID},{Authenticate: true},(err, result) => {
        if (err) 
            return res.status(500).send({message: 'Internal Server Error: ' + err});
        else if (!result)
            return res.status(404).json({ message: 'User not found' }); 
        else
            return res.status(200).json({message: 'User authenticated'});
               
    });
}

module.exports.addTeam = (req, res, next) => {
    UserModel.findOne({_id : req.body.UserID}, function(err, result) {
        if(err) 
        {
            return res.status(500).send({message: 'Internal Server Error: ' + err});
        }
        else if (!result)
        {
            return res.status(404).send({message: 'User not found'});
        }
        else {
            result.Team.push(req.TeamID)
            result.save((err, doc) => {
                if(!err)
                {
                    return res.status(200).json({ teamID: req.TeamID, message: 'User successfully added to team' });
                }
                else
                    return res.status(500).send({message: 'Internal Server Error: ' + err});
            });
        }
    });
}

//Only a security admin can make this request
//Request body - ID of user to remove/reject
//Returns - Succes or error message
module.exports.remove = (req, res, next) => {
    UserModel.deleteOne({ _id: req.body.UserID},(err, result) => {
        if (err) 
            return res.status(500).send({message: 'Internal Server Error: ' + err});
        else if (!result)
            return res.status(404).json({ message: 'User not found' }); 
        else
            return res.status(200).json({message: 'User removed'});
               
    });
}
//Checks if the user is authenticated
//Returns - Value of Authenticated attribute
module.exports.isAuthenticated = (req, res, next) => {
    UserModel.findOne({ _id: req.ID},(err, result) => {
        if (err) 
            return res.status(500).send({message: 'Internal Server Error: ' + err});
        else if (!result)
            return res.status(404).json({ message: 'User not found' });
        else
            return res.status(200).json({ authenticated: result.Authenticate});
        
    });
  
}
module.exports.getTasks = (req, res, next) => {
    let error = false;
    let count = 0;
    let projectsOfUser = [];
    UserModel.findOne({ _id: req.ID},(err, result) => {
        if (err) 
            return res.status(500).send({message: 'Internal Server Error: ' + err});
        else if (!result)
            return res.status(404).json({ message: 'User not found' });
        
        else
        {
            if(result.Team.length == 0)
                return res.status(404).json({ message: 'User is not assigned to a team' });
            for(i=0; i<result.Team.length; i++)
            {
                TeamHelper.getTasksOfTeam(result.Team[i],(err,val)=>
                 {
                     count = count + 1;
                    if(err)
                    {
                        error = true;
                        return res.status(500).send({message: 'Internal Server Error: ' + err});
                    }
                    else if(val)
                    {
                        projectsOfUser.push(val);
                        if(count == result.Team.length)
                        {
                            return res.status(200).json({projects : projectsOfUser});
                        }
                    }
                    else
                    {
                        if(count == result.Team.length)
                        {
                            if(projectsOfUser.length == 0)
                                return res.status(404).json({ message:  'No projects found' });
                        }
                    }
                });
            }
            
        }
    });
}

