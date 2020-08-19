/**
  * @file STAT\src\app\shared\services\tracking.service.ts
  * @author Vianka Naidoo, Munashe Mujaji
  * @fileoverview This file handles all the functions of the tracking services
  * @date 13 June 2020
 */

/**
* Filename:             STAT\src\app\shared\services\tracking.service.ts
*
* Author:               Vianka Naidoo, Munashe Mujaji
*   
* File Creation Date:   13 June 2020
*
* Development Group:    Visionary
*
* Project:              Smart Time and Attendance Tracker
*
* Description:          This file handles all the functions of the tracking services
*
*/ 

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {

  constructor(public http: HttpClient) { }
  private ROOT_URL = "http://localhost:3000/api/";
  EntryID : string

  // Add manual time entry
  public addMTimeEntry(values, token) {
    let epoch = new Date(values.Date +" " +values.StartTime).getTime();
    values.StartTime = epoch;
    epoch = new Date(values.Date +" " +values.EndTime).getTime();
    values.EndTime = epoch;
    if(!values.Description)
      values.Description = "Manual Entry";
    values.Device = "Website";
    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json').set( 'Authorization', "Bearer "+token);

    return this.http.post(this.ROOT_URL+'userTimeEntry/addTimeEntry', JSON.stringify(values), {
      headers: headers
    });
  }
  //Add "automatic" time entry
  /*public addATimeEntry(values, token) {
    let date =  new Date()
    let epoch = date.getTime();
    let dateStr = formatDate(date, 'yyyy/MM/dd', 'en');
    values.Date = dateStr;
    values.StartTime = epoch;
    if(!values.Description)
      values.Description = "Timed Entry";
    values.Device = "Website";
    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json').set( 'Authorization', "Bearer "+token);

    return this.http.post(this.ROOT_URL+'userTimeEntry/addTimeEntry', JSON.stringify(values), {
      headers: headers
    });
  }*/
  //Update time entry
  /*public updateTimeEntry(values, token) {
    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json').set( 'Authorization', "Bearer "+token);
    return this.http.post(this.ROOT_URL+'userTimeEntry/updateTimeEntry', JSON.stringify(values), {
      headers: headers
    });
  }*/
  //Get user's projects and tasks
  public getProjectsAndTasks(values){
    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json').set( 'Authorization', "Bearer "+values);
    return this.http.get(this.ROOT_URL+ 'user/getTasks', {
      headers: headers
    });
  }
  
}
