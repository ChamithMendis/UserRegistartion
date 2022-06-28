import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistartionComponent } from './pages/registartion/registartion.component';
import { UserService } from './services/user.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserdataComponent } from './pages/userdata/userdata.component';
import { EditComponent } from './pages/userdata/edit-component/edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,
    RegistartionComponent,
    UserdataComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatSnackBarModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
