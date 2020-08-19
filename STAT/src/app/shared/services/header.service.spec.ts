/**
  * @file STAT\src\app\shared\services\header.spec.ts
  * @author Vianka Naidoo, Munashe Mujaji
  * @fileoverview This file handles all the tests of the header services
  * @date 13 June 2020
 */

/**
* Filename:            STAT\src\app\shared\services\header.service.spec.ts
*
* Author:               Vianka Naidoo, Munashe Mujaji
*   
* File Creation Date:   13 June 2020
*
* Development Group:    Visionary
*
* Project:              Smart Time and Attendance Tracker
*
* Description:          This file handles all the tests of the header services
*/

import { TestBed } from '@angular/core/testing';

import { HeaderService } from './header.service';

describe('HeaderService', () => {
  let service: HeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
