/**
  * @file STAT\src\app\app.component.ts
  * @author Vianka Naidoo, Munashe Mujaji
  * @fileoverview This file handles all the functions of the app  component
  * @date 13 June 2020
 */

/**
* Filename:             STAT\src\app\app.component.ts
*
* Author:               Vianka Naidoo, Munashe Mujaji
*   
* File Creation Date:   13 June 2020
*
* Development Group:    Visionary
*
* Project:              Smart Time and Attendance Tracker
*
* Description:          This file handles all the functions of the app  component
*
*/ 

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  encapsulation: ViewEncapsulation.None
  
})
export class AppComponent {
  title = 'STAT';
}
