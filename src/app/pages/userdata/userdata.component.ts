import { EditComponent } from './edit-component/edit.component';
import { UserService } from 'src/app/services/user.service';
import { User, UserResponse } from './../../models/userModel';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource?: MatTableDataSource<User>;
  userResponse?: UserResponse;
  pageNumber: number = 1;

  displayedColumns: string[] = [
    'id',
    'email',
    'first_name',
    'last_name',
    'action',
  ];

  constructor(
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { order: "popular" }
        const page = isNaN(+params?.['page']) ? 1 : +params?.['page'] ?? 1;
        this.getUserDetails(page);
        this.pageNumber = page;
        console.log(this.pageNumber);
      });
  }

  getUserDetails(page: number) {
    this.userService.getUserData(page).subscribe((data) => {
      this.userResponse = data;
      this.dataSource = new MatTableDataSource<User>(data.data);
      // this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });
  }

  /** open dialog view to edit user details */
  openDialog(row: User): void {
    this.dialog.open(EditComponent, {
      width: '500px',
      height: '400px',
      data: row,
    });
  }

  createNewUser() {
    this.router.navigate(['/registartion']);
  }

  /** delete row data (when clicking the delete action) */
  deleteRowData(row: User) {
    console.log(row);
    this.userService.deleteUserData(row).subscribe((res) => {
      this.getUserDetails(this.pageNumber);
      console.log(res);
      this.snackBar.open('User Delete Successfully', 'X', {
        duration: 2000,
        verticalPosition: "top",
        horizontalPosition: "center"
      });
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

  handlePageEvent(event: PageEvent) {
    this.router.navigate([''], { queryParams: { page: event.pageIndex + 1 } });
  }


}
