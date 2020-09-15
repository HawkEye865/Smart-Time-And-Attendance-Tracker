import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule,HttpTestingController  } from '@angular/common/http/testing';
import { AnalysisComponent } from './analysis.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';



describe('AnalysisComponent', () => {
  let component: AnalysisComponent;
  let fixture: ComponentFixture<AnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ AnalysisComponent ],
      imports:
          [ RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents().then(()=>
    {
      fixture = TestBed.createComponent(AnalysisComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }));



  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
