import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'
import { Application } from '.././models/application';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpClient=inject(HttpClient)

  
  // userLoginStatus = signal(false)

  // getUserLoginStatus(){
  //   return this.userLoginStatus()
  // }

  // setUserLoginStatus(value:boolean){
  //   this.userLoginStatus.set(value)
  // }

  userLoginStatus = new BehaviorSubject<boolean>(false);

  getUserLoginStatus():Observable<any>{
    return this.userLoginStatus.asObservable();
  }

  setUserLoginStatus(value:boolean){
    this.userLoginStatus.next(value);
  }

  currentUser = new BehaviorSubject<User>({
    username:'',
    password:'',
    email:'',
    dob:''
  });

  getCurrentUser():Observable<User>{
    return this.currentUser.asObservable();
  }

  setCurrentUser(user:User){
    this.currentUser.next(user);
  }
 
 createStudentUser(newUser:User):Observable<any>{
  return this.httpClient.post('http://localhost:4000/user-api/user',newUser)
 }

 createAdminUser(newUser:User):Observable<any>{
  return this.httpClient.post('http://localhost:4000/admin-api/admin',newUser)
 }
 

 //user login
 
 userStudentLogin(usercredobj):Observable<any>{
  return this.httpClient.post('http://localhost:4000/user-api/login',usercredobj)
 }

 userAdminLogin(usercredobj):Observable<any>{
  return this.httpClient.post('http://localhost:4000/admin-api/login',usercredobj)
 }

 getUserByUsername(username:string):Observable<any>{
  return this.httpClient.get(`http://localhost:3000/users?username=${username}`)
 }


 createApplication(newApplication:Application):Observable<any>{
  return this.httpClient.post('http://localhost:4000/application-api/application',newApplication)
 }

 getAllApplications():Observable<any>{
  return this.httpClient.get('http://localhost:4000/application-api/applications')
 }

 deleteApplication(id:string):Observable<any>{
  console.log(id)
  return this.httpClient.delete(`http://localhost:4000/application-api/application/${id}`)
 }

 updateApplication(id:string,app:any):Observable<any>{
  return this.httpClient.put(`http://localhost:4000/application-api/application/${id}`,app)
 }

 protectedRoute():Observable<any>{
  return this.httpClient.get('http://localhost:4000/user-api/user-sensitive-data')
 }

 userLogout(){
  this.setUserLoginStatus(false);
  this.setCurrentUser({
    username:'',
    password:'',
    email:'',
    dob:''
  });
  localStorage.removeItem('token')
 }

}
