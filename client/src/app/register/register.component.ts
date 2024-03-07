import { Component,inject } from '@angular/core';
import {FormGroup,FormControl,Validators, FormBuilder} from '@angular/forms';

import {Router} from '@angular/router'
import { User } from '../models/user';
import { Admin } from '../models/admin';
import { UserService } from '../services/user.service';
import { AdminService } from '../services/admin.service';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 
//getter and setter methods
  get username(){
    return this.registerForm.get('username')
  }
  get password(){
    return this.registerForm.get('password')
  }
  get email(){
    return this.registerForm.get('email')
  }
  get dob(){
    return this.registerForm.get('dob')
  }
 
 
  duplicateUserStatus:boolean=false;
  duplicateAdminStatus:boolean=false;
  router=inject(Router)
  userService=inject(UserService);
  adminService=inject(AdminService)
  registerForm:FormGroup;
  fb:FormBuilder=inject(FormBuilder);
 
  ngOnInit(){
    this.registerForm=this.fb.group({
      registerType:'user',
      username:['',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]],
      password:['',Validators.required],
      email:['',Validators.required],
      dob:['',Validators.required]
    })
  }
 
  onSubmit(){
    if(this.registerForm.valid){
      const formData=this.registerForm.value;
      if(formData.registerType==='user'){
        let {username,password,email,dob}=this.registerForm.value;
        let newUser=new User(username,password,email,dob);
        this.userService.createStudentUser(newUser).subscribe(
          (res)=>{
           console.log("user",res)
            if(res.message==="User created"){
              console.log(res)
              this.router.navigate(['/login'])
            }
            else{
              this.duplicateUserStatus=true;
            }
           
          },(error)=>{
            console.log('error in user creation',error)
          }
        )
   
      }
      else if(formData.registerType==='admin'){
        let {username,password,email,dob}=this.registerForm.value;
        let newAdmin=new Admin(username,password,email,dob);
        this.adminService.createAdminUser(newAdmin).subscribe(
          (res)=>{
            console.log("admin",res)
            //navigate to login
            if(res.message==="Admin created"){
              console.log(res)
              this.router.navigate(['/login'])
            }
            else{
              this.duplicateAdminStatus=true;
            }
          },(error)=>{
            console.log('error in admin creation',error)
          }
        )
      }
      else{
        console.log('form is invalid')
      }
    }
   
  }
 
 }