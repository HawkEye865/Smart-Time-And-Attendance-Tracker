/**
  * @file STAT-server/helper/role.helper.js
  * @author Vedha Krishna Velthapu, Jana Sander, Jesse
  * @fileoverview This file handles some of the requests regarding Role model in our database. 
  * This is a helper file to handle Role related requests.
  * @date 15 July 2020
 */

/**
* Filename:             STAT-server/helper/role.helper.js
*
* Author:               Vedha Krishna Velthapu, Jana Sander, Jesse 
*   
* File Creation Date:   15 July 2020
*
* Development Group:    Visionary
*
* Project:              Smart Time and Attendance Tracker
*
* Description:          This file handles some of the requests regarding Role model in our database. 
*                       This is a helper file to handle Role related requests.
*
*/
const mongoose = require("mongoose");
const RoleModel = mongoose.model("Role");

 /**
  * 
  * @param {*} id ID of role.
  * @param {*} done 
  * @return {String} - Role of given ID.
  */
module.exports.getRole = (id, done)=>{
    RoleModel.findOne({ID: id},(err, result) => {
        if(err) 
            done(err);
        else if (!result)
            done(null,false);
        else if(result)
           done(null, result.Role);
        
    });
}


