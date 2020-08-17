const mongoose = require("mongoose");
const UserModel = mongoose.model("User");

//checks to see if user has a role of "Security Administrator"
module.exports.isSecurityAdmin = (req, res, next) => {

    UserModel.findOne({ _id: req.ID},(err, result) => {
        if (err) 
            return res.status(500).send({message: 'Internal Server Error: ' + err});
        else if (!result)
            return res.status(404).json({ message: 'User not found' });
        
        else
        {
            if(result.Role.includes(3))
                next();
            else
                return res.status(403).json({ message: "Access denied"});
        }
    });
    
}

//checks to see if user has a role of "Team Leader"
module.exports.isTeamLeader = (req, res, next) => {

    UserModel.findOne({ _id: req.ID},(err, result) => {
        if (err) 
            return res.status(500).send({message: 'Internal Server Error: ' + err});
        else if (!result)
            return res.status(404).json({ message: 'User not found' });
        
        else
        {
            if(result.Role.includes(4))
                next();
            else
                return res.status(403).json({ message: "Access denied"});
        }
    });  
}

//checks to see if user is authenticated
module.exports.isAuthenticated = (req, res, next) => {

    UserModel.findOne({ _id: req.ID},(err, result) => {
        if (err) 
            return res.status(500).send({message: 'Internal Server Error: ' + err});
        else if (!result)
            return res.status(404).json({ message: 'User not found' });
        
        else
        {
            if(result.Authenticate == true)
                next();
            else
                return res.status(403).json({ message: "Not authenticated"});
        }
    });
  
}

module.exports.addTeam = (id, teamID, done) => {
    UserModel.updateOne({_id : id},{ $push: { Team: teamID } }, function(err, result) {
        if(err) 
            done(err);
        
        else if (!result)
            done(null, false);
     
        else
            done(null, true);
        
    });
}
//Deletes team from Team array
module.exports.deleteTeam = (ids, teamID, done) => {

    UserModel.updateMany({_id:{$in: ids}},{ $pull: { Team: teamID}},(err, result) => {
        if (err) 
            done(err);
        else if (!result)
            done(null, false);
        else
            done(null, false);
        
    });
  
}