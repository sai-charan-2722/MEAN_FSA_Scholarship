import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {
  fb = inject(FormBuilder)
  applicationService = inject(ApplicationService)

  status = this.fb.group({
    appnum: ['', Validators.required]
  })

  get appnum() {
    return this.status.get('appnum');
  }


  appStatus: string;
  onSearch() {
    this.applicationService.getAllApplications().subscribe((appList) => {

      console.log(appList)
      if(appList.length==0){
        this.appStatus = "Your application is REJECTED"
      }
      appList.forEach(app => {
        if (app.id == this.status.value.appnum) {
          if (app.status === "Approved") {
            this.appStatus = "Your application is APPROVED"
          } else if (app.status == undefined) {
            this.appStatus = "Your application is PENDING"
          }
        } else {
          this.appStatus = "Your application is REJECTED"
        }
        console.log(this.appStatus)
      });
    }, (err) => { console.log(err) })
  }




}
