import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../models/application';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  httpClient = inject(HttpClient)

  
  createApplication(formData:FormData):Observable<any>{
    return this.httpClient.post('http://localhost:4000/application-api/application',formData)
   }
  
   getAllApplications():Observable<any>{
    return this.httpClient.get('http://localhost:4000/application-api/applications')
   }
  
   deleteApplication(id:string):Observable<any>{
    return this.httpClient.delete(`http://localhost:4000/application-api/application/${id}`)
   }
  
   updateApplication(id:string,app:any):Observable<any>{
    return this.httpClient.put(`http://localhost:4000/application-api/application/${id}`,app)
   }
  
}
