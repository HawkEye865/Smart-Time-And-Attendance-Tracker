/**
  * @file STAT\src\app\shared\services\history.spec.ts
  * @author Vianka Naidoo, Munashe Mujaji
  * @fileoverview This file handles all the tests of the history services
  * @date 13 June 2020
 */

/**
* Filename:            STAT\src\app\shared\services\history.service.spec.ts
*
* Author:               Vianka Naidoo, Munashe Mujaji
*   
* File Creation Date:   13 June 2020
*
* Development Group:    Visionary
*
* Project:              Smart Time and Attendance Tracker
*
* Description:          This file handles all the tests of the history services
*/

import { TestBed } from '@angular/core/testing';

import { HistoryService } from './history.service';

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
