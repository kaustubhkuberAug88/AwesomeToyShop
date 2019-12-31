import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ToyEditComponent } from './toy-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ToyEditGuard implements CanDeactivate<ToyEditComponent>  {

  canDeactivate(component: ToyEditComponent,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    if (component.isDirty) {
      const toyName = component.toy.toyName || 'New Toy';
      return confirm(`Navigate away and lose all changes to ${toyName}?`);
    }
    return true;
  }

}
