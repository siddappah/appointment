import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from "ngx-bootstrap/modal";
import { Router } from '@angular/router';
import { NgForm, FormGroup } from "@angular/forms";
import { Appointment } from '../shared/model/Appointment.model';
import { AppointmentService } from '../shared/services/appointment.service';

export interface State {
  id: number;
  name: string;
}

@Component({
  selector: 'app-appointment-add-edit',
  templateUrl: './appointment-add-edit.component.html',
  styleUrls: ['./appointment-add-edit.component.css']
})
export class AppointmentAddEditComponent implements OnInit {
  @ViewChild('appointmentForm') appointmentFormValues: NgForm;
  appointment: Appointment = {
    name: "",
    postalAddress: "",
    city: "",
    state: "",
    mobile: null,
    email: "",
    date: null,
    time: ""
  }
  states: State[] = [
    { id: 1, name: 'Karnataka' },
    { id: 1, name: 'Andra pradesh' },
    { id: 1, name: 'Telangana' },
    { id: 1, name: 'Goa' },
    { id: 1, name: 'Gujarat' }
  ];
  timeSlots = [];

  modalRef: BsModalRef;
  ignoreBackdropClick: true;
  currentFormattedDate: Date;
  currentDate: string;
  currentMonth: string;
  btnStatusCheck: boolean;
  customDateFormat: string;
  public amountToIncreaseDecreaseWith = 1; //Edit this number to required input

  constructor(
    public bsModalRef: BsModalRef,
    private router: Router,
    private _appointmentService: AppointmentService,
  ) {
    this.btnStatusCheck = true;
  }

  ngOnInit() {
    /* Get current date and passing to function to get timeslots*/
    this.currentFormattedDate = new Date();

    // this.currentFormattedDate.setFullYear(2019);
    // this.currentFormattedDate.setMonth(2);
    // this.currentFormattedDate.setDate(17);

    // if (this.currentFormattedDate.getDay() == 0)

    this.customDateFormat = this.dateFormat(this.currentFormattedDate);
    this.getAppointmentsOnDateSelection(this.customDateFormat);
  }

  /* Next date and passing to function to get timeslots*/
  nextDate(nextDate: Date) {
    this.btnStatusCheck = false;
    /* Adding 1 day to selected date */
    this.currentFormattedDate = this.incrementDate(nextDate, this.amountToIncreaseDecreaseWith);
    this.customDateFormat = this.dateFormat(this.currentFormattedDate);
    // console.log('Next date--- ' + this.customDateFormat);
    this.getAppointmentsOnDateSelection(this.customDateFormat);
  }

  incrementDate(dateInput: Date, increment: number) {
    var dateFormatTotime = new Date(dateInput);
    var increasedDate = new Date(dateFormatTotime.getTime() + (increment * 86400000));
    return increasedDate;
  }

  /* Previous date and passing to function to get timeslots*/
  previousDate(prevDate: Date) {
    let today = new Date();
    let checkDate = new Date(prevDate.getTime() - (1 * 86400000));
    /* Logic to enable/disable previous button */
    if ((today.toDateString() == checkDate.toDateString())) {
      this.btnStatusCheck = true;
    } else {
      this.btnStatusCheck = false;
    }
    /* Deducting 1 day from selected date */
    this.currentFormattedDate = this.decrementDate(prevDate, this.amountToIncreaseDecreaseWith);
    this.customDateFormat = this.dateFormat(this.currentFormattedDate);
    // console.log('Previous date--- ' + this.customDateFormat);
    this.getAppointmentsOnDateSelection(this.customDateFormat);
  }

  decrementDate(dateInput: Date, decrement: number) {
    var dateFormatTotime = new Date(dateInput);
    var decreasedDate = new Date(dateFormatTotime.getTime() - (decrement * 86400000));
    return decreasedDate;
  }

  /* Function to get timeslots based on incoming date*/
  getAppointmentsOnDateSelection(selectedDate: string) {
    this._appointmentService.getAppointmentsOnDateSelection(selectedDate)
      .subscribe(
        (data) => {
          if (data.slots.length > 0) {
            this.timeSlots = data.slots;
          } else {
            this.timeSlots = [];
          }
        }, (err) => {
          console.log(err);
        });
  }

  /* Convert incoming date into dd-mm-yyyy format and return */
  dateFormat(dateSelected: Date) {
    let dd = dateSelected.getDate();
    let mm = dateSelected.getMonth() + 1; //January is 0!
    let yyyy = dateSelected.getFullYear();

    if (dd < 10) {
      this.currentDate = '0' + dd;
    } else {
      this.currentDate = dd.toString();
    }
    if (mm < 10) {
      this.currentMonth = '0' + mm;
    } else {
      this.currentMonth = mm.toString();
    }

    return this.currentDate + '-' + this.currentMonth + '-' + yyyy;
  }

  decline(): void {
    this.bsModalRef.hide();
    // this.router.navigate(['../../'], { relativeTo: this.route });
  }

  onSubmit() {
    let appointmentForm = this.appointmentFormValues.form.value;
    console.log(appointmentForm);
  }

}
