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
    applications:any;
    status:boolean = true;
    approveStatus:string;


    ngOnInit():void{
      this.applicationService.getAllApplications().subscribe({
        next:(res)=>{
            this.applications = res.payload;
        },
        error:(err)=>{ console.log(err) }
      })
    }


    onApprove(id:string,app:Application){
        this.status = false;
        this.approveStatus = 'Application Approved'
        console.log("approve",id)
        console.log("app",app)
        app['status']="Approved";
        this.applicationService.updateApplication(id,app).subscribe(
          (res)=>{console.log(res)},
          (err)=>{
            console.log(err)
          }
        )
    }

    onReject(id:string){
      this.applications = this.applications.filter((app)=>{
        app._id === id;
      });
      console.log(this.applications)
      this.applicationService.deleteApplication(id).subscribe((res)=>console.log(res),(err)=>{console.log(err)});
    }
    

    
}
