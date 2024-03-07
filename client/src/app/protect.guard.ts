import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './services/user.service';

export const protectGuard: CanActivateFn = (route, state) => {
  let status:boolean;
  const userService = inject(UserService)
  const router = inject(Router)

  userService.getUserLoginStatus().subscribe({
    next:(loginStatus)=>{
      status = loginStatus
    }
  });

  if(status){
    return true;
  }else{
    return router.navigate(['/login'])
  }
};
