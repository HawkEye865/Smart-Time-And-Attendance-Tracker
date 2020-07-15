const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');
const role = require('../controllers/role.controller');
const userTimeEntry = require('../controllers/userTimeEntry.controller');
const team = require('../controllers/team.controller');
const project = require('../controllers/project.controller');
const task = require('../controllers/task.controller');

const jwtHelper = require('../config/jwtHelper');
const userHelper = require('../helpers/user.helper');

router.post("/user/register", user.register);
router.post("/user/login", user.login);
router.get("/user/getRoles",jwtHelper.verifyJWTtoken, user.getRoles);
router.get("/user/getName",jwtHelper.verifyJWTtoken, user.getName);
//router.get("/user/authenticateUser",jwtHelper.verifyJWTtoken, userHelper.isSecurityAdmin, user.authenticate);

router.get("/role/getRole", jwtHelper.verifyJWTtoken, userHelper.isAuthenticated, role.getRole);
router.post("/role/addRole",jwtHelper.verifyJWTtoken, userHelper.isSecurityAdmin, role.add);

router.post("/userTimeEntry/addTimeEntry", jwtHelper.verifyJWTtoken,userHelper.isAuthenticated, userTimeEntry.addTimeEntry);
router.get("/userTimeEntry/getDailyTimeEntries", jwtHelper.verifyJWTtoken,userHelper.isAuthenticated, userTimeEntry.getDailyTimeEntries);

router.get("/user/getUnauthenticatedUsers",jwtHelper.verifyJWTtoken,userHelper.isSecurityAdmin,user.getUnauthenticatedUsers);

router.post("/team/addTeamMember",jwtHelper.verifyJWTtoken,userHelper.isTeamLeader,team.addTeamMember);
router.post("/team/assignProject",jwtHelper.verifyJWTtoken,userHelper.isTeamLeader,team.assignProject);

router.post("/project/addTask",jwtHelper.verifyJWTtoken,userHelper.isTeamLeader,project.addTask);
router.post("/project/complete",jwtHelper.verifyJWTtoken,userHelper.isTeamLeader,project.complete);
router.post("/project/uncomplete",jwtHelper.verifyJWTtoken,userHelper.isTeamLeader,project.uncomplete);
router.post("/project/update",jwtHelper.verifyJWTtoken,userHelper.isTeamLeader,project.update);

router.post("/task/update",jwtHelper.verifyJWTtoken,userHelper.isTeamLeader,task.update);
module.exports = router;