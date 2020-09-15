import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DesktopComponent } from './desktop.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';



describe('DesktopComponent', () => {
  let component: DesktopComponent;
  let fixture: ComponentFixture<DesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ DesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
