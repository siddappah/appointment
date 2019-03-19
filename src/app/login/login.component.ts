import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../shared/services/appointment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public hide: boolean;
  public loginForm: FormGroup;
  constructor(
    private _appointmentService: AppointmentService,
    private router: Router
  ) {
    this.hide = true;
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userId: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }
  public checkLogin = (loginFormValue) => {
    if (this.loginForm.valid) {
      this.checkLoginCredentials(loginFormValue);
    }
  }

  private checkLoginCredentials = (loginFormValue) => {
    console.log(loginFormValue);
    this.router.navigate(['/home/']);

    // Implement once API is ready
    // this._appointmentService.checkLogin(loginFormValue)
    //   .subscribe(
    //     (result) => {
    //       this.router.navigate(['/product-details/']);
    //     }, (err) => {
    //       console.log(err);
    //     });
  }
}
