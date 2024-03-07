import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  httpClient = inject(HttpClient)

  createAdminUser(newUser:User):Observable<any>{
    return this.httpClient.post('http://localhost:4000/admin-api/admin',newUser)
  }

  userAdminLogin(usercredobj):Observable<any>{
    return this.httpClient.post('http://localhost:4000/admin-api/login',usercredobj)
   }
}
