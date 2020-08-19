/**
  * @file STAT\src\app\app.module.ts
  * @author Vianka Naidoo, Munashe Mujaji
  * @fileoverview This file handles all the functions of the app module 
  * @date 13 June 2020
 */

/**
* Filename:              STAT\src\app\app.module.ts
*
* Author:               Vianka Naidoo, Munashe Mujaji
*   
* File Creation Date:   13 June 2020
*
* Development Group:    Visionary
*
* Project:              Smart Time and Attendance Tracker
*
* Description:          This file handles all the functions of the app module 
*
*/ 

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { StartupModule } from './startup/startup.module';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { MatIconModule } from '@angular/material/icon';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StartupModule,
    MaterialComponentsModule,
    FormsModule,
    DashboardModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgxMatSelectSearchModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
