import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController  } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TodayComponent } from './today.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserModule, By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { AccountManagementService } from 'src/app/shared/services/account-management.service';
import { of } from 'rxjs';
import { TrackingService } from 'src/app/shared/services/tracking.service';
import { MaterialComponentsModule } from 'src/app/material-components/material-components.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('Unit tests', () => {
describe('TodayComponent', () => {
  let component: TodayComponent;
  let fixture: ComponentFixture<TodayComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let autoModal : NgbModal
  let autoModalRef : NgbModalRef

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayComponent ],
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
        MaterialComponentsModule,
        MaterialComponentsModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents().then(()=>
    {
      fixture = TestBed.createComponent(TodayComponent);

      component = fixture.componentInstance;

      fixture.detectChanges();
      de = fixture.debugElement.query(By.css('.row'));
      el = de.nativeElement;
      component.trackingNow=false;

    });
  }));

  it('should be created', async(() => {
    expect(component).toBeTruthy();
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should call the open method when the add button is pressed', async(() => {
    component.trackingNow=false;

    spyOn(component,'open');
    el = fixture.debugElement.query(By.css(".start-tracking")).nativeElement;
    el.click();
    expect(component.open).toHaveBeenCalledTimes(1);
  }));

  it("should call the addManualEntry method when the 'Create an Entry' button is pressed", async(() => {
    component.trackingNow=false;
    spyOn(component,'addManualEntry');
    el = fixture.debugElement.query(By.css("#m-tracking")).nativeElement;
    el.click();
    expect(component.addManualEntry).toHaveBeenCalledTimes(1);
  }));


  // **************************
    // INVALID MANUAL TRACKING FORM TESTS
    // **************************
    describe('Manual Tracking Form', () => {
      it('should be invalid with empty details', async(() => {
        component.trackingNow=false;
        component.manualTrackingForm.controls['description'].setValue('');
        component.manualTrackingForm.controls['project'].setValue('');
        component.manualTrackingForm.controls['taskID'].setValue('');
        component.manualTrackingForm.controls['date'].setValue('');
        component.manualTrackingForm.controls['startTime'].setValue('');
        component.manualTrackingForm.controls['endTime'].setValue('');
        fixture.detectChanges();
        expect(component.manualTrackingForm.valid).toBeFalsy();
  
      }));
      it('should be valid with correct details', async(() => {
        component.trackingNow=false;
        component.manualTrackingForm.controls['description'].setValue('Manual entry');
        component.manualTrackingForm.controls['project'].setValue('5f12ed1495236d59d08bc98d');
        component.manualTrackingForm.controls['taskID'].setValue('84153a223dgadfh056af1g0');
        component.manualTrackingForm.controls['date'].setValue('2020/07/22');
        component.manualTrackingForm.controls['startTime'].setValue("15:30");
        component.manualTrackingForm.controls['endTime'].setValue("16:42");
        fixture.detectChanges();
        expect(component.manualTrackingForm.valid).toBeTruthy();
      }));
    });
    // ****************************************** END

    // **************************
    // INVALID AUTOMATIC TRACKING FORM TESTS
    // **************************
    describe('Automatic Tracking Form', () => {

      it('should be invalid with empty details', async(() => {
        component.automaticTrackingForm.controls['description'].setValue('');
        fixture.detectChanges();
        expect(component.automaticTrackingForm.valid).toBeFalsy();

      }));
      it('should be valid with correct details', async(() => {
        component.automaticTrackingForm.controls['description'].setValue('Timed entry');
        fixture.detectChanges();
        expect(component.automaticTrackingForm.valid).toBeTruthy();

      }));

    });
    // ****************************************** END
});
});
describe('Integration tests:', () => {
  describe('TodayComponent', () => {

    let component: TodayComponent;
    let fixture: ComponentFixture<TodayComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let ACService;
    let TService;
    let router: Router;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ TodayComponent ],
        imports:
        [
          BrowserModule,
          FormsModule,
          ReactiveFormsModule,
          HttpClientTestingModule,
          RouterTestingModule
        ],
       providers: [
        {provide: TodayComponent},
        {provide: TrackingService}]
      })
      .compileComponents().then(()=>
      {
        fixture = TestBed.createComponent(TodayComponent);

        component = fixture.componentInstance;

        fixture.detectChanges();

        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
        ACService = TestBed.get(AccountManagementService);
        TService = TestBed.get(TrackingService);

      });
    }));

  describe('addManualEntry()', () => {

    it('should call addMTimeEntry function from the TrackingSevice', async(() => {
      component.trackingNow=false;
      component.manualTrackingForm.controls['Description'].setValue('');
        component.manualTrackingForm.controls['Project'].setValue('');
        component.manualTrackingForm.controls['TaskID'].setValue('');
        component.manualTrackingForm.controls['Date'].setValue('');
        component.manualTrackingForm.controls['StartTime'].setValue('');
        component.manualTrackingForm.controls['EndTime'].setValue('');
      spyOn(TService, 'addMTimeEntry')

      component.addManualEntry( component.manualTrackingForm.value);
      fixture.detectChanges();

      expect(component.service.addMTimeEntry).toHaveBeenCalledTimes(1);
    }));

    });
});
});