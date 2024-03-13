import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Application } from '../models/application';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent {

  fb: FormBuilder = inject(FormBuilder);
  applicationService = inject(ApplicationService);
  router = inject(Router);

  application = this.fb.group({
    fname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    lname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    mname: [''],
    father: ['', Validators.required],
    mother: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    dob: ['', Validators.required],
    mblno: ['', [Validators.required, Validators.pattern(/^[6-9]{1}[0-9]{9}$/)]],
    gender: ['', Validators.required],
    image: ['', Validators.required],
    collegename: ['', Validators.required],
    year: ['', Validators.required],
    grade: ['', Validators.required],
    caste: ['', Validators.required],
    annualincome: ['', Validators.required]
  });

  get fname() {
    return this.application.get('fname');
  }

  get lname() {
    return this.application.get('lname');
  }

  get mname() {
    return this.application.get('mname');
  }

  get email() {
    return this.application.get('email');
  }

  get dob() {
    return this.application.get('dob');
  }

  get mblno() {
    return this.application.get('mblno');
  }

  get gender() {
    return this.application.get('gender');
  }

  get father() {
    return this.application.get('father');
  }

  get image() {
    return this.application.get('image');
  }

  get collegename() {
    return this.application.get('collegename');
  }

  get year() {
    return this.application.get('year');
  }

  get grade() {
    return this.application.get('grade');
  }

  get mother() {
    return this.application.get('mother');
  }

  get caste() {
    return this.application.get('caste');
  }

  get annualincome() {
    return this.application.get('annualincome');
  }

  file: File;
  fileName: string = "No file selected";

  onChange(file: File): void {
    if (file) {
      this.fileName = file.name;
      this.file = file;
    }
  }

  currentApplication: any;
  applicationsList: any;
  status: string;
  checkStatus: string;
  alreadyExisted: boolean = false;
  alreadyExistedMsg: string = '';


  onSubmitApplication() {
    let formData = new FormData();
    let app = this.application.value;
    let newApplication = new Application(app.fname, app.mname, app.lname, app.father, app.mother, app.email, app.dob,
      app.mblno, app.gender, app.collegename, app.year, app.grade, app.caste, app.annualincome);
    formData.append("image", this.file);
    formData.append("newApplication", JSON.stringify(newApplication));
    if (this.application.status === "VALID") {
      this.applicationService.createApplication(formData).subscribe({
        next: (res) => {
          if (res.message === "Application created") {
            this.alreadyExisted = false;
            this.alreadyExistedMsg = '';
            this.getAllApplications();
          } else if (res.message === "Application already existed") {
            this.alreadyExisted = true;
            this.alreadyExistedMsg = "Application already existed";
          }
        },
        error: (err) => {
          console.log("error in application creation", err)
        }
      });
    }
  }

  getAllApplications() {
    this.applicationService.getAllApplications().subscribe((res) => {
      this.applicationsList = res.payload;
      this.currentApplication = this.applicationsList[this.applicationsList.length - 1];
      this.changeStatus()
    });
  }

  changeStatus() {
    this.status = `Your application is submitted successfully! And your application no. is ${this.currentApplication._id}`;
    this.checkStatus = `Click Here To Check Your Application Status`;
  }
}