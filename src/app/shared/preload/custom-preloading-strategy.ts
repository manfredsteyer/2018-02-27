import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { interval } from "rxjs/observable/interval";
import { delay } from "rxjs/operators";
import { switchMap } from "rxjs/operators/switchMap";

@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {

    constructor() { }

    preload(route: Route, fn: () => Observable<any>): Observable<any> {
        // return fn();
        // return of(true).pipe(delay(5000), switchMap(_ => fn()));

        if (route.data && route.data['preload']) {
            return fn();
        }

        return of(null);

    }

}

