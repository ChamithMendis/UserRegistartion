import { User } from './../../models/userModel';
import { Observable, of } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/services/user.service';
import { RegistartionComponent } from './registartion.component';

fdescribe('RegistartionComponent', () => {
  let component: RegistartionComponent;
  let fixture: ComponentFixture<RegistartionComponent>;
  let userService: UserServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistartionComponent ],
      imports: [ReactiveFormsModule,RouterTestingModule,HttpClientTestingModule,MatSnackBarModule],
      providers: [{ provide: UserService, useValue: new UserServiceStub() }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistartionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService = TestBed.get(UserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service', () => {
    const userServiceSpy = spyOn(userService , 'createUserData').and.callThrough();
    component.onSubmit();

    expect(userServiceSpy).toHaveBeenCalledTimes(1);
  })
});

class UserServiceStub {
  constructor(){}

  createUserData(user: User): Observable<any> { return of();}

 }
