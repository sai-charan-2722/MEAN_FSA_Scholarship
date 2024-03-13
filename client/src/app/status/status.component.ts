import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationService } from '../services/application.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent implements OnInit {

  fb = inject(FormBuilder)
  router = inject(Router)
  applicationService = inject(ApplicationService)
  userService = inject(UserService);
  username: string = '';

  status = this.fb.group({
    appnum: ['', Validators.required]
  })

  get appnum() {
    return this.status.get('appnum');
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe({
      next: (res) => {
        this.username = res.username;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  navigateBack() {
    this.router.navigate([`/userprofile/${this.username}`]);
  }

  appStatus: string;
  onSearch() {
    this.applicationService.getAllApplications().subscribe({
      next: (res) => {
        let appList = res.payload;
        if (appList.length === 0) {
          this.appStatus = "Enter valid Application number";
        }
        let application = appList.find((app) => {
          return app._id === this.status.value.appnum;
        });

        if (application === undefined) {
          this.appStatus = "Enter valid Application number";
        } else {
          if (application.status === "Approved") {
            this.appStatus = "Your application is APPROVED";
          } else if (application.status === "Pending") {
            this.appStatus = "Your application is PENDING";
          } else if (application.status === "Rejected") {
            this.appStatus = "Your application is REJECTED";
          }
        }
      }, error: (err) => {
        console.log(err)
      }
    });
  }
}