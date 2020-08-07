import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamsComponent } from './teams.component';
import { HttpClientTestingModule,HttpTestingController  } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

describe('Unit tests', () => {
  describe('TeamsComponent', () => {
    let component: TeamsComponent;
    let fixture: ComponentFixture<TeamsComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let autoModal : NgbModal;
    let autoModalRef : NgbModalRef;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ TeamsComponent ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TeamsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      de = fixture.debugElement.query(By.css('.row'));
      el = de.nativeElement;
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should open the add team modal', async(() => {
      //spyOn(component,'open');
      el = fixture.debugElement.query(By.css("#add-team")).nativeElement;
      //expect(el).toBeTruthy();
      const contentBeforeClick = document.querySelector(".modal-content");
      expect(contentBeforeClick).toBeFalsy();
      el.click();
      const contentAfterClick = document.querySelector(".modal-content");
      expect(contentAfterClick).toBeTruthy();

      document.querySelector(".modal-header h2").textContent = 'John';

      //fixture.detectChanges();
      //expect(component.open).toHaveBeenCalledTimes(1);
    }));
  });
});
