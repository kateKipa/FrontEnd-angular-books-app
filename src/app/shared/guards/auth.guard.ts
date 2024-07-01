import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService)
  const router = inject(Router)     //κανω inject το Router γιατι κανω navigate στην page login αν δεν υπαρχει user

  if (userService.user()) {
    return true
  }
  return router.navigate(['login-signup'])

};
