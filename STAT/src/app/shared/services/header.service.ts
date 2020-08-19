/**
  * @file STAT\src\app\shared\services\header.service.ts
  * @author Vianka Naidoo, Munashe Mujaji
  * @fileoverview This file handles all the functions of the history services
  * @date 13 June 2020
 */

/**
* Filename:             STAT\src\app\shared\services\header.service.ts
*
* Author:               Vianka Naidoo, Munashe Mujaji
*   
* File Creation Date:   13 June 2020
*
* Development Group:    Visionary
*
* Project:              Smart Time and Attendance Tracker
*
* Description:          This file handles all the functions of the header services
*
*/ 

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private router : Router) { }

  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  // force sign out when token expires
  kickOut()
  {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('loggedIn');
    this.isUserLoggedIn.next(false);

    this.router.navigate(['/sign-in']);
  }
}
