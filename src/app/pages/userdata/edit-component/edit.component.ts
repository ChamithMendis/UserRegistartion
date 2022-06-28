import { UserService } from 'src/app/services/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/userModel';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  userformGroup!: FormGroup;

  dataSource: User[] = [];

  get firstName() {
    return this.userformGroup.get('firstname');
  }

  get lastName() {
    return this.userformGroup.get('lastname');
  }

  get email() {
    return this.userformGroup.get('email');
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    // this.dataTransformationService.dataSource.subscribe((data) => {
    //   this.dataSource = data;
    // });
  }

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm() {
    this.userformGroup = this.fb.group({
      firstname: [this.data.first_name, Validators.required],
      lastname: [this.data.last_name, Validators.required],
      email: [this.data.email, Validators.required],
    });
  }

  onSubmit() {

    let user: User = {
      ...this.data,
      first_name: this.firstName?.value,
      last_name: this.lastName?.value,
      email: this.email?.value,
    }
    this.userService.editUserData(user).subscribe((res) => {
      console.log(res);
      this.snackBar.open('User Edit Successfully', 'X', {
        duration: 2000,
        verticalPosition: "top",
        horizontalPosition: "center"
      });
      this.onNoClick();
    }, (e) => {
      this.snackBar.open(e, 'X', {
        duration: 2000,
        verticalPosition: "top",
        horizontalPosition: "center",
        panelClass: ["custom-style"]
      });
      console.log(e);
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
