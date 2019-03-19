import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentAddEditComponent } from './appointment-add-edit.component';

describe('AppointmentAddEditComponent', () => {
  let component: AppointmentAddEditComponent;
  let fixture: ComponentFixture<AppointmentAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
