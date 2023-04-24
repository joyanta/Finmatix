import { Actions } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ApiActions } from './api.actions';
import { stuff$ } from './stuff.effects';
import { cold } from 'jasmine-marbles';

describe('stuff$ effect', () => {
  let actions$: any;
  let router: Router;
  let effect: any;

  beforeEach(() => {
    actions$ = new Actions(cold('a', {
      a: ApiActions.fetchedSuccess({ data: { _id: '123' } })
    }));
    router = {
      navigate: jasmine.createSpy('navigate'),
    } as any;

    effect = new StuffEffects(
      actions$,
      router,
    );
  });

  it('should navigate to /route/:id on fetchedSuccess action', () => {
    const expected = cold('a', {
      a: ApiActions.fetchedSuccess({ data: { _id: '123' } }),
    });

    expect(effect.stuff$).toBeObservable(expected.pipe(
      ofType(ApiActions.fetchedSuccess),
      tap(({ data: { _id } }) => {
        expect(router.navigate).toHaveBeenCalledWith([`/route/${_id}`]);
      })
    ));
  });
});
