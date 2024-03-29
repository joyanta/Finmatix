const getChangedProperties = (currentObject, newObject) => {
  // Filter properties that belong to newObject but not in currentObject
  const newProperties = Object.entries(newObject)
    .filter(([key]) => !currentObject.hasOwnProperty(key))
    .reduce((result, [key, value]) => {
      result[key] = value;
      return result;
    }, {});

  // Filter properties that exist in both objects and have different values
  const changedProperties = Object.entries(newObject)
    .filter(([key, value]) => currentObject.hasOwnProperty(key) && currentObject[key] !== value)
    .reduce((result, [key, value]) => {
      result[key] = value;
      return result;
    }, {});

  // Merge the newProperties and changedProperties objects
  return { ...newProperties, ...changedProperties };
};

// Example usage:
const currentObject = { a: 1, b: 2, c: 3 };
const newObject = { b: 3, c: 4, d: 5 };
const result = getChangedProperties(currentObject, newObject);
console.log(result); // Output: { b: 3, c: 4, d: 5 }




import { Actions, createEffect, ofType } from '@ngrx/effects';
import { withLatestFrom, map } from 'rxjs/operators';
import { selectSelector1, selectSelector2, selectSelector3 } from '../selectors';
import { someAction, someOtherAction } from '../actions';

@Injectable()
export class MyEffects {
  myEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(someAction),
      withLatestFrom(
        this.store.select(selectSelector1),
        this.store.select(selectSelector2),
        this.store.select(selectSelector3),
      ),
      map(([action, selector1Value, selector2Value, selector3Value]) => {
        // Perform additional actions based on the values from the selectors
        return someOtherAction({ payload: selector1Value + selector2Value + selector3Value });
      })
    )
  );

  constructor(private actions$: Actions, private store: Store) {}
}




function removePropertiesFromObject(fullPropertyObject, propertiesToRemove) {
  const updatedObject = { ...fullPropertyObject }; // Create a copy of the original object

  propertiesToRemove.forEach(property => {
    ({ [property]: _, ...updatedObject } = updatedObject);
    // Destructure the object, omitting the property to remove
    // The value is assigned to _ as a throwaway variable
  });

  return updatedObject;
}

// Test the function with an example
const fullPropertyObject = {
  name: 'John',
  age: 30,
  city: 'New York',
  occupation: 'Engineer'
};

const propertiesToRemove = ['age', 'occupation'];
const updatedObject = removePropertiesFromObject(fullPropertyObject, propertiesToRemove);
console.log(updatedObject);
// Output: { name: 'John', city: 'New York' }




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



{
  "type": "node",
  "request": "launch",
  "name": "Jest All",
  "program": "${workspaceFolder}/node_modules/@angular/cli/bin/ng",
  "args": [
      "test",
      "--browsers",
      "ChromeHeadless",
      "--watch=false",
      "--code-coverage",
      "--no-cache"
  ],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
