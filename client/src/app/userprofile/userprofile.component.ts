import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Application } from '../models/application';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {
  fb:FormBuilder=inject(FormBuilder);
  userService=inject(UserService)
  router=inject(Router)
   
  application=this.fb.group({
    fname:['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
    lname:['',[Validators.required,Validators.minLength(4),Validators.maxLength(20)]],
    mname:[''],
    father:['',Validators.required],
    mother:['',Validators.required],
    email:['',Validators.required],
    dob:['',Validators.required],
    mblno:['',Validators.required],
    gender:['',Validators.required],
    collegename:['',Validators.required],
    year:['',Validators.required],
    grade:['',Validators.required],
    caste:['',Validators.required],
    annualincome:['',Validators.required]
  });
  
  // getters and setters
  get fname() {
    return this.application.get('fname')
  }
  
  get lname() {
    return this.application.get('lname')
  }

  get mname(){
    return this.application.get('mname')
  }
  
  get email() {
    return this.application.get('email')
  }
  
  get dob() {
    return this.application.get('dob')
  }

  get mblno(){
    return this.application.get('mblno')
  }

  get gender() {
    return this.application.get('gender')
  }

  get father(){
    return this.application.get('father')
  }

  get collegename(){
    return this.application.get('collegename')
  }

  get year(){
    return this.application.get('year')
  }  

  get grade(){
    return this.application.get('grade')
  }

  get mother(){
    return this.application.get('mother')
  }

  get caste(){
    return this.application.get('caste')
  }

  get annualincome(){
    return this.application.get('annualincome')
  }

  currentApplication:any;
  applicationsList:any

  getAllApplications(){
    this.userService.getAllApplications().subscribe((res)=>{
      this.applicationsList = res.payload;
      this.currentApplication = this.applicationsList[this.applicationsList.length-1];
      console.log(this.currentApplication)
      this.changeStatus()
    })
  }

  status:string;
  checkStatus:string;
  //bool:boolean;
  
  changeStatus(){
    this.status= `Your application is submitted successfully! And your application no. is ${this.currentApplication._id}`
    this.checkStatus=`Click Here To Check Your Application Status`
  }




  onSubmitApplication(){
    let {fname,mname,lname,father,mother,email,dob,mblno,gender,collegename,year,grade,caste,annualincome}=this.application.value;
    let newApplication=new Application(fname,mname,lname,father,mother,email,dob,mblno,gender,collegename,year,grade,caste,annualincome);
    this.userService.createApplication(newApplication).subscribe({
      next:(res)=>{
        if(this.application.status==="VALID"){
          this.getAllApplications();
        }
      },
      error:(err)=>{
        console.log("error in user creation",err)
      }
   })
  }
}
