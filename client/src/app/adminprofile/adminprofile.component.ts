import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../models/application';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrl: './adminprofile.component.css'
})
export class AdminprofileComponent implements OnInit {
    userService = inject(UserService)
    applications:any;
    status:boolean = true;
    approveStatus:string;


    ngOnInit():void{
      this.userService.getAllApplications().subscribe({
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
        this.userService.updateApplication(id,app).subscribe(
          (res)=>{console.log(res)},
          (err)=>{
            console.log(err)
          }
        )
    }

    onReject(id:string){
      this.applications = this.applications.filter((app)=>{
        app._id !== id;
      });
      console.log(this.applications)
      this.userService.deleteApplication(id).subscribe((res)=>console.log(res),(err)=>{console.log(err)});
    }
    

    
}
