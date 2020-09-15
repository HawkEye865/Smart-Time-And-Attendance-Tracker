import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesComponent } from './features.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';



describe('FeaturesComponent', () => {
  let component: FeaturesComponent;
  let fixture: ComponentFixture<FeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [ FeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
