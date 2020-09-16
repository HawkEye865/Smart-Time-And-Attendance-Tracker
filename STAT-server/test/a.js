var server = require ('../index.js')
var assert = require ('assert')
//var http = require ('http');


let chai =require('chai')
let chaiHttp =require('chai-http');

let should =chai.should()
let expect =chai.expect()

chai.use(chaiHttp)
//const request = require("supertest");


describe('test file 1', function() {


    
    describe('UNATHORISED USER SUITE', function() {
       require ('../non-functional testing/unauthorized.js')
    })

    describe('ATHORISED USER SUITE', function() {
      require ('../non-functional testing/authorized.js')
   })

   describe('ADMIN USER SUITE', function() {
    require ('../non-functional testing/admin.js')
 })

  /*
    describe('test PROJECT', function() {
       require ('./project.js')
      })
    describe('test USER TIME ENTRIES', function() {
       require ('./userTimeEntries.js')
      })
    describe('test TEAM', function() {
       require ('./team.js')
      })
    describe('test TASK', function() {
        require ('./task.js')
      })
    describe('iotDevice', function() {
        require ('./iotDevice.js')
      })
    describe('iotDevice', function() {
        require ('./role.js')
      })
*/

  })