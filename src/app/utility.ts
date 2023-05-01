function trimObjectValues(obj: {[key: string]: string}): {[key: string]: string} {
    return Object.entries(obj).reduce((acc: {[key: string]: string}, [key, value]: [string, string]) => {
      acc[key] = value.trim();
      return acc;
    }, {});
  }

  

 // https://subscription.packtpub.com/book/web-development/9781838989439/2/ch02lvl1sec14/creating-a-basic-directive-that-allows-you-to-vertically-scroll-to-an-element


 import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, switchMap, tap } from 'rxjs/operators';
import { AppState } from 'src/app/store';
import { LoadData } from 'src/app/store/actions/data.actions';
import { getData } from 'src/app/store/selectors/data.selectors';

@Injectable()
export class MyResolver implements Resolve<any> {

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.params.id;
    this.store.dispatch(new LoadData(id));
    return this.store.select(getData).pipe(
      filter(data => !!data),
      first()
    );
  }

}
