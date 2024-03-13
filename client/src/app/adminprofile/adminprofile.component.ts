import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../models/application';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrl: './adminprofile.component.css'
})
export class AdminprofileComponent implements OnInit {
  applicationService = inject(ApplicationService)
  applications: any[];

  ngOnInit(): void {
    this.applicationService.getAllApplications().subscribe({
      next: (res) => {
        this.applications = res.payload;
      },
      error: (err) => {
        console.log(err) 
      }
    });
  }

  onApprove(id: string, app: any) {
    app['status'] = "Approved";
    this.applicationService.updateApplication(id, app).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onReject(id: string, app: any) {
    app.status = "Rejected";
    let index = this.applications.findIndex((app) => {
      return app._id === id;
    });
    this.applications.splice(index, 1);
    
    this.applicationService.updateApplication(id, app).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}
