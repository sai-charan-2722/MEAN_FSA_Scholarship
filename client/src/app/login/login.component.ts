import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AdminService } from '../services/admin.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  fb: FormBuilder = inject(FormBuilder);
  userService = inject(UserService);
  adminService = inject(AdminService);
  toast = inject(NgToastService);
  router = inject(Router);

  userCredentialsError = {
    userCredErrStatus: false,
    userCredErrMsg: ""
  }

  userCredentials: FormGroup;

  ngOnInit() {
    this.userCredentials = this.fb.group({
      loginType: 'user',
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      password: ['', Validators.required]
    })
  }

  onSubmitUser() {
    const formData = this.userCredentials.value;
    if (formData.loginType === 'user') {
      this.userService.userStudentLogin(formData).subscribe({
        next: (res) => {
          if (res.message === 'login success') {
            localStorage.setItem('token', res.token);
            this.userService.setUserLoginStatus(true);
            this.userService.setCurrentUser(res.user);
            this.router.navigate([`/userprofile/${res.user.username}`]);
            this.toast.success({
              detail: 'Login Successful',
              summary: 'LoggedIn as USER',
              position: 'topRight',
              duration: 5000
            });
          }
          else {
            this.userCredentialsError = {
              userCredErrStatus: true,
              userCredErrMsg: res.message
            }
          }
        }, error: (error) => {
          console.log('err in user login', error);
        }
      });
    }
    else {
      this.adminService.userAdminLogin(formData).subscribe({
        next: (res) => {
          if (res.message === 'login success') {
            localStorage.setItem('token', res.token);
            this.userService.setUserLoginStatus(true);
            this.userService.setCurrentUser(res.user);
            this.router.navigate([`/adminprofile/${res.user.username}`]);
            this.toast.success({
              detail: 'Login Successful',
              summary: 'LoggedIn as ADMIN',
              position: 'topRight',
              duration: 5000
            });
          }
          else {
            this.userCredentialsError = {
              userCredErrStatus: true,
              userCredErrMsg: res.message
            }
          }
        }, error: (error) => {
          console.log('err in admin login', error);
        }
      });
    }
  }
}