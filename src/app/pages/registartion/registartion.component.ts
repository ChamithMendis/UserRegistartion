import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/userModel';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-registartion',
  templateUrl: './registartion.component.html',
  styleUrls: ['./registartion.component.css']
})
export class RegistartionComponent implements OnInit {

  userFormGroup!: FormGroup;

  dataSource: User[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initUserDetailsForm();
  }

  initUserDetailsForm() {
    this.userFormGroup = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    let user: User = {
      first_name: this.userFormGroup.get('firstname')?.value,
      last_name: this.userFormGroup.get('lastname')?.value,
      email: this.userFormGroup.get('email')?.value,
      avatar: "https://reqres.in/img/faces/7-image.jpg"
    };
    this.userService.createUserData(user).subscribe((res) => {
      console.log(res);
      this.snackBar.open('User Registartion Successfully', 'X', {
        duration: 2000,
        verticalPosition: "top",
        horizontalPosition: "center"
      });
      this.userFormGroup.reset();
      this.userFormGroup.clearValidators();
    }, (e) => {
      console.log(e);
      this.snackBar.open(e, 'X', {
        duration: 2000,
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: ["custom-style"]
      });
    });
  }

  Cancel() {
    this.router.navigate(['/']);
  }
}
