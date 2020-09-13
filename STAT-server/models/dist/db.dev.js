"use strict";

/**
  * @file STAT-server/models/db.js
  * @author Vedha Krishna Velthapu, Jana Sander, Jesse Mwiti
  * @fileoverview This file handles the database connection.
  * @date 11 June 2020
 */

/**
* Filename:             STAT-server/models/db.js
*
* Author:               Vedha Krishna Velthapu, Jana Sander, Jesse Mwiti
*   
* File Creation Date:   11 June 2020
*
* Development Group:    Visionary
*
* Project:              Smart Time and Attendance Tracker
*
* Description:          This file handles the database connection.
*
*/
var mongoose = require('mongoose');

require("../config/config.js");

mongoose.set('useNewUrlParser', true);
mongoose.connect(decodeURIComponent(process.env.MONGODB_URI), function (err) {
  if (!err) {
    console.log('MongoDB connection succeeded.');
  } else {
    console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2));
  }
});

var Organisation = require("./organisation.model");

var Project = require("./project.model");

var User = require("./user.model");

var Task = require("./task.model");

var Team = require("./team.model");

var Role = require("./role.model");

var TimeEntry = require("./timeEntry.model");

var UserTimeEntry = require("./userTimeEntry.model");

var IOTDevice = require("./iotDevice.model");

var Calendar = require("./calendarEvents.model");