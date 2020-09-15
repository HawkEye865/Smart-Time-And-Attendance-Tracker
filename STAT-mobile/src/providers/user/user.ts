import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class User {
  private ROOT_URL = "http://localhost:3000/api/";

  public roles = localStorage.getItem('roles');

  constructor(public http: HttpClient) { }
  //check if authenticated
  public isAuthenticated(values) {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json').set( 'Authorization', "Bearer "+values);

    return this.http.get(this.ROOT_URL+'user/isAuthenticated', {
      headers: headers
    });
  }

    // sign in
    public signIn(values){
      const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');
      return this.http.post(this.ROOT_URL+'user/login', JSON.stringify(values), {
        headers: headers
      });
    }
    //get roles
    public getRoles(values){
      const headers = new HttpHeaders()
            .set('Content-Type', 'application/json').set( 'Authorization', "Bearer "+values);
      return this.http.get(this.ROOT_URL+'user/getRoles', {
        headers: headers
      });
    }
    //get name
    public getName(values){
      const headers = new HttpHeaders()
            .set('Content-Type', 'application/json').set( 'Authorization', "Bearer "+values);
      return this.http.get(this.ROOT_URL+'user/getName', {
        headers: headers
      });
    }
    //Get user's projects and tasks
    public getProjectsAndTasks(token){
      const headers = new HttpHeaders()
            .set('Content-Type', 'application/json').set( 'Authorization', "Bearer "+token);
      return this.http.get(this.ROOT_URL+ 'user/getProjects', {
        headers: headers
      });
    }
    //Get time entries for the day
    public getTimeEntries(date, token){
      const headers = new HttpHeaders()
            .set('Content-Type', 'application/json').set( 'Authorization', "Bearer "+token);
            let parameters = new HttpParams();
            parameters = parameters.append('date', date);
      return this.http.get(this.ROOT_URL+ 'userTimeEntry/getDailyTimeEntries',{
        params: parameters,
        headers: headers
      });
    }


    // ANALYSIS

    //Get user's daily totals for the last week
    public getDailyValues(key){
      const headers = new HttpHeaders()
            .set('Content-Type', 'application/json').set( 'Authorization', "Bearer "+key);
      return this.http.get(this.ROOT_URL+ 'userTimeEntry/getUserDailyTotalTime', {
        headers: headers
      });
    }

    //Get user's daily monetary value totals for the last week
  public getDailyMoney(key){
    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json').set( 'Authorization', "Bearer "+key);
    return this.http.get(this.ROOT_URL+ 'userTimeEntry/getUserDailyTotalMoney', {
      headers: headers
    });
  }

  //Get user's time for each project for the last week
  public getWeeklyProjectsTimes(key){
    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json').set( 'Authorization', "Bearer "+key);
    return this.http.get(this.ROOT_URL+ 'userTimeEntry/getUserWeeklyTimeForProjects', {
      headers: headers
    });
  }

  //Get user's time for each task for the last week
  public getWeeklyTasksTimes(key){
    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json').set( 'Authorization', "Bearer "+key);
    return this.http.get(this.ROOT_URL+ 'userTimeEntry/getUserWeeklyTimeForTasks', {
      headers: headers
    });
  }

  //Get devices user used for the last week
  public getDevices(key){
    const headers = new HttpHeaders()
          .set('Content-Type', 'application/json').set( 'Authorization', "Bearer "+key);
    return this.http.get(this.ROOT_URL+ 'userTimeEntry/getUserDevices', {
      headers: headers
    });
  }
}
