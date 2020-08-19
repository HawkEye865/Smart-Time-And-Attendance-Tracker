/**
  * @file STAT\src\app\shared\services\team-management.spec.ts
  * @author Vianka Naidoo, Munashe Mujaji
  * @fileoverview This file handles all the tests of the team-management services
  * @date 13 June 2020
 */

/**
* Filename:            STAT\src\app\shared\services\team-management.service.spec.ts
*
* Author:               Vianka Naidoo, Munashe Mujaji
*   
* File Creation Date:   13 June 2020
*
* Development Group:    Visionary
*
* Project:              Smart Time and Attendance Tracker
*
* Description:          This file handles all the tests of the team-management services
*/

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TeamManagementService } from './team-management.service';

describe('Unit tests:', () => {
  describe( TeamManagementService', () => {
    let service: TeamManagementService;
    let HttpMock: HttpTestingController;
    let ROOT_URL = "http://localhost:3000/api/";
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [TeamManagementService]
      });
      service = TestBed.inject(TeamManagementService);
      HttpMock = TestBed.inject(HttpTestingController);
    });
    afterEach(async() =>{
      HttpMock.verify();
    })
  })
})
