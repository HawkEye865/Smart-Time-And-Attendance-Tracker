/**
  * @file STAT\src\app\app-routing.module.ts
  * @author Vianka Naidoo, Munashe Mujaji
  * @fileoverview This file handles all the functions of the app-routing module
  * @date 13 June 2020
 */

/**
* Filename:            STAT\src\app\app-routing.module.ts
*
* Author:               Vianka Naidoo, Munashe Mujaji
*   
* File Creation Date:   13 June 2020
*
* Development Group:    Visionary
*
* Project:              Smart Time and Attendance Tracker
*
* Description:          This file handles all the functions of the app-routing module
*
*/ 

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './startup/components/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
