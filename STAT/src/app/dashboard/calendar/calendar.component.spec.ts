import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController  } from '@angular/common/http/testing';
import { CalendarComponent } from './calendar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';



describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ NO_ERRORS_SCHEMA ],
      declarations: [ CalendarComponent ],
      imports:
          [ RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents().then(()=>
    {
      fixture = TestBed.createComponent(CalendarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));

 

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
