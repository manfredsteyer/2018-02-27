import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { debounceTime, switchMap, tap, combineLatest, filter } from 'rxjs/operators';
import { _do } from "rxjs/operator/do";

import { Flight } from '../entities/flight';
// import  'rxjs';

import { map } from "rxjs/operators/map";
import { of } from 'rxjs/observable/of';
import { startWith } from "rxjs/operators/startWith";
import { distinctUntilChanged } from "rxjs/operators/distinctUntilChanged";

@Component({
    selector: 'flight-lookahead',
    templateUrl: './flight-lookahead.component.html'
})
export class FlightLookaheadComponent implements OnInit {

    constructor(private http: HttpClient) {
    }

    control: FormControl;
    flights$: Observable<Flight[]>;

    loading: boolean = false;




    online: boolean = false;
    online$: Observable<boolean>;




    ngOnInit() {
        this.control = new FormControl();

        this.online$ = Observable
                            .interval(2000)
                            .pipe(
                                startWith(0),
                                map(x => Math.random() < 0.5),
                                distinctUntilChanged(),
                                tap(x => this.online = x)
                            );

        this.flights$ = this
                            .control
                            .valueChanges
                            .pipe(
                              debounceTime(300),
                              combineLatest(this.online$),
                              filter(combi => combi[1]),
                              tap(x => console.debug(x)),
                              map(x => x[0] as string),
                              tap(input => this.loading = true),
                              switchMap(input => this.load(input)),
                              tap(v => this.loading = false)
                            );
    }






    load(from: string)  {
        let url = "http://www.angular.at/api/flight";

        let params = new HttpParams()
                            .set('from', from);

        let headers = new HttpHeaders()
                            .set('Accept', 'application/json');

        return this.http.get<Flight[]>(url, {params, headers});

    };


}
