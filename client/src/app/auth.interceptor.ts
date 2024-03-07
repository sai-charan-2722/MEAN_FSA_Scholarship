import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  //get token from localstorage
  const token=localStorage.getItem('token')
  if(!token){
    return next(req);
  }else{
     //add authrization to headers of req
     const reqWithToken=req.clone({
      headers:req.headers.set('Authorization',`Bearer ${token}`)
     })
    //send the req
    return next(reqWithToken)
  }
 

  
};