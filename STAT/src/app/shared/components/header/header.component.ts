/**
  * @file STAT\src\app\shared\components\header\header.component.ts
  * @author Vianka Naidoo, Munashe Mujaji
  * @fileoverview This file handles all the functions of the header component
  * @date 13 June 2020
 */

/**
* Filename:             STAT\src\app\shared\components\header\header.component.ts
*
* Author:               Vianka Naidoo, Munashe Mujaji
*   
* File Creation Date:   13 June 2020
*
* Development Group:    Visionary
*
* Project:              Smart Time and Attendance Tracker
*
* Description:          This file handles all the functions of the header component
*
*/ 

import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  closeResult: string;
  isLoggedIn: boolean;

  constructor(private modalService: NgbModal, private headerService : HeaderService) {
    this.headerService.isUserLoggedIn.subscribe( value => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('loggedIn') == 'true') {
      this.headerService.isUserLoggedIn.next(true);
    }
  }

  // modal
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  // LOGOUT
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('loggedIn');
    this.headerService.isUserLoggedIn.next(false);
    this.headerService.kickOut();
  }
}
