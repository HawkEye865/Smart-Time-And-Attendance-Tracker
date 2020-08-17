/**
  * @file STAT\src\app\dashboard\main\main.component.ts
  * @author Vianka Naidoo, Munashe Mujaji
  * @fileoverview This file handles all the functions of the main component
  * @date 13 June 2020
 */

/**
* Filename:             STAT\src\app\dashboard\main\main.component.ts
*
* Author:               Vianka Naidoo, Munashe Mujaji
*   
* File Creation Date:   13 June 2020
*
* Development Group:    Visionary
*
* Project:              Smart Time and Attendance Tracker
*
* Description:          This file handles all the functions of the main component
*
*/ 
import { Component, OnInit } from '@angular/core';
import { AccountManagementService } from 'src/app/shared/services/account-management.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  isAuth : boolean
  roles : any
  // active tab
  active : string;

  constructor(public service : AccountManagementService) {
    this.roles =  this.service.roles
    this.isAuth = true
  }

  ngOnInit(): void {
    console.log(this.roles)

    const hamburger = document.getElementById('hamburger');
    const wrapper = document.getElementById('wrapper');

    hamburger.addEventListener('click', () => {
      wrapper.classList.toggle('open')
    });

    this.active = 'history';
  }

  // set active tab after component initialisation
  ngAfterViewInit(): void {
    const navItem = document.getElementById('history');
    navItem.classList.add('active');
  }

  // set new active tab after click
  setActive(tabName : string) {
    const currActive = document.getElementsByClassName('active')[0];
    currActive.classList.remove('active');
    const link = document.getElementById(tabName);
    link.classList.add('active');
    this.active = tabName;
  }


}
