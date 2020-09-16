
import { TeamsComponent } from './teams.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController  } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserModule, By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import { MaterialComponentsModule } from 'src/app/material-components/material-components.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectManagementService } from 'src/app/shared/services/project-management.service';
import { AccountManagementService } from 'src/app/shared/services/account-management.service';
import { of, throwError } from 'rxjs';
import { HeaderService } from 'src/app/shared/services/header.service';
import {NO_ERRORS_SCHEMA} from "@angular/core"
import { TeamManagementService } from 'src/app/shared/services/team-management.service';

describe('Unit tests:', () => {
describe('TeamsComponent', () => {

  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let roles;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsComponent ],
      imports:
        [ HttpClientTestingModule,
          RouterTestingModule,
          FormsModule,
          ReactiveFormsModule,
          MaterialComponentsModule,
          MatProgressSpinnerModule,
          BrowserAnimationsModule
        ],
        schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents().then(()=>
    {
      fixture = TestBed.createComponent(TeamsComponent);

      roles = ['Team Leader'];

      fixture.whenStable().then(() => {
        component = fixture.componentInstance;
        component.roles = roles;

        fixture.detectChanges();
        de = fixture.debugElement.query(By.css('.row'));
        el = de.nativeElement;
      });
    });
  }));

  it('should create', async() => {
    fixture.whenStable().then(() => {
      expect(component).toBeTruthy();
    });
  });

  it('the add team button should show if the user is a Team Leader', async(() => {
    expect(fixture.debugElement.query(By.css("#add-team")).nativeElement).toBeTruthy();
  }));

  it('the add team button should not show if the user is not a Team Leader', async(() => {
    roles=[];
    component.roles = roles;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css("#add-team"))).toBeFalsy();
  }));

  it('should call the open method when the add button is pressed', async(() => {
    spyOn(component,'open');
    el = fixture.debugElement.query(By.css("#add-team")).nativeElement;
    el.click();
    expect(component.open).toHaveBeenCalledTimes(1);
  }));

  describe('typeRole()', () => {

    it('should call store the correct variables', async(() => {

      component.typeRole({target:{event:"test"}});
      
      expect(component.role).toEqual("test");

    }));
  });

});
});

describe('TeamsComponent', () => {
  describe('Integration tests:', () => {
    let component: TeamsComponent;
    let fixture: ComponentFixture<TeamsComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let projects;
    let tasks;
    let hService;
    let amService;
    let tmService;
    let roles;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ TeamsComponent ],
        imports:
          [ HttpClientTestingModule,
            RouterTestingModule,
            FormsModule,
            ReactiveFormsModule,
            MaterialComponentsModule,
            MatProgressSpinnerModule,
            BrowserAnimationsModule
          ],
        providers: [
          FormsModule,
          ReactiveFormsModule,
          MaterialComponentsModule,
          MatProgressSpinnerModule,
          BrowserAnimationsModule
        ],
        schemas:[NO_ERRORS_SCHEMA]
      })
      .compileComponents().then(()=>
      {
        fixture = TestBed.createComponent(TeamsComponent);

        roles = ['Team Leader'];

        component = fixture.componentInstance;

        component.roles = roles;

        fixture.detectChanges();
        hService = TestBed.get(HeaderService);
        amService = TestBed.get(AccountManagementService);
        tmService = TestBed.get(TeamManagementService);
        de = fixture.debugElement.query(By.css('.row'));
        el = de.nativeElement;


      });
    }));

    describe('getAllMembers()', () => {

      it('should save the members if called successfully', async(() => {

        spyOn(amService, 'getAllUsers').and.returnValue(of({users: ["data"]}));
        spyOn(component, 'getAllMembers');
        component.getAllMembers();
        
        fixture.detectChanges();
        expect(component.allMembers).toEqual(["data"]);

      }));

      it('should catch error and call appropriate functions', async(() => {
        
        spyOn(hService, 'kickOut');
        spyOn(component, 'getAllMembers');
        spyOn(amService, 'getAllUsers').and.returnValue(throwError({
          status: 403,
          error: {
            message: 'Access denied'
          }
        }));
        component.getAllMembers();
        fixture.detectChanges();
        expect(hService.kickOut).toHaveBeenCalled();
        expect(component.allMembers).not.toBeDefined();
      }));
    });

      describe('getTeams()', () => {

        it('should call the correct functions if called successfully ', async(() => {
        
          spyOn(tmService, 'getTeams').and.returnValue(of({teams: ["data"]}));
          spyOn(component, 'getMembers');
          component.getTeams();
          
          fixture.detectChanges();
          expect(component.teams).toEqual(["data"]);
          expect(component.getMembers).toHaveBeenCalled();
  
        }));
  
        it('should catch error and call appropriate functions', async(() => {
          
          spyOn(hService, 'kickOut');
          spyOn(component, 'getMembers');
          spyOn(tmService, 'getTeams').and.returnValue(throwError({
            status: 403,
            error: {
              message: 'Access denied'
            }
          }));
          component.getTeams();
          fixture.detectChanges();
          expect(component.getMembers).not.toHaveBeenCalled();
          expect(hService.kickOut).toHaveBeenCalled();
        }));

      });

      describe('getMembers()', () => {

        it('should save the members if called successfully', async(() => {
  
          spyOn(amService, 'getAllUsers').and.returnValue(of({users: ["data"]}));
          spyOn(component, 'getMembers');
          component.getMembers();
          
          fixture.detectChanges();
          expect(component.allMembers).toEqual(["data"]);
          expect(component.members).toEqual(["data"]);
        }));
  
        it('should catch error and call appropriate functions', async(() => {
          
          spyOn(hService, 'kickOut');
          spyOn(component, 'getMembers');
          spyOn(amService, 'getAllUsers').and.returnValue(throwError({
            status: 403,
            error: {
              message: 'Access denied'
            }
          }));
          component.getMembers();
          fixture.detectChanges();
          expect(hService.kickOut).toHaveBeenCalled();
          expect(component.allMembers).not.toBeDefined()
          expect(component.members).not.toBeDefined();
        }));
      });

      describe('createTeam()', () => {

        it('should call the correct functions and save the correct variables if called successfully', async(() => {

          spyOn(tmService, 'createTeam').and.returnValue(of({teamID: "ad2fa0sc3bs85f1b"}));
          spyOn(component, 'addMembersToTeam').and.callThrough();
          component.createTeam("Name");
          
          fixture.detectChanges();
          expect(component.addMembersToTeam).toHaveBeenCalled();
          expect(component.tid).toEqual("ad2fa0sc3bs85f1b");
  
        }));
  
        it('should catch error and call appropriate functions', async(() => {
          
          spyOn(hService, 'kickOut');
          spyOn(component, 'addMembersToTeam');
          spyOn(tmService, 'createTeam').and.returnValue(throwError({
            status: 403,
            error: {
              message: 'Access denied'
            }
          }));
          component.createTeam("Name");
          fixture.detectChanges();
          expect(component.addMembersToTeam).not.toHaveBeenCalled();
          expect(hService.kickOut).toHaveBeenCalled();
        }));

      });

      describe('addTeamMember()', () => {

        it('should call the correct functions if called successfully', async(() => {

          spyOn(tmService, 'addTeamMember').and.returnValue(of({teamID: "ad2fa0sc3bs85f1b"}));
          spyOn(component, 'getTeams').and.callThrough();
          component.addTeamMember("ojdinsfijwf", "igvwf1g5w10", "Coder");
          
          fixture.detectChanges();
          expect(component.getTeams).toHaveBeenCalled();
  
        }));
  
        it('should catch error and call appropriate functions', async(() => {
          
          spyOn(hService, 'kickOut');
          spyOn(component, 'getTeams');
          spyOn(tmService, 'addTeamMember').and.returnValue(throwError({
            status: 403,
            error: {
              message: 'Access denied'
            }
          }));
          component.addTeamMember("ojdinsfijwf", "igvwf1g5w10", "Coder");
          fixture.detectChanges();
          expect(component.getTeams).not.toHaveBeenCalled();
          expect(hService.kickOut).toHaveBeenCalled();
        }));

      });

      describe('addMembersToTeam()', () => {

        it('should call the correct functions for the array elements', async(() => {
      
         component.addMembers = [{ID: "0s25g15s1d0g21",teamRole: "Tester" },{ID: "0s25g15s1d0g22",teamRole: "Coder" }];
         component.tid = "woijrgsf03w5100";
          spyOn(component, 'addTeamMember');
          component.addMembersToTeam();
          
          fixture.detectChanges();
          expect(component.addTeamMember).toHaveBeenCalledTimes(2);
  
        }));
      });

      describe('removeTeamMember()', () => {

        it('should call the correct functions if called successfully', async(() => {

          spyOn(tmService, 'removeTeamMember').and.returnValue(of({teamID: "ad2fa0sc3bs85f1b"}));
          spyOn(component, 'getTeams').and.callThrough();
          component.removeTeamMember("ojdinsfijwf", "igvwf1g5w10");
          
          fixture.detectChanges();
          expect(component.getTeams).toHaveBeenCalled();
  
        }));
  
        it('should catch error and call appropriate functions', async(() => {
          
          spyOn(hService, 'kickOut');
          spyOn(component, 'getTeams');
          spyOn(tmService, 'removeTeamMember').and.returnValue(throwError({
            status: 403,
            error: {
              message: 'Access denied'
            }
          }));
          component.removeTeamMember("ojdinsfijwf", "igvwf1g5w10");
          fixture.detectChanges();
          expect(component.getTeams).not.toHaveBeenCalled();
          expect(hService.kickOut).toHaveBeenCalled();
        }));

      });

      describe('changeRole()', () => {

        it('should call the correct functions if form is passed and called successfully', async(() => {
          spyOn(tmService, 'changeRole').and.returnValue(of({message: "Role changed successfully"}));
          spyOn(hService, 'kickOut');
          component.changeRole(component.addMemberForm.value);
          
          fixture.detectChanges();
          expect(hService.kickOut).not.toHaveBeenCalled();
  
        }));
  
        it('should catch error and call appropriate functions', async(() => {
          
          spyOn(hService, 'kickOut');
          spyOn(tmService, 'changeRole').and.returnValue(throwError({
            status: 403,
            error: {
              message: 'Access denied'
            }
          }));
          component.changeRole(component.addMemberForm.value);
          fixture.detectChanges();
          expect(hService.kickOut).toHaveBeenCalled();
        }));

      });

      describe('editTeam()', () => {

        it('should call the correct functions if form is passed and called successfully', async(() => {
          spyOn(tmService, 'editTeam').and.returnValue(of({message: "Role changed successfully"}));
          spyOn(hService, 'kickOut');
          component.editTeam("jijfdngnadv", "sihgnaigjs");
          
          fixture.detectChanges();
          expect(hService.kickOut).not.toHaveBeenCalled();
  
        }));
  
        it('should catch error and call appropriate functions', async(() => {
          
          spyOn(hService, 'kickOut');
          spyOn(tmService, 'editTeam').and.returnValue(throwError({
            status: 403,
            error: {
              message: 'Access denied'
            }
          }));
          component.editTeam("jijfdngnadv", "sihgnaigjs");
          fixture.detectChanges();
          expect(hService.kickOut).toHaveBeenCalled();
        }));

      });

      describe('deleteTeam()', () => {

        it('should call the correct functions if called successfully', async(() => {

          spyOn(tmService, 'deleteTeam').and.returnValue(of({message: "Success"}));
          spyOn(component, 'getTeams').and.callThrough();
          component.deleteTeam("ojdinsfijwf");
          
          fixture.detectChanges();
          expect(component.getTeams).toHaveBeenCalled();
  
        }));
  
        it('should catch error and call appropriate functions', async(() => {
          
          spyOn(hService, 'kickOut');
          spyOn(component, 'getTeams');
          spyOn(tmService, 'deleteTeam').and.returnValue(throwError({
            status: 403,
            error: {
              message: 'Access denied'
            }
          }));
          component.deleteTeam("ojdinsfijwf");
          fixture.detectChanges();
          expect(component.getTeams).not.toHaveBeenCalled();
          expect(hService.kickOut).toHaveBeenCalled();
        }));

      });
  });
});
