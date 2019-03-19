import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppointmentService } from '../shared/services/appointment.service';
import { Appoinements } from '../appointment';
import { MatTableDataSource } from '@angular/material';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppointmentAddEditComponent } from '../appointment-add-edit/appointment-add-edit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  appoinements: MatTableDataSource<Appoinements>;
  displayedColumns: string[] = ['id', 'name', 'postalAddress','city', 'state', 'mobile', 'date', 'time'];
  public modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
    animated: true
  };

  constructor(
    private _appointmentService: AppointmentService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    // this.appoinements = [];
    this._appointmentService.getAllAppointments()
      .subscribe(
        (data) => {
          this.appoinements = new MatTableDataSource(data);
          console.log(this.appoinements);
        }, (err) => {
          console.log(err);
        });
  }

  applyFilter(filterValue: string) {
    this.appoinements.filter = filterValue.trim().toLowerCase();
  }

  addNewAppointment() {
    this.modalRef = this.modalService.show(AppointmentAddEditComponent, Object.assign({},
      this.config, { class: 'modal-lg' }));
    this.modalRef.content.closeBtnName = 'Close';
    // this.modalRef.content.param = roleId;
  }

}
